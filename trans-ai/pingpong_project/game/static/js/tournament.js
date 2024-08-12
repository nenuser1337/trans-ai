let tournamentData = {
    players: [],
    matches: [],
    currentMatch: null,
    matchOrder: [],
    results: {}
};

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName && !tournamentData.players.includes(playerName)) {
        tournamentData.players.push(playerName);
        updateTournamentInfo();
        document.getElementById('playerName').value = '';
    }
}

function startTournament() {
    if (tournamentData.players.length < 2) {
        alert('Please add at least 2 players to start the tournament.');
        return;
    }
    
    // Shuffle players
    tournamentData.players.sort(() => Math.random() - 0.5);
    
    // Create matches
    tournamentData.matches = [];
    for (let i = 0; i < tournamentData.players.length - 1; i++) {
        for (let j = i + 1; j < tournamentData.players.length; j++) {
            tournamentData.matches.push([tournamentData.players[i], tournamentData.players[j]]);
        }
    }
    
    tournamentData.matchOrder = [...tournamentData.matches];
    tournamentData.currentMatch = tournamentData.matches.shift();
    tournamentData.results = Object.fromEntries(tournamentData.players.map(player => [player, 0]));
    
    updateTournamentInfo();
    document.getElementById('startTournamentBtn').disabled = true;
    document.getElementById('gameArea').style.display = 'block';
    announceNextMatch();
}

function resetTournament() {
    tournamentData = {
        players: [],
        matches: [],
        currentMatch: null,
        matchOrder: [],
        results: {}
    };
    updateTournamentInfo();
    document.getElementById('startTournamentBtn').disabled = false;
    document.getElementById('gameArea').style.display = 'none';
}

function updateTournamentInfo() {
    const tournamentInfo = document.getElementById('tournamentInfo');
    tournamentInfo.innerHTML = `
        <h2>Players:</h2>
        <ul>${tournamentData.players.map(player => `<li>${player}</li>`).join('')}</ul>
        <h2>Remaining Matches:</h2>
        <ul>${tournamentData.matches.map(match => `<li>${match[0]} vs ${match[1]}</li>`).join('')}</ul>
    `;
    
    const matchOrder = document.getElementById('matchOrder');
    matchOrder.innerHTML = `
        <h2>Match Order:</h2>
        <ol>${tournamentData.matchOrder.map(match => `<li>${match[0]} vs ${match[1]}</li>`).join('')}</ol>
    `;
    
    const results = document.getElementById('results');
    results.innerHTML = `
        <h2>Results:</h2>
        <ul>${Object.entries(tournamentData.results).map(([player, score]) => `<li>${player}: ${score}</li>`).join('')}</ul>
    `;
}

function announceNextMatch() {
    const currentMatch = document.getElementById('currentMatch');
    if (tournamentData.currentMatch) {
        currentMatch.innerHTML = `<h2>Next Match: ${tournamentData.currentMatch[0]} vs ${tournamentData.currentMatch[1]}</h2>`;
        setupGame(tournamentData.currentMatch[0], tournamentData.currentMatch[1]);
    } else {
        currentMatch.innerHTML = '<h2>Tournament Finished!</h2>';
        announceWinner();
    }
}

function setupGame(player1, player2) {
    // Reset the game state
    resetGameState();
    
    // Set player names
    document.getElementById('player1Name').textContent = player1;
    document.getElementById('player2Name').textContent = player2;
    
    // Enable the start game button
    document.getElementById('startGameBtn').disabled = false;
}

function endMatch(winner) {
    tournamentData.results[winner]++;
    updateTournamentInfo();
    
    if (tournamentData.matches.length > 0) {
        tournamentData.currentMatch = tournamentData.matches.shift();
        announceNextMatch();
    } else {
        tournamentData.currentMatch = null;
        announceNextMatch();
    }
}

function announceWinner() {
    const winner = Object.entries(tournamentData.results).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    alert(`Tournament finished! The winner is ${winner}!`);
}

// Initialize
updateTournamentInfo();