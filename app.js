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
    if (!focusedElem) return;

    const key = e.key;
    const tileNavKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'];

    const focusedElemIsTile = focusedElem.classList.contains('tile');
    const keyIsNavKey = tileNavKeys.includes(key);
    const keyIsCharKey = ALPHABET.includes(key);

    if (!focusedElemIsTile) return;

    if (keyIsNavKey) {
        handleKeyInputForTileNav(e, focusedElem);
    } else {
        handleKeyInputForTileChar(e, focusedElem);
    }
}

function handleKeyInputForTileNav(e, elem) {
    alert('nav on tile');
}

function handleKeyInputForTileChar(e, elem) {
    const para = elem.firstElementChild;
    const textLength = para.textContent.length;
    const key = e.key;
    let maxLength = 0
    if (elem.classList.contains('c-tile')) {
        maxLength = 1;
    } else if (elem.classList.contains('m-tile')) {
        maxLength = 12;
    } else {
        maxLength = 26;
    }
    // alert(key);
    if (key === 'Backspace' && textLength > 0) {
        para.textContent = para.textContent.slice(0, textLength - 1);
        formatTileText(para);
    } else if (!(para.textContent.includes(key.toUpperCase())) && ALPHABET.includes(key) && textLength < maxLength) {
        para.textContent += key;
        formatTileText(para);
    }
}

// Handle all the custom formatting we need to make the tiles look good.
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