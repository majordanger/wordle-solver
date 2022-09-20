class Solver {
    constructor(solsDict, guessDict) {
        this.solsDict = solsDict;
        this.guessDict = guessDict;
        this.strategy = '';
        this.useKnownInfo = false;
        this.onlyValidSols = false;
        this.correctData = new Array(5);
        this.correctParas = new Array(
            document.querySelector("#x0_y0").firstElementChild,
            document.querySelector("#x1_y0").firstElementChild,
            document.querySelector("#x2_y0").firstElementChild,
            document.querySelector("#x3_y0").firstElementChild,
            document.querySelector("#x4_y0").firstElementChild
        );
        this.misplacedData = new Array(5);
        this.misplacedParas = new Array(
            document.querySelector("#x0_y1").firstElementChild,
            document.querySelector("#x1_y1").firstElementChild,
            document.querySelector("#x2_y1").firstElementChild,
            document.querySelector("#x3_y1").firstElementChild,
            document.querySelector("#x4_y1").firstElementChild
        );
        this.incorrectData = new Array(26);
        this.incorrectPara = document.querySelector("#x0_y2").firstElementChild;
        this.solutionSet = new Set();
        this.guessSet = new Set();
    }

    compute(params) {
        // Default with these off because the params may not contain an entry from the form input.
        this.useKnownInfo = false;
        this.onlyValidSols = false;
        for (const entry of params) {
            if (entry[0] === 'strategySelection') {
                this.strategy = entry[1];
            } else if (entry[0] === 'useKnownInfo') {
                this.useKnownInfo = true;
            } else if (entry[0] === 'onlyValidSols') {
                this.onlyValidSols = true;
            }
        };
        this.#getCurrentGuessDataFromInput();
        this.#constructSolutionAndGuessSets();
        let results = 'ERROR';
        if (this.strategy === 'gainInfo') {
            results = this.#gainInformation();
        } else if (this.strategy === 'reduceSpace') {
            results = this.#reduceSpace();
        }
        // console.log(JSON.stringify(this));
        return results;
    }

    #getCurrentGuessDataFromInput() {
        for (let i = 0; i < this.correctData.length; i++) {
            this.correctData[i] = this.correctParas[i].textContent;
        }
        for (let i = 0; i < this.misplacedData.length; i++) {
            this.misplacedData[i] = this.misplacedParas[i].textContent;
        }
        this.incorrectData = this.incorrectPara.textContent;
    }

    #constructSolutionAndGuessSets() {
        this.solutionSet = new Set(this.solsDict.dictArr);
        this.#filterSetByKnownInfo(this.solutionSet);

        if (this.useKnownInfo && this.onlyValidSols) {
            this.guessSet = this.solutionSet;
        } else if (this.useKnownInfo && !this.onlyValidSols) {
            this.guessSet = new Set(this.guessDict.dictArr);
            this.#filterSetByKnownInfo(this.guessSet);
            this.guessSet = new Set([...this.solutionSet, ...this.guessSet]);
        } else if (!this.useKnownInfo && !this.onlyValidSols) {
            this.guessSet = new Set([...new Set(this.solsDict.origDictArr), ...new Set(this.guessDict.origDictArr)]);
        } else if (!this.useKnownInfo && this.onlyValidSols) {
            this.guessSet = new Set(this.solsDict.origDictArr);
        }
    }

    #filterSetByKnownInfo(set) {
        outer: for (const item of set) {
            for (let i = 0; i < 5; i++) {
                if ((this.correctData[i].length === 1 && this.correctData[i] !== item[i]) || this.incorrectData.includes(item[i])) {
                    set.delete(item);
                    continue outer;
                }
            }
            for (let i = 0; i < 5; i++) {
                if (this.misplacedData[i].length >= 1) {
                    for (let j = 0; j < this.misplacedData[i].length; j++) {
                        if (this.misplacedData[i].includes(item[i]) || !item.includes(this.misplacedData[i][j])) {
                            set.delete(item);
                            continue outer;
                        }
                    }
                }
            }
        }
    }

    #gainInformation() {
        const results = new Set();

        for (let guessWord of this.guessSet) {
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
                // console.log('====');
                // console.log(targetLetterCountMap.entries());
                // console.log(targetLetterIncorrectSet.entries());
                // console.log(`G:${guessWord},S:${solWord},${wordScore}`);
                // console.log('====');
            }
            results.add([
                guessWord, 
                Number(Math.round(cumulativeScore / this.solutionSet.size + 'e2') + 'e-2').toFixed(2), 
                this.solutionSet.has(guessWord)]);
        }
        // console.log(results);
        return results;
    }

    #reduceSpace() {
        return [['test', 'data']];
    }
}

export { Solver };