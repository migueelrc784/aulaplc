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

function getLastRung() {
  const rungs = document.querySelectorAll('#ladder .rung')
  return rungs[rungs.length - 1]
}

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