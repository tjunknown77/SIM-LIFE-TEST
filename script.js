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

const activities = {
    "School": ["Attend Class (+5 Grades)", "Talk to Students (+5 Social)"],
    "Gym": ["Lift Weights (+5 Energy)", "Join a Sport (+10 Social, -5 Energy)"],
    "Library": ["Study (+10 Grades)", "Read a Book (+5 Knowledge)", "Meet a Study Buddy (+10 Social)"],
    "Cafeteria": ["Eat Lunch (+10 Energy)", "Hangout with Friends (+5 Social)"],
    "Club Room": ["Join a Club (+10 Social, +5 Skills)", "Attend a Club Meeting (+5 Social, +5 Knowledge)"],
    "Sports Field": ["Play a Match (+10 Energy, -5 Social)", "Practice Running (+10 Stamina)"],
    "Cafe": ["Work a Shift (+20 Money, -10 Energy)", "Chat with Customers (+5 Social)"]
};

function createNPC(name) {
    const personalities = ["Smart", "Funny", "Athletic", "Shy", "Outgoing", "Rebel"];
    return {
        name: name,
        gender: Math.random() > 0.5 ? "Male" : "Female",
        energy: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        grades: Math.floor(Math.random() * 100),
        money: Math.floor(Math.random() * 200),
        personality: personalities[Math.floor(Math.random() * personalities.length)],
        relationship: null,
        location: Object.keys(locations)[Math.floor(Math.random() * Object.keys(locations).length)],
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
        "A teacher caught you daydreaming in class! (-5 grades)",
        "You helped an NPC with their homework! (+10 friendship)",
        "An NPC challenged you to a basketball match! (+10 sports skill)"
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    console.log("Event: ", event);
}

function nextDay() {
    gameState.day++;
    randomEvent();
    displayGameState();
}

function moveToLocation(location) {
    if (locations[location]) {
        gameState.player.location = location;
        console.log(`Moved to: ${location} - ${locations[location]}`);
        displayActivities(location);
    }
}

function displayActivities(location) {
    let activityHTML = `<h3>Activities in ${location}</h3>`;
    if (activities[location]) {
        activities[location].forEach(activity => {
            activityHTML += `<button onclick="performActivity('${activity}')">${activity}</button> `;
        });
    } else {
        activityHTML += "No activities available here.";
    }
    document.getElementById("activities").innerHTML = activityHTML;
}

function performActivity(activity) {
    console.log(`Performed activity: ${activity}`);
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

function startGame() {
    gameState.player.name = document.getElementById("playerName").value || "You";
    gameState.player.gender = document.getElementById("playerGender").value;
    document.getElementById("gameArea").innerHTML = `<h2>Welcome, ${gameState.player.name}!</h2><p>Your adventure begins...</p><div id='map'></div><div id='activities'></div>`;
    displayMap();
    displayActivities("School");
    displayGameState();
}

function displayMap() {
    let mapHTML = "<h3>Explore the School</h3>";
    for (const location in locations) {
        mapHTML += `<button onclick="moveToLocation('${location}')">${location}</button> `;
    }
    document.getElementById("map").innerHTML = mapHTML;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("imageUpload").addEventListener("change", uploadPlayerImage);
    document.getElementById("startGameButton").addEventListener("click", startGame);
});

// Initialize the game
initializeNPCs();
displayGameState();