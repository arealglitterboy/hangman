'use strict';

import createHangman from './createHangman';

// ! Next update try to redo the render pipeline so that

export default class Hangman {
    constructor(word, main, onGameEnd = () => {}) {
        this.main = main;

        this.game = createHangman(word); // ! This doesn't have a guessesLeft argument, inconsistent.

        this.revealed = main.querySelector('#hangman__word');
        this.guessesRemaining = main.querySelector('#hangman__guesses-left__value');

        this.onGameEnd = onGameEnd;

        this.render();
    }

    restart(word, guessesLeft = 5) {
        this.game = createHangman(word, guessesLeft);
        this.render();
    }

    createLetterElement(letter) {
        const element = document.createElement('p');
        element.textContent = letter;
        element.className = "hangman__word__segment__letter";
        return element;
    }

    createWordSegments(word) {
        const arr = word.split(' ');
        
        return arr.map((segment) =>  {
            const span = document.createElement('span');
            
            span.className = "hangman__word__segment";
            span.append(...segment.split('').map(this.createLetterElement));

            return span;
        });
    }

    updateGuesses(letter) {
        const response = this.game.guess(letter);

        if (response) {
            if (response.result) {
                this.onGameEnd(response);
            }
            this.render();

            return response.inWord;
        }
    }

    render() {
        this.revealed.replaceChildren(...this.createWordSegments(this.game.word));
        this.guessesRemaining.textContent = this.game.guessesLeft;
    }
}