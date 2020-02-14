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
        alert("Please select a player.")
        return
    } else if (addpointReasonLabel.innerHTML == "Reason") {
        alert("Please select a reason.")
        return
    }

    let ours = addpoint.ours;
    let ourPlayer = addpoint.ourPlayer;
    let isKill = ours && ourPlayer || !ours && !ourPlayer
    let player = ours ? OUR_PLAYERS[addpoint.player] : THEIR_PLAYERS[addpoint.player]
    let reason = isKill ? KILL_REASONS[addpoint.reason] : ERROR_REASONS[addpoint.reason]

    triggerAddPointFirstClick(ours) // resetting add point input
    
    addPoint(ours, isKill, addpoint.player, addpoint.reason, player, reason)
}

// ourPlayer = if it is was us or not
// isKill - if it was a kill or not

const points = []
// {
//     ours,
//     kill/error,
//     playerIndex,
//     reasonIndex
// }
const pointTable = document.getElementsByTagName("tbody")[0]

function addPoint(ours, isKill, playerIndex, reasonIndex, playerStr, reasonStr) {
    points.push({
        ours,
        isKill,
        playerIndex,
        reasonIndex
    })

    let drag = htmlToElement(`<td class="pointsGrid-drag material-icons c">drag_indicator</td>`)
    let point = htmlToElement(`<td class="pointsGrid-point c"></td>`)
    let error = htmlToElement(`<td class="pointsGrid-error c"></td>`)
    let player = htmlToElement(`<td class="pointsGrid-player c">John Pencil (12)</td>`)
    let reason = htmlToElement(`<td class="pointsGrid-reason c">errorreason1</td>`)
    let trash = htmlToElement(`<td class="pointsGrid-trash material-icons c">delete_outline</td>`)

    if (ours) point.classList.add("pointsGrid-point-ours")
    else point.classList.add("pointsGrid-point-theirs")

    error.innerHTML =   (ours && isKill) ? "Our kill" :
                        (ours && !isKill) ? "Their error" :
                        (!ours && isKill) ? "Their kill" :
                        "Their error";

    player.innerHTML = playerStr;
    reason.innerHTML = reasonStr;

    let row = htmlToElement(`<tr class="pointsGrid-row" draggable="true" ondragstart="handledragstart(event)" id="${new Date().getTime()}" ondragend="handledragend(event)"></tr>`)

    row.appendChild(drag)
    row.appendChild(point)
    row.appendChild(error)
    row.appendChild(player)
    row.appendChild(reason)
    row.appendChild(trash)

    pointTable.prepend(row)

    let newListener = htmlToElement(`<tr ondrop="handledrop(event)" ondragover="handledragover(event)" ondragleave="handledragleave(event)" class="draglistener"><td colspan="6"></td></tr>`)

    pointTable.prepend(newListener)

    updateTrashListeners()
}

function updateTrashListeners() {
    let trashes = document.getElementsByClassName("pointsGrid-trash");
    let pointsRows = document.getElementsByClassName("pointsGrid-row");
    let dragListeners = document.getElementsByClassName("draglistener")

    for(let i=0;i<trashes.length;i++) {
        // trashes[i].removeEventListener("click", )
        console.log(trashes[i].)
        // monday tuesday
        trashes[i].addEventListener("click", function() {
            pointTable.removeChild(dragListeners[i])
            pointTable.removeChild(pointsRows[i+1])
        })
    }
}
updateTrashListeners()

let draggedElement = undefined;

function handledragstart(e) {
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.setData("text/plain", e.target.id)
    e.target.classList.add("translucent");

    draggedElement = e.target
}

function handledragend(e) {
    e.target.classList.remove("translucent")
    let dragTargets = document.getElementsByClassName("draglistener")
    for (let i=0;i<dragTargets.length;i++) {
        dragTargets[i].classList.remove("dragselected")
    }
    document.body.style.cursor = "default";
}

function handledragover(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    if (validDragListener(e.target.parentNode)) e.target.classList.add("dragselected")
}

function handledragleave(e) {
    e.target.classList.remove("dragselected")
}

function handledrop(e) {
    e.preventDefault()

    if (validDragListener(e.target.parentNode)) {
        let newListener = htmlToElement(`<tr ondrop="handledrop(event)" ondragover="handledragover(event)" ondragleave="handledragleave(event)" class="draglistener"><td colspan="6"></td></tr>`)

        let rows = document.getElementsByClassName("pointsGrid-row")
        let listeners = document.getElementsByClassName("draglistener")
        let index
        for(let i=0;i<rows.length;i++) {
            if (rows[i] == draggedElement) index = i
        }
        pointTable.removeChild(listeners[index+1])

        pointTable.insertBefore(newListener, e.target.parentNode)
        pointTable.insertBefore(draggedElement, e.target.parentNode)
        e.target.classList.remove("dragselected")
    }
}

function validDragListener(listener) {
    return draggedElement.nextSibling != listener && draggedElement.previousSibling!=listener
    && draggedElement.nextSibling.nextSibling != listener && draggedElement.previousSibling.previousSibling != listener
}

function trimExtraListenerIfPresent() {
    // trims a "first listener" if it is present
    let rows = pointTable.childNodes
    for(let i=0;i<rows.length;i++) {
        if (rows[i].nodeType != 3 && rows[i].classList.contains("draglistener")) {
            pointTable.removeChild(rows[i])
        } else if (rows[i].nodeType !=3) break;
    }
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

// handle the delete event being added multiple times TT