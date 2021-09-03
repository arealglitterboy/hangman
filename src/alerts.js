import swal from "sweetalert";

export const loading = () => {
    swal('Loading', { button: false });
    return swal.close;
};

/**
 * 
 * Takes in the results of a game and prints a message to congratulate/console the player, with a button to restart the game
 * @param {function()} restartGame restarts the game
 * @returns 
 */
export const gameAlert = (restartGame) => {

    const gameAlert = (title, body, icon) => swal(title, body, {
        button: { text: 'restart', value: 'restart'},
        icon
    }).then((value) => {
        if (value === 'restart') {
            restartGame()
        }
    });

    return (gameEnd) => (gameEnd.result === 'lost')
            ? gameAlert("No Guesses Left", `${gameEnd.word} was really hard. Better luck next time.`, "error")
            : gameAlert("Congratulations!", `${gameEnd.word}?? You made it look easy!`, "success");
};
