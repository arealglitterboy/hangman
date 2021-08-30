'use strict';

import createHangman from './createHangman';

// ! Next update try to redo the render pipeline so that

export default class Hangman {
    constructor(word, wordHolder, guessesHolder, onGameEnd = () => {}) {
        this.game = createHangman(word); // ! This doesn't have a guessesLeft argument, inconsistent.

        this.wordHolder = wordHolder;
        this.guessesHolder = guessesHolder;

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
        this.wordHolder.replaceChildren(...this.createWordSegments(this.game.word));
        this.guessesHolder.textContent = this.game.guessesLeft;
    }
}