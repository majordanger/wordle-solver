// Dictionaries that the solver will use and Dictionary tab will interact with.
const wordleDefaultSolutions = {
    dictStr: 'TESTA\nTESTB\nTESTC\nTESTD',
    dictArr: ['TESTA', 'TESTB', 'TESTC', 'TESTD']
};
const wordleDefaultGuesses = {
    // dictStr: 'TESTE\nTESTF\nTESTG\nTESTH',
    // dictArr: ['TESTE', 'TESTF', 'TESTG', 'TESTH']
    dictStr: 'TESTE\nTESTF\nTESTG\nTESTH',
    dictArr: ['TESTE', 'TESTF', 'TESTG', 'TESTH']
};

// The text areas.
const dictionarySolutions = document.querySelector("#solutions");
const dictionaryGuesses = document.querySelector("#guesses");

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TILE_NAV_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter', 'Backspace'];

const LARGE_TILE_LETTER = '40px';
const MEDIUM_TILE_LETTER = '22px';
const SMALL_TILE_LETTER = '16px';

// Create a map and reverse map of the tiles for easier navigation.
const indexToTile = new Map();
const tileToIndex = new Map();

indexToTile.set(0, 'x0_y0');
indexToTile.set(1, 'x1_y0');
indexToTile.set(2, 'x2_y0');
indexToTile.set(3, 'x3_y0');
indexToTile.set(4, 'x4_y0');
indexToTile.set(5, 'x0_y1');
indexToTile.set(6, 'x1_y1');
indexToTile.set(7, 'x2_y1');
indexToTile.set(8, 'x3_y1');
indexToTile.set(9, 'x4_y1');
indexToTile.set(10, 'x0_y2');
tileToIndex.set('x0_y0', 0);
tileToIndex.set('x1_y0', 1);
tileToIndex.set('x2_y0', 2);
tileToIndex.set('x3_y0', 3);
tileToIndex.set('x4_y0', 4);
tileToIndex.set('x0_y1', 5);
tileToIndex.set('x1_y1', 6);
tileToIndex.set('x2_y1', 7);
tileToIndex.set('x3_y1', 8);
tileToIndex.set('x4_y1', 9);
tileToIndex.set('x0_y2', 10);

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

// When a key is pressed, do special things depending on key and focused element.
function handleKeyInput(e) {
    const focusedElem = document.activeElement;
    const key = e.key;

    const keyIsNavKey = TILE_NAV_KEYS.includes(key);
    const keyIsCharKey = ALPHABET.includes(key);

    // Include backspace and space because we may want to delete a char from a tile-string;
    if (keyIsCharKey || key === 'Backspace' || key === ' ') {
        handleKeyInputForTileCharOrBack(e, focusedElem);
    } else if (keyIsNavKey) {
        handleKeyInputForTileNav(key, focusedElem);
    }
}

function handleKeyInputForTileNav(key, elem) {
    let tileIndex = tileToIndex.get(elem.id);
    let tileID = elem.id;
    if (key === 'ArrowUp') {
        tileIndex = Math.max(0, tileIndex - 5);
        tileID = indexToTile.get(tileIndex);
    } else if (key === 'ArrowDown') {
        tileIndex = Math.min(10, tileIndex + 5);
        tileID = indexToTile.get(tileIndex);
    } else if (key === 'ArrowRight' || key === ' ') {
        tileIndex = Math.min(10, tileIndex + 1);
        tileID = indexToTile.get(tileIndex);
    } else if (key === 'ArrowLeft' || key === 'Backspace') {
        tileIndex = Math.max(0, tileIndex - 1);
        tileID = indexToTile.get(tileIndex);
    }
    document.querySelector('#' + tileID).focus();
}

function handleKeyInputForTileCharOrBack(e, elem) {
    const para = elem.firstElementChild;
    const textLength = para.textContent.length;
    const key = e.key;
    const isCTile = elem.classList.contains('c-tile');
    const isMTile = elem.classList.contains('m-tile');
    const isITile = elem.classList.contains('i-tile');
    // let maxLength = 0
    // if (isCTile) {
    //     maxLength = 1;
    // } else if (isMTile) {
    //     maxLength = 12;
    // } else if (isITile) {
    //     maxLength = 26;
    // } else {
    //     console.log('ERROR: This should never happen.');
    // }
    // alert(key);
    if (key === 'Backspace' && textLength === 0) {
        handleKeyInputForTileNav('Backspace', elem);
    } else if (isCTile) {
        updateCTile(key, elem);
    } else if (isMTile) {
        updateMTile(key, elem);
    } else if (isITile) {
        updateITile(key, elem);
    } else {
        console.log('ERROR: This should never happen.');
    }

    // if (key === 'Backspace' && textLength > 0) {
    //     para.textContent = para.textContent.slice(0, textLength - 1);
    //     formatTileText(para);
    // } else if (key === 'Backspace' && textLength === 0) {
    //     handleKeyInputForTileNav('Backspace', elem);
    // } else if (!(para.textContent.includes(key.toUpperCase())) && ALPHABET.includes(key) && textLength < maxLength) {
    //     para.textContent += key;
    //     formatTileText(para);
    // }
}

// Handle all the custom formatting we need to make the tiles look good.
function updateCTile(key, elem) {
    const p = elem.firstElementChild;
    if (ALPHABET.includes(key)) {
        p.style.fontSize = LARGE_TILE_LETTER;
        p.textContent = key.toUpperCase();
        handleKeyInputForTileNav(' ', elem);
    } else if (p.textContent.length >= 1 && key === 'Backspace') {
        p.textContent = '';
    } else if (key === ' ') {
        p.textContent = '';
        handleKeyInputForTileNav(' ', elem);
    }
}

// Handle all the custom formatting we need to make the tiles look good.
function updateMTile(key, elem) {
    const p = elem.firstElementChild;
    let rawText = p.textContent;

    if (key === ' ') {
        handleKeyInputForTileNav(' ', elem);
        return;
    } else if (key === 'Backspace' && p.textContent.length > 0) {
        p.textContent = p.textContent.slice(0, p.textContent.length - 1);
        rawText = p.textContent;
    } else if (!(p.textContent.includes(key.toUpperCase())) && ALPHABET.includes(key) && p.textContent.length < 12) {
        p.textContent += key;
        rawText = p.textContent;
        console.log(p.textContent);
    }

    // Do special formatting for m-tiles.
    if (rawText.length <= 1) {
        p.style.fontSize = LARGE_TILE_LETTER;
        p.textContent = rawText.toUpperCase();
    } else if (rawText.length === 2) {
        p.style.fontSize = MEDIUM_TILE_LETTER;
        p.textContent = rawText.toUpperCase();
    } else if (rawText.length <= 4) {
        p.style.fontSize = MEDIUM_TILE_LETTER;
        p.innerText = rawText.splice(2, '\n').toUpperCase();
    } else if (rawText.length <= 6) {
        p.style.fontSize = MEDIUM_TILE_LETTER;
        p.innerText = rawText.splice(3, '\n').toUpperCase();
    } else if (rawText.length <= 9) {
        p.style.fontSize = SMALL_TILE_LETTER;
        p.innerText = rawText.splice(3, '\n').splice(7, '\n').toUpperCase();
    } else if (rawText.length <= 12) {
        p.style.fontSize = SMALL_TILE_LETTER;
        p.innerText = rawText.splice(4, '\n').splice(9, '\n').toUpperCase();
    }
}

// Handle all the custom formatting we need to make the tiles look good.
function updateITile(key, elem) {
    const p = elem.firstElementChild;
    let rawText = p.textContent;

    if (key === ' ') {
        handleKeyInputForTileNav(' ', elem);
        return;
    } else if (key === 'Backspace' && p.textContent.length > 0) {
        p.textContent = p.textContent.slice(0, p.textContent.length - 1);
        rawText = p.textContent;
    } else if (!(p.textContent.includes(key.toUpperCase())) && ALPHABET.includes(key) && p.textContent.length < 26) {
        p.textContent += key;
        rawText = p.textContent;
        console.log(p.textContent);
    }

    // Do special formatting for m-tiles.
    if (rawText.length <= 10) {
        p.style.fontSize = LARGE_TILE_LETTER;
        p.textContent = rawText.toUpperCase();
    } else if (rawText.length <= 18) {
        p.style.fontSize = MEDIUM_TILE_LETTER;
        p.textContent = rawText.toUpperCase();
    } else {
        p.style.fontSize = SMALL_TILE_LETTER;
        p.textContent = rawText.toUpperCase();
    }
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