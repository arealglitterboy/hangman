'use strict';

import Hangman from './hangman';
import requestPuzzle from './request';
import Keys from './keys';

import "./style/styles.scss";

let game;

if (/Mobi|Android/.test(navigator.userAgent)) {
    console.log('This is a mobile device.');
}

const getPuzzle = async () => {
    loading.classList.add('loading--in-process');
    const puzzle = await requestPuzzle();
    loading.classList.remove('loading--in-process');
    return puzzle;
}

const startGame = async () => {
    const puzzle = await getPuzzle();
    game = new Hangman(puzzle, document.getElementById('hangman'));
    loading.classList.remove('loading--in-process');
};

const restartGame = async () => {
    const puzzle = await getPuzzle();
    game.restart(puzzle, 5);
}

const loading = document.getElementById('loading');
const reset = document.getElementById('hangman__reset');
const header = document.getElementById('logo');
const keys = new Keys(document.getElementById('keys'));

startGame();

reset.onclick = restartGame;
header.onclick = restartGame;