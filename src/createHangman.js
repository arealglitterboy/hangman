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
                const inWord = word.search(new RegExp(letter, "gi")) >= 0;
                pastGuesses = [ ...pastGuesses, { letter, inWord } ];

                let result = { inWord };
                
                if (!inWord && --guessesLeft === 0) { // If the letter is not in the word, and this was the last guess
                    result = { inWord, result: 'lost', word };
                } else if (word.search(guessesRegExp()) === -1) { // If all the letters in the word have been guessed
                    result = { inWord, result: 'won', word };
                }
                
                return result;
            }
        },
        get word() {
            return (guessesLeft > 0) ? word.replace(guessesRegExp(), '*') : word;
        },
        get guessesLeft() {
            return guessesLeft;
        },
        get pastGuesses() {
            return pastGuesses;
        }
    }
};