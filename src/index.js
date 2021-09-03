'use strict';

import Hangman from './hangman';
import requestPuzzle from './request';
import Keys from './keys';
import { gameAlert, loading } from './alerts';

import "./style/styles.scss";

if (/Mobi|Android/.test(navigator.userAgent)) {
    console.log('This is a mobile device.');
}

const getPuzzle = async () => (requestPuzzle());

const startGame = async () => {
    const close = loading();
    const puzzle = await getPuzzle();
    game = new Hangman(puzzle, document.getElementById('word'), document.getElementById('guesses-left'), document.getElementById('hangman-image'), message);
    keys.init((letter) => game.updateGuesses(letter));
    close();
};

const restartGame = async () => {
    const puzzle = await getPuzzle();
    game.start(puzzle);
    keys.reset();
}

window.addEventListener('keydown', (e) => {
    if (e.key.length == 1 && e.key.match(/[a-z]/i)) {
        keys.triggerKey(e.key);
    }
});

const keys = new Keys(document.getElementById('keys'));
let game;
const message = gameAlert(restartGame);

startGame();

document.getElementById('reset').addEventListener('click', restartGame);