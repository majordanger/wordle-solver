import {
    updateCTile, 
    updateITile, 
    updateMTile, 
    handleKeyInput, 
    handleKeyInputForTileCharOrBack, 
    handleKeyInputForTileNav, 
    ALPHABET, 
    TILE_NAV_KEYS, 
    LARGE_TILE_LETTER, 
    MEDIUM_TILE_LETTER, 
    SMALL_TILE_LETTER, 
    indexToTile, 
    tileToIndex} 
    from './tileNav.js';
import { wordleDefaultSolutions, wordleDefaultGuesses } from './dictionaries.js';


// The text areas.
const dictionarySolutions = document.querySelector("#solutions");
const dictionaryGuesses = document.querySelector("#guesses");

// The standard file selector is ugly so hide it and replace it with a button. 
// Add a listener to the button that in turn clicks the hidden selector.
const fileSelect1 = document.getElementById("fileSelect1");
const fileElem1 = document.getElementById("fileElem1");

// Again for the other button.
const fileSelect2 = document.getElementById("fileSelect2");
const fileElem2 = document.getElementById("fileElem2");

// If the button is set to read a file, this passes the click through to the input element.
function clickPassCallback1(e) {
    if (fileElem1) {
        fileElem1.click();
    }
};

// If the button is set to process the text field, process the text and set the button back to file read mode.
function processTextAreaAndResetButton1(e) {
    fileSelect1.innerText = 'Load Solution File';
    fileSelect1.addEventListener("click", clickPassCallback1, false);
    fileSelect1.removeEventListener("click", processTextAreaAndResetButton1, false);
    dictionarySolutions.addEventListener('input', prepareForUpdatedTextArea1, { once: true });
    wordleDefaultSolutions.dictStr = dictionarySolutions.value;
    processDictionary(wordleDefaultSolutions);
    loadCurrentDictionaries();
};

// add listeners to the textareas and change the button behavior if the textarea is updated.
function prepareForUpdatedTextArea1() {
    fileSelect1.innerText = 'Process Dictionary';
    fileSelect1.removeEventListener("click", clickPassCallback1, false);
    fileSelect1.addEventListener("click", processTextAreaAndResetButton1, false);
}

// If the button is set to read a file, this passes the click through to the input element.
function clickPassCallback2(e) {
    if (fileElem2) {
        fileElem2.click();
    }
};

// If the button is set to process the text field, process the text and set the button back to file read mode.
function processTextAreaAndResetButton2(e) {
    fileSelect2.innerText = 'Load Guesses File';
    fileSelect2.addEventListener("click", clickPassCallback2, false);
    fileSelect2.removeEventListener("click", processTextAreaAndResetButton2, false);
    dictionaryGuesses.addEventListener('input', prepareForUpdatedTextArea2, { once: true });
    wordleDefaultGuesses.dictStr = dictionaryGuesses.value;
    processDictionary(wordleDefaultGuesses);
    loadCurrentDictionaries();
};

// add listeners to the textareas and change the button behavior if the textarea is updated.
function prepareForUpdatedTextArea2() {
    fileSelect2.innerText = 'Process Dictionary';
    fileSelect2.removeEventListener("click", clickPassCallback2, false);
    fileSelect2.addEventListener("click", processTextAreaAndResetButton2, false);
}

// Set the buttons up for the first click.
fileSelect1.addEventListener("click", clickPassCallback1, false);
fileSelect2.addEventListener("click", clickPassCallback2, false);

// Set up the textareas to detect updates.
dictionarySolutions.addEventListener('input', prepareForUpdatedTextArea1, { once: true });
dictionaryGuesses.addEventListener('input', prepareForUpdatedTextArea2, { once: true });

// we need references to the callbacks so we can remove them later.
const loadDictCallbackSolutions = loadDictionary(wordleDefaultSolutions);
const loadDictCallbackGuesses = loadDictionary(wordleDefaultGuesses);

// Get file loaders to be ready for the click.
fileElem1.addEventListener("change", loadDictCallbackSolutions, false);
fileElem2.addEventListener("change", loadDictCallbackGuesses, false);

// Populate the textareas for first time on page load.
processDictionary(wordleDefaultSolutions);
processDictionary(wordleDefaultGuesses);
loadCurrentDictionaries();


// give the tiles focus if the user clicks them.
const allTiles = document.querySelectorAll(".tile");
for (let i = 0; i < allTiles.length; i++) {
    allTiles[i].addEventListener('click', (e) => allTiles[i].focus());
}

// Capture any keypress.
document.addEventListener("keydown", e => {
    const focusedElem = document.activeElement;
    if (!focusedElem) return;
    if (!focusedElem.classList.contains('tile')) return;

    // We are on a tile, if it's a nav key or a letter, stop the browser from doing anything else with the keypress and we will 
    // handle it explicitly.
    if (ALPHABET.includes(e.key) || TILE_NAV_KEYS.includes(e.key)) {
        e.preventDefault();
    }

    handleKeyInput(e);
})

// A closure to use for callbacks that need a particular dictionary.
function loadDictionary(dict) {
    return function () {
        processFileForDict(this.files[0], dict);
    }
}

// use a promise to wrap the file reader to avoid race conditions processing the contents.
function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    })
}

// Read the file into the dictionary, process the text, and then reload them on the page.
async function processFileForDict(file, dict) {
    try {
        // We want to block here so that we don't process the dictionary before the file contents have loaded into it.
        dict.dictStr = await readFileAsync(file);
        processDictionary(dict);
        loadCurrentDictionaries();
    } catch (err) {
        console.log(err);
    }
}

// Does the work of reading the string value of the dictionary, normalizing it, and then generating an equivalent array with the words.
function processDictionary(dict) {
    // split on any non-alpha chars, remove non-5-letter words, convert to upper case, remove dupes, and sort.
    dict.dictArr = Array.from(
        new Set(dict.dictStr
            .split(/[^A-Za-z]+/)
            .filter(word => word.length === 5)
            .map(word => word.toUpperCase())))
        .sort();
    dict.dictStr = dict.dictArr.join('\n');
}

// We need some special splicing action for strings. 
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

// Update the dictionary textareas from the dictionary variables. Call this anytime the data is manipulated.
function loadCurrentDictionaries() {
    dictionarySolutions.value = wordleDefaultSolutions.dictStr;
    dictionaryGuesses.value = wordleDefaultGuesses.dictStr;
    console.log(wordleDefaultSolutions);
    console.log(wordleDefaultGuesses);
}
//TODO: Delete this.
window.addEventListener('keydown', (e) => {
    console.log(e)
})

const form = document.querySelector("form");
const log = document.querySelector("#log");

form.addEventListener("submit", (event) => {
    const data = new FormData(form);
    //   console.log(data.keys());
    //   console.log(data.getAll());
    let output = "";
    for (const entry of data) {
        output = `${output}${entry[0]}=${entry[1]}\r`;
    };
    log.innerText = output;
    event.preventDefault();
}, false);