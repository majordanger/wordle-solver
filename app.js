let wordleDefaultSolutions = "TEST1\nTEST2\nTEST3\nTEST4";
let wordleDefaultGuesses = "TEST5\nTEST6\nTEST7\nTEST8";
const dictionarySolutions = document.querySelector("#solutions");
const dictionaryGuesses = document.querySelector("#guesses");
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function loadCurrentDictionaries() {
    dictionarySolutions.textContent = wordleDefaultSolutions;
    dictionaryGuesses.textContent = wordleDefaultGuesses;
}

// The standard file selector is ugly so hide it and replace it with a button. 
// Add a listener to the button that in turn clicks the hidden selector.
const fileSelect1 = document.getElementById("fileSelect1"),
    fileElem1 = document.getElementById("fileElem1");

fileSelect1.addEventListener("click", function (e) {
    if (fileElem1) {
        fileElem1.click();
    }
}, false);

// Again for the other button.
const fileSelect2 = document.getElementById("fileSelect2"),
    fileElem2 = document.getElementById("fileElem2");

fileSelect2.addEventListener("click", function (e) {
    if (fileElem2) {
        fileElem2.click();
    }
}, false);

const doStuff = function () {
    const fr = new FileReader();
    fr.onload = function () {
        wordleDefaultSolutions = fr.result;
        loadCurrentDictionaries();
    }
    fr.readAsText(this.files[0]);
}

fileElem1.addEventListener("change", doStuff, false);


loadCurrentDictionaries();


const allTiles = document.querySelectorAll(".tile");
// console.log(allTiles);
for (let i = 0; i < allTiles.length; i++) {
    allTiles[i].addEventListener('click', (e) => allTiles[i].focus());
    console.log(allTiles[i].onclick);
}

// const divs = document.querySelectorAll(".wrap-tile p");
// for (let i = 0; i < divs.length; i++) {

// console.log(divs[i].textContent);
// console.log(divs[i].innerHTML);
// console.log(divs[i].innerText);
// divs[i].innerText = "A\nBcwe\nfgh";
// // divs[i].innerText = divs[i].textContent;
// console.log(divs[i].textContent);
// console.log(divs[i].innerHTML);
// console.log(divs[i].innerText);
// console.log(p);
// }
// console.log(divs);

// function formatPForTile(p) {
//     const rawText = p.textContent;
//     if (rawText.length === 0) return p;

// }

document.addEventListener("keydown", e => {
    handleKeyInput(e);
})

function handleKeyInput(e) {
    const focusedElem = document.activeElement;
    if (!focusedElem) return;
    if (focusedElem.classList.contains('tile')) {
        const para = focusedElem.firstElementChild;
        const textLength = para.textContent.length;
        const key = e.key;
        let maxLength = 0
        if (focusedElem.classList.contains('c-tile')) {
            maxLength = 1;
        } else if (focusedElem.classList.contains('m-tile')) {
            maxLength = 12;
        } else {
            maxLength = 26;
        }
        // alert(key);
        if (key === 'Backspace' && textLength > 0) {
            para.textContent = para.textContent.slice(0, textLength - 1);
            formatTileText(para);
        } else if (!(para.textContent.includes(key.toUpperCase())) && alphabet.includes(key) && textLength < maxLength) {
            para.textContent += key;
            formatTileText(para);
        }
    }
}

function formatTileText(p) {
    const rawText = p.textContent;
    const largeLetter = '40px';
    const mediumLetter = '22px';
    const smallLetter = '16px';
    if (rawText.length <= 1) {
        p.style.fontSize = largeLetter;
        p.textContent = rawText.toUpperCase();
    } else if (rawText.length === 2) {
        p.style.fontSize = mediumLetter;
        p.textContent = rawText.toUpperCase();
    } else if (rawText.length <= 4) {
        p.style.fontSize = mediumLetter;
        p.innerText = rawText.splice(2, '\n').toUpperCase();
    } else if (rawText.length <= 6) {
        p.style.fontSize = mediumLetter;
        p.innerText = rawText.splice(3, '\n').toUpperCase();
    } else if (rawText.length <= 9) {
        p.style.fontSize = smallLetter;
        p.innerText = rawText.splice(3, '\n').splice(7, '\n').toUpperCase();
    } else if (rawText.length <= 12) {
        p.style.fontSize = smallLetter;
        p.innerText = rawText.splice(4, '\n').splice(9, '\n').toUpperCase();
    }
}

if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * Insert a substring at the given start index.
     *
     * @this {String}
     * @param {number} start Index to splice at.
     * @param {string} subStr String to splice in.
     * @return {string} The new string.
     */
    String.prototype.splice = function (start, subStr) {
        return this.slice(0, start) + subStr + this.slice(start);
    };
}