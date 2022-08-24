class Solver {
    constructor ( solsDict, guessDict) {
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
    }

    compute ( params ) {
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
        this.getCurrentGuessDataFromInput();
        console.log(this);
    }

    getCurrentGuessDataFromInput () {
        for (let i = 0; i < this.correctData.length; i++) {
            this.correctData[i] = this.correctParas[i].textContent; 
        }
        for (let i = 0; i < this.misplacedData.length; i++) {
            this.misplacedData[i] = this.misplacedParas[i].textContent; 
        }
        this.incorrectData = this.incorrectPara.textContent;
        console.log(this.incorrectData);
    }

}

export { Solver };