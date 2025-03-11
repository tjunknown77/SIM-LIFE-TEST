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
    document.getElementById("gameArea").innerHTML = `
        <h2>Welcome, ${gameState.player.name}!</h2>
        <p>Your adventure begins...</p>
        <div id='map'></div>
        <div id='activities'></div>`;
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
        console.log(`Moved to: ${location} - ${locations[location]}`);
    }
}

function uploadPlayerImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            gameState.player.image = reader.result;
            document.getElementById("playerImage").src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("imageUpload").addEventListener("change", uploadPlayerImage);
    document.getElementById("startGameButton").addEventListener("click", startGame);
});