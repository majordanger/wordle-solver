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
    tileToIndex
}
    from './tileNav.js';
import { solutionsDictionary, guessesDictionary, expandedDictionary, dictLastUpdated } from './dictionaries.js';


// The text areas.
const dictionarySolutions = document.querySelector("#solutions");
const dictionaryGuesses = document.querySelector("#guesses");

// The counters below the text areas.
const solutionCount = document.querySelector("#solutionCount");
const guessesCount = document.querySelector("#guessesCount");

// The standard file selector is ugly so hide it and replace it with a button. 
// Add a listener to the button that in turn clicks the hidden selector.
const fileSelect1 = document.getElementById("fileSelect1");
const fileElem1 = document.getElementById("fileElem1");

// Again for the other button.
const fileSelect2 = document.getElementById("fileSelect2");
const fileElem2 = document.getElementById("fileElem2");


// START Expanded dictionary button code.
const dictSelectButton = document.querySelector("#dictionarySelect");
const useExpandedDictionaryCallback = useExpandedDictionary.bind(null, dictSelectButton);
const useWordleDictionaryCallback = useWordleDictionary.bind(null, dictSelectButton);

function useExpandedDictionary(elem) {
    elem.innerText = 'Use Wordle Dictionary';
    elem.addEventListener("click", useWordleDictionaryCallback);
    elem.removeEventListener("click", useExpandedDictionaryCallback);
    solutionsDictionary.dictStr = expandedDictionary.origDictStr;
    guessesDictionary.dictStr = '';
    processDictionary(solutionsDictionary);
    processDictionary(guessesDictionary);
    loadCurrentDictionaries();
};

function useWordleDictionary(elem) {
    elem.innerText = 'Use Expanded Dictionary';
    elem.addEventListener("click", useExpandedDictionaryCallback);
    elem.removeEventListener("click", useWordleDictionaryCallback);
    solutionsDictionary.dictStr = solutionsDictionary.origDictStr;
    guessesDictionary.dictStr = guessesDictionary.origDictStr;
    processDictionary(solutionsDictionary);
    processDictionary(guessesDictionary);
    loadCurrentDictionaries();
};

dictSelectButton.addEventListener("click", useExpandedDictionaryCallback);
// END Expanded dictionary button code.

let solver;

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
    solutionsDictionary.dictStr = dictionarySolutions.value;
    processDictionary(solutionsDictionary);
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
    guessesDictionary.dictStr = dictionaryGuesses.value;
    processDictionary(guessesDictionary);
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
const loadDictCallbackSolutions = loadDictionary(solutionsDictionary);
const loadDictCallbackGuesses = loadDictionary(guessesDictionary);

// Get file loaders to be ready for the click.
fileElem1.addEventListener("change", loadDictCallbackSolutions, false);
fileElem2.addEventListener("change", loadDictCallbackGuesses, false);

// Populate the textareas for first time on page load.
solutionsDictionary.dictStr = solutionsDictionary.origDictStr;
guessesDictionary.dictStr = guessesDictionary.origDictStr;
processDictionary(solutionsDictionary);
processDictionary(guessesDictionary);
loadCurrentDictionaries();


// give the tiles focus if the user clicks them.
const allTiles = document.querySelectorAll(".tile");
for (let i = 0; i < allTiles.length; i++) {
    allTiles[i].addEventListener('click', (e) => allTiles[i].focus());
    allTiles[i].addEventListener('focusin', (event) => {
        document.querySelector(".last-selected-tile").classList.remove("last-selected-tile");
        allTiles[i].classList.add("selected-tile");
        allTiles[i].classList.add("last-selected-tile");
    });
    allTiles[i].addEventListener('focusout', (event) => { allTiles[i].classList.remove("selected-tile") });
}

// Capture any keypress.
document.addEventListener("keydown", e => {
    console.log(e);

    if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        document.querySelector('#about').click();
    }

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
    dict.origDictArr = [...dict.dictArr];
    dict.dictStr = dict.dictArr.join('\n');
}

// We need some special splicing action for strings. 
if (!String.prototype.splice) {
    String.prototype.splice = function (start, subStr) {
        return this.slice(0, start) + subStr + this.slice(start);
    };
}

// Update the dictionary textareas from the dictionary variables. Call this anytime the data is manipulated.
function loadCurrentDictionaries() {
    dictionarySolutions.value = solutionsDictionary.dictStr;
    solutionCount.textContent = 'Total: ' + solutionsDictionary.dictArr.length;
    dictionaryGuesses.value = guessesDictionary.dictStr;
    guessesCount.textContent = 'Total: ' + guessesDictionary.dictArr.length;
}

const lastUpdate = document.querySelector("#lastUpdated");
lastUpdate.innerText = `Dictionaries last updated: ${dictLastUpdated}`;

//TODO: Delete this.
// window.addEventListener('keydown', (e) => {
//     console.log(e)
// })

const form = document.querySelector("form");
const table = document.querySelector("#outputTable");
const message = document.querySelector("#message");

form.addEventListener("submit", (event) => {
    // Get the form data and parse it into args to pass in to the solver. We can't pass the formdata to worker directly because structuredClone() doesn't work on it.
    const data = new FormData(form);
    // Default with these off because the params may not contain an entry from the form input.
    let useKnownInfo = false;
    let onlyValidSols = false;
    let strategy = '';
    for (const entry of data) {
        if (entry[0] === 'strategySelection') {
            strategy = entry[1];
        } else if (entry[0] === 'useKnownInfo') {
            useKnownInfo = true;
        } else if (entry[0] === 'onlyValidSols') {
            onlyValidSols = true;
        }
    };

    const computeButton = document.querySelector("#compute");
    const stopButton = document.querySelector("#stop");
    const computeButtonText = document.querySelector("#computeText");
    const computeButtonPerc = document.querySelector("#computeComplete");
    event.preventDefault();

    let results = '';
    getCurrentGuessDataFromInput();

    // if (false) {
    if (typeof (Worker) !== "undefined") {
        console.log("Using Worker");
        const worker = new Worker('./worker.js');
        let buttonsSwitchedYet = false;

        const buttonChangeThreshold = 50; //percent done.

        worker.onmessage = (event) => {
            if (typeof (event.data) !== 'number') {
                computeButtonText.innerHTML = 'Compute Guesses';
                computeButtonPerc.innerText = '';
                computeButton.disabled = false;
                stopButton.disabled = true;
                // clone the node and replace it with itself to get rid of event listeners.
                stopButton.replaceWith(stopButton.cloneNode(true));
                results = event.data;
                drawResults(results, strategy);
                worker.terminate();
            } else {
                // It's only worth switching to the spinner if the process is going to run for a while. 
                if (!buttonsSwitchedYet) {
                    if (event.data < buttonChangeThreshold) {
                        buttonsSwitchedYet = true;
                        // We're about to do potentially long-running work so swap in the spinner on the button.
                        computeButtonText.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Computing...';
                        computeButtonPerc.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
                        computeButton.disabled = true;
                        stopButton.disabled = false;
                    }
                }
                if (event.data < 10) {
                    computeButtonPerc.innerHTML = `&nbsp;&nbsp;${event.data}%`;
                } else if (event.data < 100) {
                    computeButtonPerc.innerHTML = `&nbsp;${event.data}%`;
                } else {
                    computeButtonPerc.innerHTML = `${event.data}%`;
                }
            }
        };

        worker.onerror = (error) => {
            console.log(`Worker error: ${error.message}`);
            worker.terminate();
            throw error;
        };

        stopButton.addEventListener('click', () => {
            worker.terminate();
            computeButton.disabled = false;
            stopButton.disabled = true;
            stopButton.replaceWith(stopButton.cloneNode(true));
            computeButtonText.innerHTML = 'Compute Guesses';
            computeButtonPerc.innerText = '';
        });

        worker.postMessage([strategy, useKnownInfo, onlyValidSols, correctData, misplacedData, incorrectData, solutionsDictionary.origDictArr, guessesDictionary.origDictArr]);

    } else {
        console.log("Using non-Worker.");
        solver = new Solver(strategy, useKnownInfo, onlyValidSols, correctData, misplacedData, incorrectData, solutionsDictionary.origDictArr, guessesDictionary.origDictArr);
        results = solver.compute();
        drawResults(results, strategy);
    }
}, false);

// We're going to have to replace this guy everytime we get new results.
let intersectionObserver = null;

function drawResults(results, strategy) {

    // Clear the display areas.
    table.innerHTML = '';
    message.innerHTML = '';

    if (results.size > 0) {
        let tableArr = null;
        if (strategy === 'letterMatch') {
            tableArr = Array.from(results).sort((a, b) => b[1] - a[1]);
        } else if (strategy === 'reduceSpace') {
            tableArr = Array.from(results).sort((a, b) => a[1] - b[1]);
        }
        const intersectionObserverOptions = {
            root: null,
            threshold: 0,
            rootMargin: '100px'
        };
        // Create a closure with the counter of how far into the list we are and the results data.
        const intersectionObserverCallback = function (results) {
            let counter = 0;
            return function (entries, observer) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    const lastRow = generateTable(results, counter);
                    counter += 100;
                    observer.unobserve(entry.target);
                    if (lastRow) {
                        observer.observe(lastRow);
                    }
                })
            }
        }(tableArr);
        intersectionObserver = new IntersectionObserver(intersectionObserverCallback, intersectionObserverOptions);
        const tBody = generateTableHead();
        intersectionObserver.observe(tBody);
        const resultStr = (results.size === 1 ? 'result' : 'results');
        message.innerHTML = `<hr><center><strong>${results.size} ${resultStr}</strong></center><hr>`;
    } else {
        message.innerHTML = "<hr><strong>No results!</strong> Double check that you haven't put impossible/conflicting info into the solver, " +
            "like the same letter in both CORRECT/MISPLACED and INCORRECT fields. If you are playing a variant game such as Dordle, you may be " +
            "getting feedback from a larger dictionary than Wordle uses yielding zero results. Consider using an expanded dictionary if this is" +
            " the case.";
    }
}

function generateTableHead() {
    const thead = table.createTHead();
    const row = thead.insertRow();
    const colHeads = ['Rank', 'Word', 'Score', 'Is Soln'];
    for (let colHead of colHeads) {
        let th = document.createElement("th");
        let text = document.createTextNode(colHead);
        th.appendChild(text);
        row.appendChild(th);
    }
    // We need to create a return a body that can be observed and appended to.
    return table.createTBody();
}

// We want to do infinitie scrolling so add 100 rows at a time from the start index.
function generateTable(data, startIndex) {
    const endIndex = startIndex + 100;
    let returnLastRow = true;
    let row;
    if (endIndex > data.size) {
        returnLastRow = false;
    }
    for (let i = startIndex; i < data.length && i < endIndex; i++) {
        row = table.tBodies[0].insertRow();

        let cell = row.insertCell();
        let text = document.createTextNode(i + 1);
        cell.appendChild(text);
        cell = row.insertCell();
        text = document.createTextNode(data[i][0]);
        cell.appendChild(text);
        cell = row.insertCell();
        text = document.createTextNode(data[i][1]);
        cell.appendChild(text);
        cell = row.insertCell();
        text = document.createTextNode(data[i][2]);
        cell.appendChild(text);
    }

    // Return the last row if there are still rows to draw so that we can observe it.
    if (returnLastRow) {
        return row;
    } else {
        return null;
    }
}

const correctData = new Array(5);
const correctParas = new Array(
    document.querySelector("#x0_y0").firstElementChild,
    document.querySelector("#x1_y0").firstElementChild,
    document.querySelector("#x2_y0").firstElementChild,
    document.querySelector("#x3_y0").firstElementChild,
    document.querySelector("#x4_y0").firstElementChild
);
const misplacedData = new Array(5);
const misplacedParas = new Array(
    document.querySelector("#x0_y1").firstElementChild,
    document.querySelector("#x1_y1").firstElementChild,
    document.querySelector("#x2_y1").firstElementChild,
    document.querySelector("#x3_y1").firstElementChild,
    document.querySelector("#x4_y1").firstElementChild
);
let incorrectData = new Array(26);
const incorrectPara = document.querySelector("#x0_y2").firstElementChild;

function getCurrentGuessDataFromInput() {
    for (let i = 0; i < correctData.length; i++) {
        correctData[i] = correctParas[i].textContent;
    }
    for (let i = 0; i < misplacedData.length; i++) {
        misplacedData[i] = misplacedParas[i].textContent;
    }
    incorrectData = incorrectPara.textContent;
};

// alert(`concurrency: ${navigator.hardwareConcurrency}`);

// const beforeUnloadListener = (event) => {
//     event.preventDefault();
//     console.log('Bing');
//     return event.returnValue = "Are you sure you want to exit?";
// };

// window.onbeforeunload = beforeUnloadListener;
// window.onbeforeunload = function () {
//     preventDefault();
//     return 'Are you sure you want to leave? Data entered will be lost.';
// };