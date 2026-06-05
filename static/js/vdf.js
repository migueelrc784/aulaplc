/* =========================================================
   AUTOMATION STUDIO X - VFD.JS FIXED
========================================================= */

const vfd = {
    running: false,
    reverse: false,
    mode: "LOCAL",
    freq: 0,
    targetFreq: 0,
    maxFreq: 60,
    minFreq: 0,
    rpm: 0,
    amps: 0,
    volts: 380,
    powerKW: 0,
    torque: 0,
    accelTime: 5,
    decelTime: 4,
    motorRatedCurrent: 12,
    motorRatedRPM: 1750,
    carrierFreq: 4,
    temperature: 28,
    alarm: false,
    alarmText: "NINGUNA",
    interval: null
}

/* =========================================================
   INIT — espera que el DOM esté listo
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeVFD()
})

function initializeVFD() {

    /* SLIDER */
    const slider = document.getElementById("freqSlider")
    if (slider) {
        slider.min = 0
        slider.max = 120
        slider.step = 1
        slider.value = 0
        slider.addEventListener("input", (e) => {
            updateVFD(e.target.value)
        })
    }

    /* INPUT NUMÉRICO */
    const freqInput = document.getElementById("freqInput")
    if (freqInput) {
        freqInput.addEventListener("change", (e) => {
            updateVFD(e.target.value)
        })
    }

    updateVFDUI()
    startVFDLoop()
    updateNeedles()

    console.log("VFD INITIALIZED")
}

/* =========================================================
   LOOP PRINCIPAL
========================================================= */

function startVFDLoop() {
    if (vfd.interval) clearInterval(vfd.interval)
    vfd.interval = setInterval(simulateVFD, 100)
}

/* =========================================================
   MOTOR DE SIMULACIÓN
========================================================= */

function simulateVFD() {

    if (vfd.running && !vfd.alarm) {

        /* ACELERACIÓN */
        const accelStep = Math.max(0.05, vfd.maxFreq / (vfd.accelTime * 10))

        if (vfd.freq < vfd.targetFreq) {
            vfd.freq = Math.min(vfd.freq + accelStep, vfd.targetFreq)
        } else if (vfd.freq > vfd.targetFreq) {
            vfd.freq = Math.max(vfd.freq - accelStep, vfd.targetFreq)
        }

    } else {

        /* DECELERACIÓN */
        const decelStep = Math.max(0.05, vfd.maxFreq / (vfd.decelTime * 10))

        if (vfd.freq > 0) {
            vfd.freq = Math.max(vfd.freq - decelStep, 0)
        }
    }

    /* CÁLCULOS */
    const ratio = vfd.freq / 60

    vfd.rpm   = Math.floor(ratio * vfd.motorRatedRPM)
    vfd.volts = Math.floor(220 + (vfd.freq * 2.6))
    vfd.amps  = vfd.running ? (ratio * vfd.motorRatedCurrent) + 0.8 : 0
    vfd.powerKW = (vfd.volts * vfd.amps * 1.73 * 0.82) / 1000
    vfd.torque  = vfd.rpm > 0 ? (vfd.powerKW * 9550) / vfd.rpm : 0

    /* TEMPERATURA */
    if (vfd.running) {
        vfd.temperature += 0.02 + (vfd.freq / 5000)
    } else {
        vfd.temperature = Math.max(28, vfd.temperature - 0.04)
    }

    checkVFDAlarms()
    updateVFDUI()
    updateNeedles()
    updateMotorAnimation()
}

/* =========================================================
   ACTUALIZAR UI
========================================================= */

function updateVFDUI() {

    /* PANTALLA DEL DRIVE */
    setText("vfdFreqBig", vfd.freq.toFixed(2) + " Hz")
    setText("vfdRpmBig",  vfd.rpm + " RPM")
    setText("vfdAmp",     vfd.amps.toFixed(1) + " A")

    /* DISPLAY PANEL */
    setText("freqDisplay", vfd.freq.toFixed(2))

    /* TABLA MONITOREO */
    setText("tableFreq",  vfd.freq.toFixed(1) + " Hz")
    setText("tableRPM",   vfd.rpm + " RPM")
    setText("tableTemp",  vfd.temperature.toFixed(1) + " °C")
    setText("tableVolt",  vfd.volts + " V")
    setText("tableAmp",   vfd.amps.toFixed(1) + " A")
    setText("tablePower", vfd.powerKW.toFixed(2) + " kW")
    setText("tableVolt",  vfd.volts + " VDC")
    setText("vfdDirection", vfd.reverse ? "REV ◀" : "FWD ▶")
    setText("modeText",   vfd.mode)
    setText("alarmText",  vfd.alarmText)

    /* STATUS */
    const status = document.getElementById("vfdStatus")
    if (status) {
        if (vfd.alarm) {
            status.textContent = "FAULT"
            status.style.color = "#ff3355"
        } else if (vfd.running) {
            status.textContent = "RUNNING"
            status.style.color = "#00ff99"
        } else {
            status.textContent = "STOP"
            status.style.color = "#ffffff"
        }
    }

    /* LEDS DEL DRIVE */
    const leds = document.querySelectorAll(".vfd-drive-real .led")
    if (leds.length >= 2) {
        leds[0].className = "led " + (vfd.running && !vfd.alarm ? "green" : "")
        leds[1].className = "led " + (vfd.alarm ? "red" : "")
    }

    /* SYNC SLIDER */
    const slider = document.getElementById("freqSlider")
    if (slider && document.activeElement !== slider) {
        slider.value = vfd.targetFreq
    }

    /* SYNC INPUT */
    const freqInput = document.getElementById("freqInput")
    if (freqInput && document.activeElement !== freqInput) {
        freqInput.value = vfd.targetFreq.toFixed(1)
    }

    /* COLOR PANTALLA DRIVE */
    const screen = document.querySelector(".drive-screen")
    if (screen) {
        if (vfd.alarm) {
            screen.style.background = "linear-gradient(180deg,#ff6655,#cc3322)"
            screen.style.color = "#fff"
        } else if (vfd.running) {
            screen.style.background = "linear-gradient(180deg,#b8d16a,#a1bf56)"
            screen.style.color = "#111"
        } else {
            screen.style.background = "linear-gradient(180deg,#9aad58,#7a9040)"
            screen.style.color = "#111"
        }
    }
}

/* =========================================================
   AGUJAS DE GAUGES
========================================================= */

function updateNeedles() {

    /* FRECUENCIA — max 120 Hz → 180° */
    rotateNeedle("needleFreq", vfd.freq, 0, 120)
    setText("freqGaugeText", vfd.freq.toFixed(1) + " Hz")

    /* RPM — max motorRatedRPM */
    rotateNeedle("needleRPM", vfd.rpm, 0, vfd.motorRatedRPM)
    setText("rpmGaugeText", vfd.rpm + " RPM")

    /* AMPERAJE */
    rotateNeedle("needleAmp", vfd.amps, 0, vfd.motorRatedCurrent * 1.5)
    setText("ampGaugeText", vfd.amps.toFixed(1) + " A")

    /* VOLTAJE */
    rotateNeedle("needleVolt", vfd.volts, 0, 600)
    setText("voltGaugeText", vfd.volts + " V")
}

function rotateNeedle(id, value, min, max) {
    const needle = document.getElementById(id)
    if (!needle) return
    const pct = Math.min(1, Math.max(0, (value - min) / (max - min)))
    const deg = -90 + (pct * 180)
    needle.style.transform = `rotate(${deg}deg)`
}

/* =========================================================
   ANIMACIÓN DEL MOTOR (sidebar)
========================================================= */

function updateMotorAnimation() {
    const fan = document.getElementById("motorFan")
    if (!fan) return

    if (vfd.running && vfd.freq > 0) {
        const speed = Math.max(0.1, 2 - (vfd.freq / 60))
        fan.style.animationDuration = speed + "s"
        fan.style.animationPlayState = "running"
    } else {
        fan.style.animationPlayState = "paused"
    }

    /* RPM display */
    const rpmEl = document.getElementById("rpmValue")
    if (rpmEl) rpmEl.textContent = vfd.rpm + " RPM"

    const stateEl = document.getElementById("motorState")
    if (stateEl) {
        stateEl.textContent = vfd.running ? "RUN" : "STOP"
        stateEl.style.color = vfd.running ? "#22c55e" : "#ef4444"
    }
}

/* =========================================================
   COMANDOS
========================================================= */

function startVFD() {
    if (vfd.alarm) {
        console.warn("ALARM ACTIVE — reset first")
        return
    }
    vfd.running = true
    console.log("VFD START")
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
    console.log("ALARM RESET")
}

function setLocalMode() {
    vfd.mode = "LOCAL"
}

function setRemoteMode() {
    vfd.mode = "REMOTE"
}

function setMaxFreq() {
    updateVFD(vfd.maxFreq)
}

/* =========================================================
   FRECUENCIA
========================================================= */

function updateVFD(freq) {
    let f = parseFloat(freq)
    if (isNaN(f)) f = 0
    f = Math.min(vfd.maxFreq, Math.max(vfd.minFreq, f))
    vfd.targetFreq = f
    setText("freqDisplay", f.toFixed(2))
}

function vfdFreqUp() {
    updateVFD(Math.min(vfd.maxFreq, vfd.targetFreq + 5))
    syncSlider()
}

function vfdFreqDown() {
    updateVFD(Math.max(vfd.minFreq, vfd.targetFreq - 5))
    syncSlider()
}

function syncSlider() {
    const slider = document.getElementById("freqSlider")
    if (slider) slider.value = vfd.targetFreq
    const input = document.getElementById("freqInput")
    if (input) input.value = vfd.targetFreq.toFixed(1)
}

/* =========================================================
   PARÁMETROS
========================================================= */

function applyVFDParameters() {
    vfd.accelTime          = getVal("paramAccel",   5)
    vfd.decelTime          = getVal("paramDecel",   4)
    vfd.maxFreq            = getVal("paramMaxFreq", 60)
    vfd.minFreq            = getVal("paramMinFreq", 0)
    vfd.motorRatedCurrent  = getVal("paramCurrent", 12)
    vfd.motorRatedRPM      = getVal("paramRPM",     1750)
    vfd.carrierFreq        = getVal("paramCarrier", 4)
    console.log("PARAMETERS APPLIED", vfd)
}

function loadParameters() {
    applyVFDParameters()
}

/* =========================================================
   ALARMAS
========================================================= */

function checkVFDAlarms() {
    if (vfd.temperature >= 85) {
        triggerAlarm("OVER TEMP")
    }
    if (vfd.amps >= vfd.motorRatedCurrent * 1.5) {
        triggerAlarm("OVER CURRENT")
    }
    if (vfd.volts >= 500) {
        triggerAlarm("OVER VOLT")
    }
}

function triggerAlarm(msg) {
    if (!vfd.alarm) {
        vfd.alarm = true
        vfd.running = false
        vfd.alarmText = msg
        console.warn("ALARM:", msg)
    }
}

/* =========================================================
   HELPERS
========================================================= */

function setText(id, value) {
    const el = document.getElementById(id)
    if (el) el.textContent = value
}

function getVal(id, fallback) {
    const el = document.getElementById(id)
    if (!el) return fallback
    const v = parseFloat(el.value)
    return isNaN(v) ? fallback : v
}