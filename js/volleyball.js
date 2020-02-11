function id(elID) { return document.getElementById(elID) }
function cl(elCL) { return document.getElementsByClassName(elCL) }

const OUR_PLAYERS = [
    "John Doe (11)",
    "John Pencil (12)",
    "Jess Eraser (10)"
];

const THEIR_PLAYERS = [
    "Doe John (11)",
    "Pencil John (12)",
    "Eraser Jess (10)"
]

const KILL_REASONS = [
    "killreason1",
    "killreason2",
    "killreason3"
];

const ERROR_REASONS = [
    "errorreason1",
    "errorreason2",
    "errorreason3"
];

var home = false;
var opponent = ""
var date = ""

let homegameInp = id("homegameInp")
let opponentInp = id("opponentInp")
let dateInp = id("dateInp");

homegameInp.addEventListener("input", () => {
    home = !home
});
opponentInp.addEventListener("input", () => {
    opponent = opponentInp.value
});
dateInp.addEventListener("input", () => {
    date = dateInp.value
});

// addpoint data
let addpointFirstButtonClicked = false;
let addpointSecondButtonClicked = false;
let addpoint = {
    ours: true,         // we got the point or not
    ourPlayer: true,    // either our kill or our error
    player: 0,         // index in array
    reason: 0          // index in array
};

let addpointOurs = id("addpoint-ours")
let addpointTheirs = id("addpoint-theirs")

let addpointError1 = id("addpoint-error1")
let addpointError2 = id("addpoint-error2")
let addpointError1Parent = id("addpoint-error1-parent")
let addpointError2Parent = id("addpoint-error2-parent")

let addpointPlayerParent = id("addpoint-player-parent")
let addpointReasonParent = id("addpoint-reason-parent")
let addpointSubmitParent = id("addpoint-submit-parent")

let addpointPlayerLabel = id("dropdownParent-player")
let addpointReasonLabel = id("dropdownParent-reason")

let addpointPlayerDropdown = id("addpoint-player-dropdown");
let addpointReasonDropdown = id("addpoint-reason-dropdown");

function triggerAddPointFirstClick(isOurs) {
    if (!addpointFirstButtonClicked) {
        addpoint.ours = isOurs

        addpointFirstButtonClicked = true;
    } else {
        if (addpoint.ours == isOurs) {
            addpointFirstButtonClicked = false
        }
    }

    if (addpointFirstButtonClicked) {
        if (addpoint.ours) {
            addpointOurs.classList.add("selectedButton")
            addpointOurs.disabled = false
            addpointTheirs.classList.remove("selectedButton")
            addpointTheirs.disabled = true;

            addpointError1.value = "OUR KILL"
            addpointError2.value = "THEIR ERROR"
        } else {
            addpointOurs.classList.remove("selectedButton")
            addpointOurs.disabled = true
            addpointTheirs.classList.add("selectedButton")
            addpointTheirs.disabled = false

            addpointError1.value = "OUR ERROR"
            addpointError2.value = "THEIR KILL"
        }
        addpointError1Parent.classList.remove("gone")
        addpointError2Parent.classList.remove("gone")
    } else {
        addpointError1Parent.classList.add("gone")
        addpointError2Parent.classList.add("gone")
        addpointOurs.classList.remove("selectedButton")
        addpointOurs.disabled = false
        addpointTheirs.classList.remove("selectedButton")
        addpointTheirs.disabled = false

        if (addpointSecondButtonClicked) {
            triggerAddPointSecondClick(addpoint.ourPlayer)
        }
    }
    
}

function triggerAddPointSecondClick(isOurPlayer) {
    if (!addpointSecondButtonClicked) {
        addpoint.ourPlayer = isOurPlayer
        addpointSecondButtonClicked = true
    } else {
        if (addpoint.ourPlayer == isOurPlayer) {
            addpointSecondButtonClicked = false
        }
    }

    if (addpointSecondButtonClicked) {
        if (addpoint.ourPlayer) {
            addpointError1.classList.add("selectedButton")
            addpointError1.disabled = false
            addpointError2.classList.remove("selectedButton")
            addpointError2.disabled = true
            populatePlayerDropdown(true)
            populateReasonDropdown()
        } else {
            addpointError1.classList.remove("selectedButton")
            addpointError1.disabled = true
            addpointError2.classList.add("selectedButton")
            addpointError2.disabled = false
            populatePlayerDropdown(false)
            populateReasonDropdown()
        }
        addpointPlayerParent.classList.remove("gone")
        addpointReasonParent.classList.remove("gone")
        addpointSubmitParent.classList.remove("gone")
    } else {
        addpointError1.classList.remove("selectedButton")
        addpointError1.disabled = false
        addpointError2.classList.remove("selectedButton")
        addpointError2.disabled = false

        addpointPlayerParent.classList.add("gone")
        addpointReasonParent.classList.add("gone")
        addpointSubmitParent.classList.add("gone")

        addpointPlayerLabel.innerHTML = "Player"
        addpointReasonLabel.innerHTML = "Reason"
    }
}

function populatePlayerDropdown() {
    let dp = addpointPlayerDropdown
    for (let i = dp.childNodes.length - 1; i >= 0; i--) {
        let child = dp.childNodes[i]
        if (child.classList && child.classList.contains("player-opts")) dp.removeChild(child)
    }

    if (addpoint.ourPlayer) {
        for (let i = 0; i < OUR_PLAYERS.length; i++) {
            let child = document.createElement("div")
            child.classList.add("dropdownChild")
            child.classList.add("player-opts")
            child.innerHTML = OUR_PLAYERS[i]
            dp.appendChild(child)
        }
    } else {
        for (let i = 0; i < THEIR_PLAYERS.length; i++) {
            let child = document.createElement("div")
            child.classList.add("dropdownChild")
            child.classList.add("player-opts")
            child.innerHTML = THEIR_PLAYERS[i]
            dp.appendChild(child)
        }
    }
    addPlayerOptsListeners()
}

function populateReasonDropdown() {
    let dp = addpointReasonDropdown
    for(let i=dp.childNodes.length-1;i>=0;i--) {
        let child = dp.childNodes[i]
        if (child.classList && child.classList.contains("reason-opts")) dp.removeChild(child)
    }

    // the reasons are based on if it is a kill or an error
    if (addpoint.ours && addpoint.ourPlayer ||
        !addpoint.ours && !addpoint.ourPlayer) { // is kill
        for (let i = 0; i < KILL_REASONS.length; i++) {
            let child = document.createElement("div")
            child.classList.add("dropdownChild")
            child.classList.add("reason-opts")
            child.innerHTML = KILL_REASONS[i]
            dp.appendChild(child)
        }
    } else { // is error
        for(let i=0;i<ERROR_REASONS.length;i++) {
            let child = document.createElement("div")
            child.classList.add("dropdownChild")
            child.classList.add("reason-opts")
            child.innerHTML = ERROR_REASONS[i]
            dp.appendChild(child)
        }
    }
    addReasonOptsListeners()
}

function addPlayerOptsListeners() {
    let playerOpts = cl("player-opts");
    for (let i = 0; i < playerOpts.length; i++) {
        playerOpts[i].addEventListener("click", () => {
            addpointPlayerLabel.innerHTML = playerOpts[i].innerHTML
            addpoint.player = i
        })
    }
}
addPlayerOptsListeners()

function addReasonOptsListeners() {
    let reasonOpts = cl("reason-opts");
    for (let i = 0; i < reasonOpts.length; i++) {
        reasonOpts[i].addEventListener("click", () => {
            addpointReasonLabel.innerHTML = reasonOpts[i].innerHTML
        })
    }
}
addReasonOptsListeners()

function triggerAddPointSubmit() {
    if (addpointPlayerLabel.innerHTML == "Player") {
        alert("Please select a player.")    // todo: make this a real error indicator
        return
    } else if (addpointReasonLabel.innerHTML == "Reason") {
        alert("Please select a reason.")    // todo: make this a real error indicator
        return
    }

    let ours = addpoint.ours;
    let ourPlayer = addpoint.ourPlayer;
    let isKill = ours && ourPlayer || !ours && !ourPlayer
    let player = ours ? OUR_PLAYERS[addpoint.player] : THEIR_PLAYERS[addpoint.player]
    let reason = isKill ? KILL_REASONS[addpoint.reason] : ERROR_REASONS[addpoint.reason]
    
    console.log(`Submitting add point:
        ${ours ? "Our point" : "Opponent's point" }
        Player: ${player}
        ${isKill ? "Kill point" : "Error point"}
        Reason: ${reason}`)
}