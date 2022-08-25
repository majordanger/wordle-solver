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
        console.log(this);
    }

    #getCurrentGuessDataFromInput() {
        for (let i = 0; i < this.correctData.length; i++) {
            this.correctData[i] = this.correctParas[i].textContent;
        }
        for (let i = 0; i < this.misplacedData.length; i++) {
            this.misplacedData[i] = this.misplacedParas[i].textContent;
        }
        this.incorrectData = this.incorrectPara.textContent;
        // console.log(this.incorrectData);
    }

    #constructSolutionAndGuessSets() {
        this.solutionSet = new Set(this.solsDict.dictArr);

        if (this.useKnownInfo && this.onlyValidSols) {
            this.#filterSetByKnownInfo(this.solutionSet);
            this.guessSet = this.solutionSet;
        } else if (this.useKnownInfo && !this.onlyValidSols) {
            this.guessSet = new Set(this.guessDict.dictArr);
            this.#filterSetByKnownInfo(this.solutionSet);
            this.#filterSetByKnownInfo(this.guessSet);
            this.guessSet = new Set([...this.solutionSet, ...this.guessSet]);
        } else if (!this.useKnownInfo && !this.onlyValidSols) {
            this.guessSet = new Set(this.guessDict.dictArr);
            this.guessSet = new Set([...this.solutionSet, ...this.guessSet]);
        } else if (!this.useKnownInfo && this.onlyValidSols) {
            this.guessSet = this.solutionSet;
        }

    }

    #filterSetByKnownInfo(set) {
        outer: for (const item of set) {
            for (let i = 0; i < 5; i++) {
                if ((this.correctData[i].length === 1 && this.correctData[i] !== item[i]) || this.incorrectData.includes(item[i])) {
                    // console.log(`${item},${i},${this.correctData[i]}removing`);
                    set.delete(item);
                    continue outer;
                }
            }
            for (let i = 0; i < 5; i++) {
                if (this.misplacedData[i].length >= 1) {
                    for (let j = 0; j < this.misplacedData[i].length; j++) {
                        if (this.misplacedData[i].includes(item[i]) || !item.includes(this.misplacedData[i][j])) {
                            // console.log(`${item},i:${i},j:${j},${this.misplacedData[i]},removing`);
                            set.delete(item);
                            continue outer;
                        }
                    }
                }
            }
        }
    }
}

export { Solver };