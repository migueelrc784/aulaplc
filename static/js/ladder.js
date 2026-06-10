/* =========================================================
   CREATE NC DIAGONALS
========================================================= */

function buildNC() {
  document.querySelectorAll('.contact[data-type="NC"]').forEach(contact => {
    if (!contact.querySelector('.diag')) {
      const diag = document.createElement('span')
      diag.className = 'diag'
      contact.appendChild(diag)
    }
  })
}

buildNC()

/* =========================================================
   DELETE ELEMENT
========================================================= */

document.addEventListener('click', e => {
  if (e.target.classList.contains('delete-element')) {
    e.target.parentElement.remove()
    scanPLC()
  }
})

/* =========================================================
   HELPERS
========================================================= */

// Devuelve el último rung del ladder
function getLastRung() {
  const rungs = document.querySelectorAll('#ladder .rung')
  return rungs[rungs.length - 1]
}

// Inserta line + elemento antes de la última bobina del rung
function insertBeforeLastCoil(rung, element) {
  const line = document.createElement('div')
  line.className = 'line'
  const lastCoil = rung.querySelector('.coil:last-of-type')
  if (lastCoil) {
    rung.insertBefore(line, lastCoil)
    rung.insertBefore(element, lastCoil)
  } else {
    rung.appendChild(line)
    rung.appendChild(element)
  }
}

/* =========================================================
   ADD CONTACT NO
========================================================= */

function addNO() {
  const rung = getLastRung()
  const c = document.createElement('div')
  c.className = 'contact'
  c.dataset.type = 'NO'
  c.dataset.address = 'I0.0'
  c.innerHTML = `
    <span>I0.0</span>
    <div class="delete-element">✕</div>
  `
  insertBeforeLastCoil(rung, c)
  scanPLC()
}

/* =========================================================
   ADD CONTACT NC
========================================================= */

function addNC() {
  const rung = getLastRung()
  const c = document.createElement('div')
  c.className = 'contact'
  c.dataset.type = 'NC'
  c.dataset.address = 'I0.1'
  c.innerHTML = `
    <span class="diag"></span>
    <span>I0.1</span>
    <div class="delete-element">✕</div>
  `
  insertBeforeLastCoil(rung, c)
  scanPLC()
}

/* =========================================================
   ADD COIL
========================================================= */

function addCoil() {
  const rung = getLastRung()
  const c = document.createElement('div')
  c.className = 'coil'
  c.dataset.address = 'Q0.0'
  c.innerHTML = `
    <span class="coil-circle">Q0.0</span>
    <div class="delete-element">✕</div>
  `
  const line = document.createElement('div')
  line.className = 'line'
  rung.appendChild(line)
  rung.appendChild(c)
  scanPLC()
}

/* =========================================================
   ADD TON
========================================================= */

function addTON() {
  const rung = getLastRung()
  const t = document.createElement('div')
  t.className = 'timer'
  t.dataset.address = 'T0.0'
  t.dataset.preset = '3000'
  t.innerHTML = `
    3000ms
    <div class="delete-element">✕</div>
  `
  insertBeforeLastCoil(rung, t)
  scanPLC()
}

/* =========================================================
   ADD RUNG
========================================================= */

function addRung() {
  const ladder = document.getElementById('ladder')
  const rung = document.createElement('div')
  rung.className = 'rung'
  rung.innerHTML = `
    <div class="contact" data-type="NO" data-address="I0.0">
      <span>I0.0</span>
      <div class="delete-element">✕</div>
    </div>
    <div class="line"></div>
    <div class="coil" data-address="Q0.0">
      <span class="coil-circle">Q0.0</span>
      <div class="delete-element">✕</div>
    </div>
  `
  ladder.appendChild(rung)
  scanPLC()
}