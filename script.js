const gameState = {
    player: {
        name: "You",
        gender: "",
        energy: 100,
        social: 50,
        grades: 75,
        money: 100,
        relationship: null,
        image: "",
        location: "School"
    },
    npcs: [],
    day: 1,
};

function startGame() {
    gameState.player.name = document.getElementById("playerName").value || "You";
    gameState.player.gender = document.getElementById("playerGender").value;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameUI").style.display = "block";

    document.getElementById("hudTitle").innerText = `${gameState.player.name}'s Journey`;
    document.getElementById("dayCounter").innerText = gameState.day;
    document.getElementById("energyCounter").innerText = gameState.player.energy;
    document.getElementById("socialCounter").innerText = gameState.player.social;
    document.getElementById("moneyCounter").innerText = gameState.player.money;
}

function openUI(section) {
    let content = "";
    if (section === "createSim") {
        content = "<h3>Create or Edit Sim</h3><p>Customize your character here.</p>";
    } else if (section === "relationships") {
        content = "<h3>Relationships</h3><p>View friendships and romantic interests.</p>";
    } else if (section === "stats") {
        content = `<h3>Player Stats</h3>
        <p>Energy: ${gameState.player.energy}</p>
        <p>Social: ${gameState.player.social}</p>
        <p>Money: $${gameState.player.money}</p>`;
    }
    document.getElementById("uiContent").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startGameButton").addEventListener("click", startGame);
});