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

const locations = {
    "School": "Attend classes, study, and interact with students.",
    "Gym": "Work out to increase energy and athleticism.",
    "Library": "Read books to improve grades.",
    "Cafeteria": "Eat food to regain energy and interact with NPCs.",
    "Dorm": "Rest and recover energy for the next day.",
    "Club Room": "Join clubs like Music, Drama, or Science.",
    "Sports Field": "Play football, basketball, or track events.",
    "Cafe": "Take a part-time job to earn money."
};

function startGame() {
    gameState.player.name = document.getElementById("playerName").value || "You";
    gameState.player.gender = document.getElementById("playerGender").value;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameUI").style.display = "block";
    document.body.style.backgroundImage = "url('map.png')";

    document.getElementById("hudTitle").innerText = `${gameState.player.name}'s Journey`;
    document.getElementById("dayCounter").innerText = gameState.day;
    document.getElementById("energyCounter").innerText = gameState.player.energy;
    document.getElementById("socialCounter").innerText = gameState.player.social;
    document.getElementById("moneyCounter").innerText = gameState.player.money;

    displayMap();
}

function displayMap() {
    let mapHTML = "<h3>Click on a Location</h3><div class='map-container'>";
    for (const location in locations) {
        mapHTML += `<button class='map-btn' onclick="moveToLocation('${location}')">${location}</button>`;
    }
    mapHTML += "</div>";
    document.getElementById("map").innerHTML = mapHTML;
}

function moveToLocation(location) {
    if (locations[location]) {
        gameState.player.location = location;
        document.getElementById("activities").innerHTML = `<h3>Activities in ${location}</h3>
        <button onclick='triggerEvent()'>Do Something</button>`;
    }
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