'use strict';

const keysets = {
    'en': [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ]
};

class Key extends HTMLButtonElement {
    constructor(letter, callBack) {
        super();
        this.value = letter.toLocaleLowerCase();
        this.textContent = letter;

        this.classList.add('key');
        this.setAttribute('data-clicked', 'false');

        this.callBack = callBack;

        const onClick = (e) => {
            const result = this.callBack(letter);
            this.setAttribute('data-clicked', result);
            this.disabled = true;
        };

        this.addEventListener('click', onClick);
    }

    reset = (callBack) => {
        this.callBack = callBack;
        this.disabled = false;
        this.setAttribute('data-clicked', 'false');
    };
}

customElements.define("key-button", Key, { extends: 'button' });

export default class Keys {
    static createRow =  (letters) => {
        const row = document.createElement('section');
        row.classList.add('hangman__keys__row');
        row.append(...letters);
        return row;
    };

    /**
    * 
    * @param {HTMLElement} main 
    * @param {*} locale 
    */
    constructor(main, callBackCreator, locale="en") {
        this.main = main;

        this.keys = [];
        for (let row of keysets[locale]) {
            const letters = row.map((letter) => new Key(letter, (e) => {console.log(e)}));
            this.keys = [...this.keys, Keys.createRow(letters)];
        }
        main.append(...this.keys);
    }
}