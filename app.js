const wordleDefaultSolutions = "TEST1\nTEST2\nTEST3\nTEST4";
const wordleDefaultGuesses = "TEST5\nTEST6\nTEST7\nTEST8";
const dictionarySolutions = document.querySelector("#solutions");
const dictionaryGuesses = document.querySelector("#guesses");

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
    alert(this.files[0].name);
}

fileElem1.addEventListener("change", doStuff, false);


loadCurrentDictionaries();


const allTiles = document.querySelectorAll(".tile");
console.log(allTiles);
for (let i = 0; i < allTiles.length; i++) {
    allTiles[i].addEventListener('click', (e) => allTiles[i].focus());
    console.log(allTiles[i].onclick);
}

const divs = document.querySelectorAll(".wrap-tile p");
for (let i = 0; i < divs.length; i++) {

    // console.log(divs[i].textContent);
    // console.log(divs[i].innerHTML);
    // console.log(divs[i].innerText);
    // divs[i].innerText = "A\nBcwe\nfgh";
    // // divs[i].innerText = divs[i].textContent;
    // console.log(divs[i].textContent);
    // console.log(divs[i].innerHTML);
    // console.log(divs[i].innerText);
    // console.log(p);
}
console.log(divs);

function formatPForTile (p) {
    const rawText = p.textContent;
    if (rawText.length === 0) return p;

}