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
    document.body.style.backgroundImage = "url('background.jpg')";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameUI").style.display = "block";

    document.getElementById("hudTitle").innerText = `${gameState.player.name}'s Journey`;
    document.getElementById("dayCounter").innerText = gameState.day;
    document.getElementById("energyCounter").innerText = gameState.player.energy;
    document.getElementById("socialCounter").innerText = gameState.player.social;
    document.getElementById("moneyCounter").innerText = gameState.player.money;

    displayMap();
}

function displayMap() {
    let mapHTML = "<h3>Explore the School</h3><div class='map-buttons'>";
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

function triggerEvent() {
    const events = [
        "You scored the winning touchdown! (+10 Social, +20 Money)",
        "You got a perfect score on the test! (+15 Grades)",
        "You helped a teammate train! (+10 Energy)",
        "You met a new friend! (+10 Social)"
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    alert(event);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startGameButton").addEventListener("click", startGame);
});