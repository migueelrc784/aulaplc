/* =========================================================
   AUTOMATION STUDIO X - VFD.JS REALISTIC SIMULATOR
========================================================= */

const vfd = {

    /* ESTADOS */

    running: false,
    reverse: false,
    mode: "LOCAL",

    /* VELOCIDAD */

    freq: 0,
    targetFreq: 0,
    maxFreq: 60,

    /* MOTOR */

    rpm: 0,
    amps: 0,
    volts: 380,
    powerKW: 0,
    torque: 0,

    /* PARÁMETROS */

    accelTime: 5,
    decelTime: 4,

    motorRatedCurrent: 12,
    motorRatedRPM: 1750,

    carrierFreq: 4,
    minFreq: 0,

    /* TEMPERATURA */

    temperature: 28,

    /* ALARMAS */

    alarm: false,
    alarmText: "NINGUNA",

    /* LOOP */

    interval: null

}

/* =========================================================
   INIT
========================================================= */

window.addEventListener("DOMContentLoaded", () => {

    initializeVFD()

})

function initializeVFD() {

    console.log("VFD REAL SIMULATOR OK")

    const slider =
        document.getElementById("freqSlider")

    if (slider) {

        slider.min = 0
        slider.max = 120
        slider.step = 1
        slider.value = 0

        slider.addEventListener("input", (e) => {

            updateVFD(e.target.value)

        })

    }

    loadParameters()

    updateVFDUI()

    startVFDSimulation()

}

/* =========================================================
   MAIN LOOP
========================================================= */

function startVFDSimulation() {

    if (vfd.interval) {

        clearInterval(vfd.interval)

    }

    vfd.interval = setInterval(() => {

        simulateVFD()

    }, 100)

}

/* =========================================================
   SIMULATION ENGINE
========================================================= */

function simulateVFD() {

    /* =========================================
       ACELERACIÓN
    ========================================= */

    if (vfd.running && !vfd.alarm) {

        let accelStep =
            Math.max(
                0.03,
                vfd.maxFreq /
                (vfd.accelTime * 10)
            )

        if (vfd.freq < vfd.targetFreq) {

            vfd.freq += accelStep

            if (vfd.freq > vfd.targetFreq) {

                vfd.freq = vfd.targetFreq

            }

        }

        if (vfd.freq > vfd.targetFreq) {

            vfd.freq -= accelStep

            if (vfd.freq < vfd.targetFreq) {

                vfd.freq = vfd.targetFreq

            }

        }

    }

    /* =========================================
       DECELERACIÓN
    ========================================= */

    if (!vfd.running) {

        let decelStep =
            Math.max(
                0.05,
                vfd.maxFreq /
                (vfd.decelTime * 10)
            )

        if (vfd.freq > 0) {

            vfd.freq -= decelStep

        }

        if (vfd.freq < 0) {

            vfd.freq = 0

        }

    }

    /* =========================================
       CÁLCULOS REALES
    ========================================= */

    /* RPM */

    vfd.rpm =
        Math.floor(
            (vfd.freq / 60) *
            vfd.motorRatedRPM
        )

    /* VOLTAJE */

    vfd.volts =
        Math.floor(
            220 + (vfd.freq * 2.6)
        )

    /* CORRIENTE */

    if (vfd.running) {

        vfd.amps =
            (
                (vfd.freq / 60) *
                vfd.motorRatedCurrent
            ) + 0.8

    } else {

        vfd.amps = 0

    }

    /* POTENCIA */

    vfd.powerKW =
        (
            (vfd.volts *
            vfd.amps *
            1.73 *
            0.82) / 1000
        )

    /* TORQUE */

    if (vfd.freq > 0) {

        vfd.torque =
            (
                (vfd.powerKW * 9550) /
                Math.max(vfd.rpm,1)
            )

    } else {

        vfd.torque = 0

    }

    /* =========================================
       TEMPERATURA
    ========================================= */

    if (vfd.running) {

        vfd.temperature +=
            0.02 +
            (vfd.freq / 5000)

    } else {

        vfd.temperature -= 0.04

    }

    if (vfd.temperature < 28) {

        vfd.temperature = 28

    }

    /* =========================================
       ALARMAS
    ========================================= */

    checkVFDAlarms()

    /* =========================================
       UI
    ========================================= */

    updateVFDUI()

}

/* =========================================================
   UPDATE UI
========================================================= */

function updateVFDUI() {

    /* DISPLAY */

    setText(
        "freqDisplay",
        vfd.freq.toFixed(2) + " Hz"
    )

    setText(
        "vfdFreqBig",
        vfd.freq.toFixed(2) + " Hz"
    )

    setText(
        "vfdRpmBig",
        vfd.rpm + " RPM"
    )

    setText(
        "vfdAmp",
        vfd.amps.toFixed(1) + " A"
    )

    /* TABLA */

    setText(
        "tableFreq",
        vfd.freq.toFixed(1) + " Hz"
    )

    setText(
        "tableTemp",
        vfd.temperature.toFixed(1) + " °C"
    )

    setText(
        "tableVolt",
        vfd.volts + " V"
    )

    setText(
        "tableAmp",
        vfd.amps.toFixed(1) + " A"
    )

    setText(
        "vfdDirection",
        vfd.reverse ? "REV" : "FWD"
    )

    setText(
        "modeText",
        vfd.mode
    )

    setText(
        "alarmText",
        vfd.alarmText
    )

    /* NUEVOS DATOS */

    setText(
        "tablePower",
        vfd.powerKW.toFixed(2) + " kW"
    )

    setText(
        "tableTorque",
        vfd.torque.toFixed(1) + " Nm"
    )

    /* STATUS */

    const status =
        document.getElementById("vfdStatus")

    if (status) {

        if (vfd.alarm) {

            status.innerHTML = "FAULT"
            status.style.color = "#ff3355"

        }

        else if (vfd.running) {

            status.innerHTML = "RUNNING"
            status.style.color = "#00ff99"

        }

        else {

            status.innerHTML = "STOP"
            status.style.color = "#ffffff"

        }

    }

    /* SINCRONIZA SLIDER */

    const slider =
        document.getElementById("freqSlider")

    if (slider) {

        if (
            document.activeElement !== slider
        ) {

            slider.value =
                vfd.targetFreq

        }

    }

}

/* =========================================================
   COMMANDS
========================================================= */

function startVFD() {

    if (vfd.alarm) {

        console.log("ALARM ACTIVE")
        return

    }

    vfd.running = true

    console.log("VFD RUN")

}

function stopVFD() {

    vfd.running = false

    console.log("VFD STOP")

}

function reverseVFD() {

    vfd.reverse = !vfd.reverse

    console.log("REVERSE:", vfd.reverse)

}

function resetVFDAlarm() {

    vfd.alarm = false

    vfd.alarmText = "NINGUNA"

    console.log("RESET OK")

}

/* =========================================================
   FREQUENCY
========================================================= */

function updateVFD(freq) {

    vfd.targetFreq =
        parseFloat(freq)

    if (isNaN(vfd.targetFreq)) {

        vfd.targetFreq = 0

    }

    /* LIMITES */

    if (vfd.targetFreq > vfd.maxFreq) {

        vfd.targetFreq =
            vfd.maxFreq

    }

    if (vfd.targetFreq < vfd.minFreq) {

        vfd.targetFreq =
            vfd.minFreq

    }

    setText(
        "freqDisplay",
        vfd.targetFreq.toFixed(2) + " Hz"
    )

}

/* =========================================================
   BUTTONS
========================================================= */

function vfdFreqUp() {

    const slider =
        document.getElementById("freqSlider")

    if (!slider) return

    slider.value =
        Math.min(
            vfd.maxFreq,
            parseInt(slider.value) + 5
        )

    updateVFD(slider.value)

}

function vfdFreqDown() {

    const slider =
        document.getElementById("freqSlider")

    if (!slider) return

    slider.value =
        Math.max(
            0,
            parseInt(slider.value) - 5
        )

    updateVFD(slider.value)

}

/* =========================================================
   PARAMETERS
========================================================= */

function applyVFDParameters() {

    vfd.accelTime =
        parseFloat(
            getInputValue("paramAccel", 5)
        )

    vfd.decelTime =
        parseFloat(
            getInputValue("paramDecel", 4)
        )

    vfd.maxFreq =
        parseFloat(
            getInputValue("paramMaxFreq", 60)
        )

    vfd.minFreq =
        parseFloat(
            getInputValue("paramMinFreq", 0)
        )

    vfd.motorRatedCurrent =
        parseFloat(
            getInputValue("paramCurrent", 12)
        )

    vfd.motorRatedRPM =
        parseFloat(
            getInputValue("paramRPM", 1750)
        )

    vfd.carrierFreq =
        parseFloat(
            getInputValue("paramCarrier", 4)
        )

    console.log("PARAMETERS UPDATED")

}

function loadParameters() {

    applyVFDParameters()

}

function setLocalMode() {

    vfd.mode = "LOCAL"

}

function setRemoteMode() {

    vfd.mode = "REMOTE"

}

/* =========================================================
   ALARMS
========================================================= */

function checkVFDAlarms() {

    /* SOBRE TEMPERATURA */

    if (vfd.temperature >= 85) {

        vfd.alarm = true
        vfd.running = false

        vfd.alarmText =
            "OVER TEMP"

    }

    /* SOBRE CORRIENTE */

    if (vfd.amps >=
        vfd.motorRatedCurrent * 1.5) {

        vfd.alarm = true
        vfd.running = false

        vfd.alarmText =
            "OVER CURRENT"

    }

    /* SOBRE VOLTAJE */

    if (vfd.volts >= 500) {

        vfd.alarm = true
        vfd.running = false

        vfd.alarmText =
            "OVER VOLT"

    }

}

/* =========================================================
   HELPERS
========================================================= */

function setText(id, value) {

    const el =
        document.getElementById(id)

    if (el) {

        el.innerHTML = value

    }

}

function getInputValue(id, fallback) {

    const el =
        document.getElementById(id)

    if (!el) return fallback

    return el.value

}