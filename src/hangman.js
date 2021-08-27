'use strict';

import createHangman from './createHangman';

export default class Hangman {
    constructor(word, main) {
        this.main = main;

        this.game = createHangman(word);

        this.revealed = main.querySelector('#hangman__word');
        this.guessesList = main.querySelector('#hangman__past-guesses');
        this.guessesRemaining = main.querySelector('#hangman__guesses-left__value');
        this.results = main.querySelector('#hangman__results');

        window.addEventListener('keydown', (e) => {
            if (e.key.match(/[a-z]/i)) {
                this.updateGuesses(e.key.toLocaleLowerCase());
            }
        });
        this.render();
    }

    restart(word, guessesLeft = 5) {
        this.game = createHangman(word, guessesLeft);
        this.render();
        this.results.innerHTML = '';
        this.results.className = 'hangman__results';
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
            segment = segment.split('');
            const span = document.createElement('span');
            span.className = "hangman__word__segment";
            span.append(...segment.map(this.createLetterElement));
            return span;
        });

    }

    createGuesses({ letter, inWord }) {
        const p = document.createElement('p');
        p.className = 'hangman__past-guesses__guess';
        p.classList.toggle('hangman__past-guesses__guess--incorrect', !inWord);
        p.innerText = letter;
        return p;
    }

    createResults(response) {
        if (!response.result) {
            throw new Error('Accessing create results without win/loss');
        }
        const header = document.createElement('h3');
        const message = document.createElement('p');

        if (response.result === "won") {
            header.textContent = 'Congratulations, You Won!';
            message.textContent = 'That was a tough one. Great job.'
        } else {
            header.textContent = 'Better Luck Next Time.';
            message.textContent = `${response.word} was tough, don't feel too bad.`;
        }

        return [header, message];
    }

    updateGuesses(letter) {
        const response = this.game.guess(letter);

        if (response) {
            if (response.result) {
                this.results.className = 'hangman__results hangman__results--' + response.result; 
                this.results.replaceChildren(...this.createResults(response));
            }
            this.render();
        }
        
    }

    render() {
        this.revealed.replaceChildren(...this.createWordSegments(this.game.word));
        this.guessesRemaining.textContent = this.game.guessesLeft;
        this.guessesList.replaceChildren(...this.game.pastGuesses.map(this.createGuesses));
    }
}
