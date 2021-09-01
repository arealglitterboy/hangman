'use strict';

const keysets = {
    'en': [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ]
};

class Key extends HTMLButtonElement {
    trigger; // Defined after initial construction during game initialisation

    constructor(letter) {
        super();
        this.value = letter.toLocaleLowerCase();
        this.textContent = letter;
        this.disabled = true;
        this.tabIndex = -1;

        this.classList.add('key');
        this.setAttribute('data-clicked', 'false');
    }

    init = (callBack) => {
        this.trigger = (e) => {
            const result = callBack(this.value);
            if (typeof result !== 'undefined') {
                this.setAttribute('data-clicked', result ? 'correct' : 'incorrect');
                this.disabled = true;
                this.tabIndex = -1;
            }
        };

        this.addEventListener('click', this.trigger);
        this.disabled = false;
        this.tabIndex = 0;
    };

    reset = () => {
        this.disabled = false;
        this.setAttribute('data-clicked', 'false');
        this.tabIndex = 0;
    };
}

customElements.define("key-button", Key, { extends: 'button' });

export default class Keys {
    static createRow = (letters) => {
        const row = document.createElement('section');
        row.classList.add('keys__row');
        row.append(...letters);
        return row;
    };

    static createKeys = (row) => (row.map(letter => new Key(letter)));

    /**
    * 
    * @param {HTMLElement} main 
    * @param {string} locale 
    */
    constructor(main, locale="en") {
        this.main = main;
        this.main.classList.add('keys');

        locale = (locale in keysets) ? locale : 'en'; // Make sure that this locale is supported, otherwise, default to english.
        this.letters = keysets[locale].map(Keys.createKeys); // Map each letter in the keyset array to an instance of key

        this.main.append(...this.letters.map((row) => Keys.createRow(row))); // Instantiate main with rows of keys
    }

    init = (callBack) => this.forEach(key => key.init(callBack));

    reset = () => this.forEach(key => key.reset());

    forEach = (callBackFn) => this.letters.flat().forEach(callBackFn);

    /**
     * 
     * @param {string} letter 
     * @returns {Key}
     */
    findKey = (letter) => this.letters.flat().find((key) => key.value === letter);

    triggerKey = (letter) => {
        const key = this.findKey(letter.toLocaleLowerCase());
        
        if (key && !key.disabled) {
            key.trigger();
        }
    };
}