const gameState = {
    player: {
        name: "You",
        gender: "",
        energy: 100,
        social: 50,
        grades: 75,
        money: 100,
        relationship: null,
        image: ""
    },
    npcs: [],
    day: 1,
};

function createNPC(name) {
    const personalities = ["Smart", "Funny", "Athletic", "Shy", "Outgoing"];
    return {
        name: name,
        gender: Math.random() > 0.5 ? "Male" : "Female",
        energy: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        grades: Math.floor(Math.random() * 100),
        money: Math.floor(Math.random() * 200),
        personality: personalities[Math.floor(Math.random() * personalities.length)],
        relationship: null,
        image: "https://via.placeholder.com/100"
    };
}

function initializeNPCs() {
    gameState.npcs.push(createNPC("Alex"));
    gameState.npcs.push(createNPC("Jamie"));
    gameState.npcs.push(createNPC("Taylor"));
    gameState.npcs.push(createNPC("Jordan"));
    gameState.npcs.push(createNPC("Morgan"));
}

function displayGameState() {
    console.log("Day: " + gameState.day);
    console.log("Player:", gameState.player);
    console.log("NPCs:", gameState.npcs);
}

function randomEvent() {
    const events = [
        "You found money on the ground! (+$20)",
        "A surprise pop quiz happens! (+5 grades)",
        "You were invited to a party! (+10 social)",
        "A random fight broke out in the cafeteria!", 
        "Two NPCs just started dating!", 
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    console.log("Event: ", event);
}

function nextDay() {
    gameState.day++;
    randomEvent();
    displayGameState();
}

function uploadPlayerImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            gameState.player.image = reader.result;
            document.getElementById("playerImage").src = reader.result;
            console.log("Player image updated:", reader.result);
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("imageUpload").addEventListener("change", uploadPlayerImage);
});

// Initialize the game
initializeNPCs();
displayGameState();