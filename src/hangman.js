'use strict';

import createHangman from './createHangman';

// ! Next update try to redo the render pipeline so that

export default class Hangman {
    static parts = ['face', 'torso', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    static guesses = this.parts.length;

    /**
     * 
     * @param {string} word 
     * @param {HTMLElement} wordHolder 
     * @param {*} guessesHolder 
     * @param {HTMLElement} hangmanImage
     * @param {() => {}} onGameEnd 
     */
    constructor(word, wordHolder, guessesHolder, hangmanImage, onGameEnd = () => {}) {
        this.game = createHangman(word, Hangman.guesses);
        
        this.wordHolder = wordHolder;
        this.wordHolder.classList.add('word');

        this.guessesHolder = guessesHolder;
        this.hangmanImage = hangmanImage;

        this.onGameEnd = onGameEnd;

        this.render();
    }

    restart(word) {
        this.game = createHangman(word, Hangman.guesses);
        this.hangmanImage.dataset.hanged = "";
        this.render();
    }

    createLetterElement(letter) {
        const element = document.createElement('p');
        element.textContent = letter;
        element.className = "word__segment__letter";
        return element;
    }

    createWordSegments(word) {
        const arr = word.split(' ');
        
        return arr.map((segment) =>  {
            const span = document.createElement('span');
            
            span.className = "word__segment";
            span.append(...segment.split('').map(this.createLetterElement));

            return span;
        });
    }

    updateGuesses(letter) {
        const response = this.game.guess(letter);

        if (response) {
            if (!response.inWord) {
                this.hangmanImage.dataset.hanged = Hangman.parts.slice(0, Hangman.guesses - this.game.guessesLeft).join(' ');
            }
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