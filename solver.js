class Solver {
    constructor(strategy, useKnownInfo, onlyValidSols, correctData, misplacedData, incorrectData, solsDictArr, guessDictArr, messageCallback) {
        this.solsDict = solsDictArr;
        this.guessDict = guessDictArr;
        this.strategy = strategy;
        this.useKnownInfo = useKnownInfo;
        this.onlyValidSols = onlyValidSols;
        this.correctData = correctData;
        this.misplacedData = misplacedData;
        this.incorrectData = incorrectData;
        this.solutionSet = new Set();
        this.guessSet = new Set();
        this.messageCallback = messageCallback;
    }

    compute() {
        this.#constructSolutionAndGuessSets();
        // console.log(this.solutionSet);
        // console.log(this.guessSet);
        let results = 'ERROR';
        if (this.strategy === 'letterMatch') {
            results = this.#letterMatch();
        } else if (this.strategy === 'reduceSpace') {
            results = this.#reduceSpace();
        }
        return results;
    }


    #constructSolutionAndGuessSets() {
        this.solutionSet = new Set(this.solsDict);
        this.#filterSetByKnownInfo(this.solutionSet, this.correctData, this.misplacedData, this.incorrectData);

        if (this.useKnownInfo && this.onlyValidSols) {
            this.guessSet = this.solutionSet;
        } else if (this.useKnownInfo && !this.onlyValidSols) {
            this.guessSet = new Set(this.guessDict);
            this.#filterSetByKnownInfo(this.guessSet, this.correctData, this.misplacedData, this.incorrectData);
            this.guessSet = new Set([...this.solutionSet, ...this.guessSet]);
        } else if (!this.useKnownInfo && !this.onlyValidSols) {
            this.guessSet = new Set([...new Set(this.solsDict), ...new Set(this.guessDict)]);
        } else if (!this.useKnownInfo && this.onlyValidSols) {
            this.guessSet = new Set(this.solsDict);
        }
    }

    #filterSetByKnownInfo(set, correct, misplaced, incorrect) {
        outer: for (const item of set) {
            for (let i = 0; i < 5; i++) {
                if ((correct[i].length === 1 && correct[i] !== item[i]) || incorrect.includes(item[i])) {
                    set.delete(item);
                    continue outer;
                }
            }
            for (let i = 0; i < 5; i++) {
                if (misplaced[i].length >= 1) {
                    for (let j = 0; j < misplaced[i].length; j++) {
                        if (misplaced[i].includes(item[i]) || !item.includes(misplaced[i][j])) {
                            set.delete(item);
                            continue outer;
                        }
                    }
                }
            }
        }
    }

    #letterMatch() {
        const results = new Set();

        // Variables for progress meter.
        let count = 0;
        let lastTimestamp = Date.now();
        const size = this.guessSet.size;
        const refreshEveryMS = 200;

        for (let guessWord of this.guessSet) {

            // We only interact with progress meter if we are using Worker and have the message callback to use.
            if (this.messageCallback) {
                count++;
                if ((Date.now() - lastTimestamp) > refreshEveryMS) {
                    lastTimestamp = Date.now();
                    this.messageCallback(Math.floor((count / size) * 100));
                }
            }

            let cumulativeScore = 0;
            for (let solWord of this.solutionSet) {
                let wordScore = 0;
                // We need to count the occurrences of each letter and not give score points for more repeats than the solution has.
                // This is how Wordle provides feedback.
                // Example: If the target word is BOSSY and the guess word is SASSY, don't give credit for the first 'S' because 
                // it tells nothing new and Wordle will grey it out. But if the guess word was STASH. The first 'S' would be yellow.
                const targetLetterCountMap = new Map();

                // We need to keep track of which incorrect letters we've seen. The first time we learn a letter is not in a word,
                // we have learned new information. A repeat of that letter tells us nothing.
                const targetLetterIncorrectSet = new Set();

                // Check for perfect matches.
                for (let i = 0; i < 5; i++) {
                    // Count up letters in the solution word.
                    if (targetLetterCountMap.has(solWord[i])) {
                        targetLetterCountMap.set(solWord[i], targetLetterCountMap.get(solWord[i]) + 1);
                    } else {
                        targetLetterCountMap.set(solWord[i], 1);
                    }
                    // Score the matches and decrement the counters.
                    if (solWord[i] === guessWord[i]) {
                        wordScore += 3;
                        // If we got a match, count the guess letter.
                        targetLetterCountMap.set(solWord[i], targetLetterCountMap.get(solWord[i]) - 1);
                    }
                }

                // We have to score the misplaced letters AFTER the matches otherwise we could accidentally use up info on a counter
                // for a misplaced letter when it should have been counted as a match in a later letter.
                for (let i = 0; i < 5; i++) {
                    // Score the misplaced letters if there is still info to be gained.
                    if (solWord[i] !== guessWord[i] && solWord.includes(guessWord[i]) && targetLetterCountMap.get(guessWord[i]) > 0) {
                        // Score the misplace letters.
                        wordScore += 2;
                        targetLetterCountMap.set(solWord[i], targetLetterCountMap.get(solWord[i]) - 1);
                    }
                }

                // Score the incorrect letters ONCE each.
                for (let i = 0; i < 5; i++) {
                    if (!solWord.includes(guessWord[i]) && !targetLetterIncorrectSet.has(guessWord)) {
                        wordScore += 1;
                        targetLetterIncorrectSet.add(guessWord[i]);
                    }
                }

                cumulativeScore += wordScore;
            }

            // Avoid NaN.
            let score = 0;
            if (this.solutionSet.size > 0) {
                score = Number(Math.round(cumulativeScore / this.solutionSet.size + 'e2') + 'e-2').toFixed(2);
            }

            results.add([
                guessWord,
                score,
                this.solutionSet.has(guessWord)]);
        }
        return results;
    }

    #reduceSpace() {
        const results = new Set();

        // Variables for progress meter.
        let count = 0;
        let lastTimestamp = Date.now();
        const size = this.guessSet.size;
        const refreshEveryMS = 200;

        for (let guessWord of this.guessSet) {

            // We only interact with progress meter if we are using Worker and have the message callback to use.
            if (this.messageCallback) {
                count++;
                if ((Date.now() - lastTimestamp) > refreshEveryMS) {
                    lastTimestamp = Date.now();
                    this.messageCallback(Math.floor((count / size) * 100));
                }
            }

            let cumulativeScore = 0;
            for (let solWord of this.solutionSet) {
                // Working variables. Start with what was passed in. We need to reset them for each new word comparison.
                let workingSolsSet = new Set(this.solutionSet);
                // console.log(workingSolsSet);
                let correct = [...this.correctData];
                let misplaced = [...this.misplacedData];
                let incorrect = [...this.incorrectData];

                // Since we are making a guess against a target, we need new known info about the guess combined with what was passed in.
                for (let i = 0; i < guessWord.length; i++) {
                    if (guessWord[i] === solWord[i]) {
                        correct[i] = guessWord[i];
                    } else if (solWord.includes(guessWord[i]) && guessWord[i] !== solWord[i] && !misplaced[i].includes(guessWord[i])) {
                        misplaced[i] += guessWord[i];
                    } else if (!solWord.includes(guessWord[i]) && !incorrect.includes(guessWord[i])) {
                        incorrect += guessWord[i];
                    }
                }

                // Now we can filter the working set on the new known info and evaluate the size of the results.
                this.#filterSetByKnownInfo(workingSolsSet, correct, misplaced, incorrect);
                cumulativeScore += workingSolsSet.size;
            }

            // Avoid NaN.
            let score = 0;
            if (this.solutionSet.size > 0) {
                score = Number(Math.round(cumulativeScore / this.solutionSet.size + 'e2') + 'e-2').toFixed(2);
            }

            results.add([
                guessWord,
                score,
                this.solutionSet.has(guessWord)]);
        }
        return results;
    }
}