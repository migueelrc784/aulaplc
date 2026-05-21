/* =========================================================
TOGGLE INPUT
========================================================= */

function toggleInput(address){

    plcMemory.inputs[address]=
    !plcMemory.inputs[address]

    const card=
    document.getElementById(
        "card-"+address
    )

    if(card){

        card.classList.toggle(
            "io-forced",
            plcMemory.inputs[address]
        )

    }

    log(
        address+
        " = "+
        plcMemory.inputs[address]
    )

    scanPLC()

}

/* =========================================================
AUTO SCAN
========================================================= */

setInterval(()=>{

    scanPLC()

},100)

/* =========================================================
RUN
========================================================= */

function runSimulation(){

    scanPLC()

    log("PLC SCAN OK")

}

/* =========================================================
UPDATE OUTPUTS
========================================================= */

function updateOutputs(){

    document
    .querySelectorAll("[data-output]")
    .forEach(output=>{

        const address=
        output.dataset.output

        const value=
        plcMemory.outputs[address]

        output.innerText=
        value ? "TRUE":"FALSE"

        output.classList.toggle(
            "on",
            value
        )

    })

    updateMotor()
    updatePilots()

}

/* =========================================================
MOTOR
========================================================= */

function updateMotor(){

    const motor=
    plcMemory.outputs["Q0.0"]

    const fan=
    document.getElementById("fan")

    const rpm=
    document.getElementById("rpmValue")

    const state=
    document.getElementById("motorState")

    if(!fan)return

    if(motor){

        fan.style.animation=
        "spinMotor .5s linear infinite"

        rpm.innerText=
        "1750 RPM"

        state.innerText=
        "ENCENDIDO"

    }else{

        fan.style.animation=
        "none"

        rpm.innerText=
        "0 RPM"

        state.innerText=
        "DETENIDO"

    }

}

/* =========================================================
PILOTS
========================================================= */

function updatePilots(){

    document
    .getElementById("greenPilot")
    ?.classList.toggle(
        "active-green",
        plcMemory.outputs["Q0.1"]
    )

    document
    .getElementById("redPilot")
    ?.classList.toggle(
        "active-red",
        plcMemory.outputs["Q0.2"]
    )

    document
    .getElementById("bluePilot")
    ?.classList.toggle(
        "active-yellow",
        plcMemory.outputs["Q0.3"]
    )

}

/* =========================================================
DELETE BUTTONS
========================================================= */

function initDeleteButtons(){

    document
    .querySelectorAll(".delete-element")
    .forEach(btn=>{

        btn.onclick=(e)=>{

            e.stopPropagation()

            btn.parentElement.remove()

            scanPLC()

        }

    })

}

/* =========================================================
ADD CONTACT
========================================================= */

function createContact(type){

    const address=
    prompt(
        "Direccion",
        "I0.0"
    )

    if(!address)return

    return `

    <div
    class="contact"
    data-type="${type}"
    data-address="${address}">

    ${type==="NC" ? "/" : ""}
    ${address}

    <div class="delete-element">
    ✕
    </div>

    </div>

    <div class="line"></div>

    `

}

/* =========================================================
ADD NO
========================================================= */

function addNO(){

    insertIntoRung(
        createContact("NO")
    )

}

/* =========================================================
ADD NC
========================================================= */

function addNC(){

    insertIntoRung(
        createContact("NC")
    )

}

/* =========================================================
ADD COIL
========================================================= */

function addCoil(){

    const address=
    prompt(
        "Direccion OUTPUT",
        "Q0.0"
    )

    if(!address)return

    insertIntoRung(`

    <div
    class="coil"
    data-address="${address}">

    (${address})

    <div class="delete-element">
    ✕
    </div>

    </div>

    <div class="line"></div>

    `)

}

/* =========================================================
ADD TON
========================================================= */

function addTON(){

    const address=
    prompt(
        "Timer",
        "T0.0"
    )

    if(!address)return

    insertIntoRung(`

    <div
    class="timer"
    data-address="${address}"
    data-preset="3000">

    TON ${address}

    <div class="delete-element">
    ✕
    </div>

    </div>

    <div class="line"></div>

    `)

}

/* =========================================================
INSERT
========================================================= */

function insertIntoRung(html){

    const rung=
    document.querySelector(".rung")

    rung.insertAdjacentHTML(
        "beforeend",
        html
    )

    refreshLadder()

}

/* =========================================================
ADD RUNG
========================================================= */

function addRung(){

    const ladder=
    document.getElementById("ladder")

    ladder.insertAdjacentHTML(
        "beforeend",

        `

        <div class="rung">

        <div class="rail"></div>

        <div class="line"></div>

        <div class="rail"></div>

        </div>

        `
    )

}

/* =========================================================
REFRESH
========================================================= */

function refreshLadder(){

    initDeleteButtons()

    scanPLC()

}

/* =========================================================
INIT
========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    ()=>{
        refreshLadder()
    }
)