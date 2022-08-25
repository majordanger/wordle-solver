
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
    }

    // Do special formatting for i-tiles.
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

// Handle focus navigation for any tile.
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

// Determine the tile type and delegate handling the event.
function handleKeyInputForTileCharOrBack(e, elem) {
    const para = elem.firstElementChild;
    const textLength = para.textContent.length;
    const key = e.key;
    const isCTile = elem.classList.contains('c-tile');
    const isMTile = elem.classList.contains('m-tile');
    const isITile = elem.classList.contains('i-tile');
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
}

export {
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
};