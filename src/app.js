'use strict';

const getPuzzle = async () => {
    loading.classList.add('loading--in-process');
    const puzzle = await Puzzle.request();
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

let game;

startGame();

reset.onclick = restartGame;
header.onclick = restartGame;