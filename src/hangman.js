'use strict';

import createHangman from './createHangman';

class Segment extends HTMLDivElement {
    constructor(word) {
        super();
        this.classList.add('word__segment');
        this.innerHTML = word.replace(/./g, `<span class="word__segment__letter">$&</span>`);
    }

    #updateLetter = (letter, index) => this.children.item(index).textContent = letter;

    update = (word) => word.split('').map(this.#updateLetter);
}
customElements.define("segment-div", Segment, { extends: 'div' });

export default class Hangman {
    static parts = ['face', 'torso', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    static guesses = this.parts.length;

    game;
    gameOver;
    segments;
    /**
     * 
     * @param {string} word 
     * @param {HTMLElement} wordHolder 
     * @param {*} guessesHolder 
     * @param {HTMLElement} hangmanImage
     * @param {() => {}} onGameEnd 
     */
    constructor(word, wordHolder, guessesHolder, hangmanImage, onGameEnd = () => {}) {
        this.wordHolder = wordHolder;
        this.wordHolder.classList.add('word');
        
        this.guessesHolder = guessesHolder;
        this.hangmanImage = hangmanImage;
        
        this.onGameEnd = onGameEnd;
        
        this.start(word);
        this.render();
    }

    start(word) {
        this.game = createHangman(word, Hangman.guesses);
        this.gameOver = false;
        this.hangmanImage.dataset.hanged = "";
        this.createWordSegments(this.game.word);
        this.render();
    }

    /**
     * 
     * @param {string} word 
     */
    createWordSegments(word) {
        this.segments = word.split(' ').map((segment) => new Segment(segment));
        this.wordHolder.replaceChildren(...this.segments);
    }

    updateGuesses(letter) {
        const response = this.game.guess(letter);

        if (response && !this.gameOver) {
            if (!response.inWord) {
                this.hangmanImage.dataset.hanged = Hangman.parts.slice(0, Hangman.guesses - this.game.guessesLeft).join(' ');
            }
            if (response.result) {
                this.gameOver = true;
                this.onGameEnd(response);
            }
            this.render();

            return response.inWord;
        }
    }

    updateSegment = (segment, i) => this.segments[i].update(segment);

    render() {
        this.game.word.split(' ').map(this.updateSegment);
        this.guessesHolder.textContent = this.game.guessesLeft;
    }
}