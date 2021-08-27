'use strict';

import Hangman from './hangman';
import requestPuzzle from './request';
import { isEmail } from 'validator';

const email = "benwbrown1029@gmail.com";

console.log(email, `is ${isEmail(email) ? '' : 'not'} an email.`);

let game;

if ('ontouchstart' in document.documentElement) {
    console.log('its a tippy tappy device');
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

startGame();

reset.onclick = restartGame;
header.onclick = restartGame;