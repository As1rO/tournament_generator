document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('#start');
    const tournamentContainer = document.querySelector('.container-tournament');
    const settingsContainer = document.querySelector('.container-settings');
    const tournamentSelect = document.querySelector('#tournament');
    const historyContainer = document.querySelector('.container-history');
    let nextButton;

    const tournamentHistory = []; // To keep track of each round's results

    // Enable/Disable the start button based on tournament selection
    tournamentSelect.addEventListener('change', () => {
        startButton.disabled = !tournamentSelect.value;
    });

     // Start the tournament when the "start" button is clicked
    startButton.addEventListener('click', () => {
        const numParticipants = parseInt(tournamentSelect.value);

        if (!numParticipants) {
            alert('Please select a valid number of participants!');
            return;
        }

        settingsContainer.classList.add('hidden');
        tournamentContainer.classList.remove('hidden');
        generateInputs(numParticipants);
    });

    /**
     * Generate input fields for tournament round and handle winners.
     * @param {number} num - Number of participants.
     * @param {string[]} [winners] - Array of winner names.
     */
    function generateInputs(num, winners) {
        if(nextButton){
            nextButton.remove(); // remove previous Next button
        }
        nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.disabled = false;
        
        const roundMatches = []; // To keep track of this round's results

        for (let i = 0; i < num; i += 2) {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';

            for (let j = 0; j < 2; j++) {
                if (i + j < num) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';

                    const nameInput = document.createElement('input');
                    nameInput.type = 'text';
                    nameInput.placeholder = `Player ${i + j + 1} Name`;
                    nameInput.required = true;
                    nameInput.value = winners ? winners[i + j] : '';

                    const scoreInput = document.createElement('input');
                    scoreInput.type = 'number';
                    scoreInput.placeholder = 'Score';
                    scoreInput.min = 0;
                    scoreInput.value = 0;
                    scoreInput.required = true;

                    playerDiv.appendChild(nameInput);
                    playerDiv.appendChild(scoreInput);
                    matchDiv.appendChild(playerDiv);
                }
            }
            tournamentContainer.appendChild(matchDiv);
        }
        tournamentContainer.appendChild(nextButton);

    nextButton.addEventListener('click', () => {
        const matches = document.querySelectorAll('.match');
        const winners = [];
        let allValid = true;

        matches.forEach(match => {
            const names = match.querySelectorAll('input[type="text"]');
            const scores = match.querySelectorAll('input[type="number"]');
            let errorMsgText = '';
            let hasError = false;

            // Remove old error messages
            const oldErrors = match.querySelectorAll('.error-message');
            oldErrors.forEach(error => error.remove());

            // Check if names are filled
            names.forEach((nameInput, index) => {
                if (!nameInput.value.trim()) {
                    errorMsgText += ` Player ${index + 1} name is required.`;
                    hasError = true;
                }
            });

            // Check if scores are filled
            scores.forEach((scoreInput, index) => {
                if (scoreInput.value === "") {
                    errorMsgText += ` Player ${index + 1} score is required.`;
                    hasError = true;
                }
            });

            // Check if scores are not equal
            if (parseInt(scores[0].value) === parseInt(scores[1].value)) {
                errorMsgText += ' Scores cannot be equal.';
                hasError = true;
            }

            if (hasError) {
                allValid = false; // If an error is found, don't allow to proceed to the next step
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = errorMsgText.trim();
                match.appendChild(errorMessage);
            } else {
                const winnerIndex = parseInt(scores[0].value) > parseInt(scores[1].value) ? 0 : 1;
                winners.push(names[winnerIndex].value);

                // Add match result to this round's history
                roundMatches.push({
                    players: [names[0].value, names[1].value],
                    scores: [parseInt(scores[0].value), parseInt(scores[1].value)],
                    winner: names[winnerIndex].value
                });
            }
        });

        if (allValid) {
            tournamentHistory.push(roundMatches); // Add this round's results to history
            
            // Remove all current matches
            matches.forEach(match => match.remove());
            
            if(winners.length > 1) {
                generateInputs(winners.length, winners);
            } else {
                nextButton.classList.add('hidden');
                displayTournamentHistory();
                displayWinner(winners[0]);
            }
        }
    });

    }

    /**
     * Show the winner and provide a restart option.
     * @param {string} winner - The winner's name.
     */
    function displayWinner(winner) {
        const winnerDiv = document.createElement('div');
        winnerDiv.className = 'winner';
        winnerDiv.innerHTML = `<p>Congratulations ${winner}! You are the winner!</p>`;
        historyContainer.prepend(winnerDiv);

        // Create Restart Button
        const restartButton = document.createElement('button');
        restartButton.innerText = 'Restart';
        restartButton.classList.add('restart');
        restartButton.addEventListener('click', restartTournament);
        historyContainer.appendChild(restartButton); // Append to history container, adjust if needed
    }


    /**
     * Clear data and UI elements to restart the tournament.
     */
    function restartTournament() {
        // Reset the tournament
        const tournamentContainer = document.querySelector('.container-tournament');
        const settingsContainer = document.querySelector('.container-settings');
        const historyContainer = document.querySelector('.container-history');
        const winnerDiv = document.querySelector('.winner');
        
        // Clear the tournament history and winner
        tournamentHistory.length = 0;
        if (winnerDiv) winnerDiv.remove();
        
        // Show/Hide appropriate containers
        tournamentContainer.innerHTML = '';
        tournamentContainer.classList.add('hidden');
        historyContainer.innerHTML = '';
        historyContainer.classList.add('hidden');
        settingsContainer.classList.remove('hidden');
    }

    /**
     * Render the tournament results/history on the page.
     */
   function displayTournamentHistory() {
    let scoreboardHTML = `<div class="scoreboard">`;

        tournamentHistory.forEach((round, roundIndex) => {
            scoreboardHTML += `<div class="scoreboard-round scoreboard-round--${roundIndex + 1}" >`;

            round.forEach((match, matchIndex) => {
                if (matchIndex % 2 === 0) { // Start a new group for every second match
                    scoreboardHTML += `<div class="scoreboard-match-group">`;
                }

                scoreboardHTML += `<div class="scoreboard-match">`;

                match.players.forEach((player, playerIndex) => {
                    scoreboardHTML += `
                        <div class="scoreboard-player">
                            <span class="name">${player}</span>
                            <span class="score">${match.scores[playerIndex]}</span>
                        </div>`;
                });

                scoreboardHTML += `</div>`; // Close scoreboard-match

                if (matchIndex % 2 !== 0 || matchIndex === round.length - 1) { // Close the group after every second match or if it's the last match in the round
                    scoreboardHTML += `</div>`; // Close scoreboard-match-group
                }
            });

            scoreboardHTML += `</div>`; // Close scoreboard-round
        });

        scoreboardHTML += `</div>`; // Close scoreboard

        historyContainer.innerHTML = scoreboardHTML;
        historyContainer.classList.remove('hidden');
    }
});
