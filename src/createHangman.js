'use strict';

export default (word = "", numberOfGuesses = 5) => {
    let guessesLeft = numberOfGuesses;
    let pastGuesses = [];

    const guessesRegExp = () => new RegExp(`[^${pastGuesses.map(({letter}) => letter).join('')} ]`, 'gi');
    const wasPastGuess = (letter) => (pastGuesses.some((x) => (x.letter === letter)));

    return {
        guess(letter) {
            if (typeof letter !== 'string' || letter.length !== 1) { // If the input is not a string of length 1
                throw new Error(`${letter} passed to guess is not a valid input.`);
            }

            if (guessesLeft > 0 && !wasPastGuess(letter)) {
                const inWord = word.match(new RegExp(letter, "gi"));
                pastGuesses = [ ...pastGuesses, { letter, inWord } ];

                let result = {};
                
                if (!inWord && --guessesLeft === 0) { // If the letter is not in the word, and this was the last guess
                    result = { result: 'lost', word };
                } else if (word.search(guessesRegExp()) === -1) { // If all the letters in the word have been guessed
                    result = { result: 'won', word };
                }
                
                return result;
            }
        },
        get word() {
            return word.replace(guessesRegExp(), '*');
        },
        get guessesLeft() {
            return guessesLeft;
        },
        get pastGuesses() {
            return pastGuesses;
        }
    }
};