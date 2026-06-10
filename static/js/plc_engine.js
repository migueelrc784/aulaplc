/* =========================================================
   PLC ENGINE — AUTOMATION STUDIO X
========================================================= */

window.inputs = {
  "I0.0": false,
  "I0.1": false,
  "I0.2": false,
  "I0.3": false,
  "I0.4": false,
  "I0.5": false
}

window.outputs = {
  "Q0.0": false,
  "Q0.1": false,
  "Q0.2": false,
  "Q0.3": false
}

window.markers = {
  "M0.0": false,
  "M0.1": false,
  "M0.2": false,
  "M0.3": false
}

// Latches SET/RESET — no se resetean en cada scan
window.latches = {}

window.plcRunning = false
window.selectedElement = null

/* =========================================================
   READ / WRITE
========================================================= */

function readAddress(addr) {
  if (addr.startsWith("I")) return inputs[addr]  || false
  if (addr.startsWith("Q")) return outputs[addr] || false
  if (addr.startsWith("M")) return markers[addr] || false
  return false
}

function writeOutput(addr, value, type) {
  // SET: solo pone en true, nunca baja
  if (type === "SET") {
    latches[addr] = true
    if (addr.startsWith("Q")) outputs[addr] = true
    if (addr.startsWith("M")) markers[addr] = true
    return
  }
  // RESET: solo pone en false
  if (type === "RESET") {
    latches[addr] = false
    if (addr.startsWith("Q")) outputs[addr] = false
    if (addr.startsWith("M")) markers[addr] = false
    return
  }
  // Bobina normal — solo escribe si no hay latch activo
  if (latches[addr]) return
  if (addr.startsWith("Q")) outputs[addr] = value
  if (addr.startsWith("M")) markers[addr] = value
}

/* =========================================================
   TOGGLE INPUTS
========================================================= */

function toggleInput(address) {
  inputs[address] = !inputs[address]
  const card = document.getElementById(`card-${address}`)
  if (card) card.classList.toggle("io-forced", inputs[address])
  scanPLC()
}

/* =========================================================
   SIMULATION BUTTON
========================================================= */

function runSimulation() {
  plcRunning = !plcRunning

  document.querySelectorAll(".toolbar .btn").forEach(btn => {
    if (btn.innerText.includes("SIMULAR") || btn.innerText.includes("DETENER")) {
      btn.innerText = plcRunning ? "DETENER PLC" : "SIMULAR PLC"
    }
  })

  const cpu = document.getElementById("cpuState")
  const plc = document.getElementById("plcState")

  if (cpu) {
    cpu.innerText = plcRunning ? "CPU RUN" : "CPU STOP"
    cpu.className = "status-box " + (plcRunning ? "run" : "stop")
  }
  if (plc) {
    plc.innerText = plcRunning ? "PLC RUN" : "PLC STOP"
    plc.className = "status-box " + (plcRunning ? "run" : "stop")
  }

  if (!plcRunning) {
    // Al detener: limpiar todo
    Object.keys(outputs).forEach(q => outputs[q] = false)
    Object.keys(markers).forEach(m => markers[m] = false)
    Object.keys(latches).forEach(k => delete latches[k])
  }

  scanPLC()
}

/* =========================================================
   CLEAR VISUALS
========================================================= */

function clearVisuals() {
  document.querySelectorAll(".powered")
    .forEach(el => el.classList.remove("powered"))
  document.querySelectorAll(".energized")
    .forEach(el => el.classList.remove("energized"))
  document.querySelectorAll(".active-rung")
    .forEach(el => el.classList.remove("active-rung"))
}

/* =========================================================
   EVAL BRANCH (paralelo)
   Devuelve true si AL MENOS UN path del branch tiene power
========================================================= */

function evalBranch(branchEl) {
  const paths = branchEl.querySelectorAll(".branch-path")
  let branchPowered = false

  paths.forEach(path => {
    let pathPower = true
    path.querySelectorAll(".contact").forEach(contact => {
      const val  = readAddress(contact.dataset.address)
      const pass = contact.dataset.type === "NO" ? val : !val
      if (pass) contact.classList.add("powered")
      pathPower = pathPower && pass
    })
    if (pathPower) {
      branchPowered = true
      path.querySelectorAll(".contact").forEach(c => c.classList.add("powered"))
    }
  })

  if (branchPowered) branchEl.classList.add("powered")
  return branchPowered
}

/* =========================================================
   SCAN PLC
========================================================= */

function scanPLC() {
  clearVisuals()

  if (!plcRunning) {
    Object.keys(outputs).forEach(q => outputs[q] = false)
    Object.keys(markers).forEach(m => markers[m] = false)
    Object.keys(latches).forEach(k => delete latches[k])
    updateOutputs()
    updateMotor()
    return
  }

  // Reset outputs y markers normales (respeta latches)
  Object.keys(outputs).forEach(q => {
    if (!latches[q]) outputs[q] = false
  })
  Object.keys(markers).forEach(m => {
    if (!latches[m]) markers[m] = false
  })

  document.querySelectorAll(".rung").forEach(rung => {
    let power = true

    Array.from(rung.children).forEach(el => {

      // LINE
      if (el.classList.contains("line")) {
        if (power) el.classList.add("powered")
        return
      }

      // BRANCH (paralelo)
      if (el.classList.contains("branch")) {
        const result = evalBranch(el)
        power = power && result
        return
      }

      // CONTACT
      if (el.classList.contains("contact")) {
        const val    = readAddress(el.dataset.address)
        const pass   = el.dataset.type === "NO" ? val : !val
        const result = power && pass
        if (result) el.classList.add("powered")
        power = result
        return
      }

      // TIMER
      if (el.classList.contains("timer")) {
        if (power) el.classList.add("powered")
        return
      }

      // COIL
      if (el.classList.contains("coil")) {
        const addr = el.dataset.address
        const type = el.dataset.type || "normal"
        writeOutput(addr, power, type)
        const isOn = readAddress(addr)
        if (isOn) el.classList.add("energized")
        return
      }
    })

    if (power) rung.classList.add("active-rung")
  })

  updateOutputs()
  updateMotor()
}

/* =========================================================
   OUTPUTS UI
========================================================= */

function updateOutputs() {
  document.querySelectorAll("[data-output]").forEach(el => {
    const addr = el.dataset.output
    const on   = outputs[addr]
    el.innerText    = on ? "TRUE" : "FALSE"
    el.style.color  = on ? "#00ff99" : "#ff4565"
  })
}

/* =========================================================
   MOTOR + PILOTS
========================================================= */

function updateMotor() {
  const fan   = document.getElementById("motorFan")
  const rpm   = document.getElementById("rpmValue")
  const state = document.getElementById("motorState")
  const green = document.getElementById("greenPilot")
  const red   = document.getElementById("redPilot")
  const blue  = document.getElementById("bluePilot")

  const running = outputs["Q0.0"]

  if (fan) {
    fan.style.animationPlayState = running ? "running" : "paused"
    fan.style.animationDuration  = running ? "0.15s"   : "0.3s"
  }
  if (rpm)   rpm.innerText   = running ? "1750 RPM" : "0 RPM"
  if (state) state.innerText = running ? "RUN"      : "STOP"

  if (green) green.classList.toggle("on-green", !!outputs["Q0.1"])
  if (red)   red.classList.toggle("on-red",     !!outputs["Q0.2"])
  if (blue)  blue.classList.toggle("on-blue",   !!outputs["Q0.3"])
}

/* =========================================================
   SELECT ELEMENT
========================================================= */

document.addEventListener("click", e => {
  const el = e.target.closest(".contact,.coil,.timer")
  if (!el) return
  document.querySelectorAll(".selected-element")
    .forEach(s => s.classList.remove("selected-element"))
  el.classList.add("selected-element")
  selectedElement = el
})

/* =========================================================
   DELETE ELEMENT
========================================================= */

document.addEventListener("click", e => {
  if (!e.target.classList.contains("delete-element")) return
  e.stopPropagation()
  const parent = e.target.parentElement
  if (parent) {
    parent.remove()
    scanPLC()
  }
})

/* =========================================================
   DRAG AND DROP
========================================================= */

let draggedElement = null

function enableDrag() {
  document.querySelectorAll(".contact,.coil,.timer").forEach(el => {
    el.setAttribute("draggable", "true")
    el.addEventListener("dragstart", function() { draggedElement = this })
    el.addEventListener("dragover",  e => e.preventDefault())
    el.addEventListener("drop", function(e) {
      e.preventDefault()
      if (draggedElement && draggedElement !== this) {
        this.parentNode.insertBefore(draggedElement, this)
        scanPLC()
      }
    })
  })
}

/* =========================================================
   HELPERS — ADD ELEMENTS
========================================================= */

function getLastRung() {
  const rungs = document.querySelectorAll("#ladder .rung")
  return rungs[rungs.length - 1]
}

function insertBeforeLastCoil(rung, el) {
  const line = document.createElement("div")
  line.className = "line"
  const lastCoil = [...rung.querySelectorAll(".coil")].pop()
  if (lastCoil) {
    rung.insertBefore(line, lastCoil)
    rung.insertBefore(el,   lastCoil)
  } else {
    rung.appendChild(line)
    rung.appendChild(el)
  }
}

function createDeleteButton() {
  const del = document.createElement("div")
  del.className = "delete-element"
  del.innerText = "✕"
  return del
}

/* =========================================================
   ADD CONTACT NO
========================================================= */

function addNO() {
  const rung = getLastRung()
  if (!rung) return
  const c = document.createElement("div")
  c.className = "contact"
  c.dataset.type    = "NO"
  c.dataset.address = "I0.0"
  c.innerHTML = `<span>I0.0</span>`
  c.appendChild(createDeleteButton())
  insertBeforeLastCoil(rung, c)
  enableDrag()
  scanPLC()
}

/* =========================================================
   ADD CONTACT NC
========================================================= */

function addNC() {
  const rung = getLastRung()
  if (!rung) return
  const c = document.createElement("div")
  c.className = "contact"
  c.dataset.type    = "NC"
  c.dataset.address = "I0.1"
  c.innerHTML = `<span class="diag"></span><span>I0.1</span>`
  c.appendChild(createDeleteButton())
  insertBeforeLastCoil(rung, c)
  enableDrag()
  scanPLC()
}

/* =========================================================
   ADD COIL
========================================================= */

function addCoil() {
  const rung = getLastRung()
  if (!rung) return
  const c = document.createElement("div")
  c.className = "coil"
  c.dataset.address = "Q0.0"
  c.innerHTML = `<span class="coil-circle">Q0.0</span>`
  c.appendChild(createDeleteButton())
  const line = document.createElement("div")
  line.className = "line"
  rung.appendChild(line)
  rung.appendChild(c)
  enableDrag()
  scanPLC()
}

/* =========================================================
   ADD TON
========================================================= */

function addTON() {
  const rung = getLastRung()
  if (!rung) return
  const t = document.createElement("div")
  t.className = "timer"
  t.dataset.address = "T0.0"
  t.dataset.preset  = "3000"
  t.innerHTML = `3000ms`
  t.appendChild(createDeleteButton())
  insertBeforeLastCoil(rung, t)
  enableDrag()
  scanPLC()
}

/* =========================================================
   ADD RUNG
========================================================= */

function addRung() {
  const ladder = document.getElementById("ladder")
  if (!ladder) return
  const rung = document.createElement("div")
  rung.className = "rung"
  rung.innerHTML = `
    <div class="contact" data-type="NO" data-address="I0.0">
      <span>I0.0</span>
    </div>
    <div class="line"></div>
    <div class="coil" data-address="Q0.0">
      <span class="coil-circle">Q0.0</span>
    </div>
  `
  rung.querySelector(".contact").appendChild(createDeleteButton())
  rung.querySelector(".coil").appendChild(createDeleteButton())
  ladder.appendChild(rung)
  enableDrag()
  scanPLC()
}

/* =========================================================
   AUTO SCAN
========================================================= */

setInterval(() => {
  if (plcRunning) scanPLC()
}, 120)

/* =========================================================
   INIT
========================================================= */

window.addEventListener("load", () => {
  enableDrag()
  updateOutputs()
  updateMotor()
})