
// function onKeyDown(keydata) {
//   console.log(keydata.keyCode)
// }

function getElementByKeyCode(keyCode) {
  return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}) {
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')
  if(opts.success) {
    el.classList.add('success')
  } else if(opts.fail) {
    el.classList.add('fail')
  }
  setTimeout(function() {
    deactivate(el)
  }, 500)
}

function deactivate(el) {
  el.className = 'key'
}

const level = 15

let keys = generateKeys(level)

function generateKeys(level) {
  return new Array(level).fill(0).map(generateKeysRandom)
}

function generateKeysRandom() {
  const max = 90
  const min = 65
  return Math.round(Math.random() * (max-min) + min)
}

function nextLevel(currentLevel) {
  if(currentLevel == (level)) {
    return alert('Ganaste!')
  }

  alert(`Nivel ${currentLevel}`)

  for (let i = 0; i <= currentLevel; i++) {
    setTimeout(function() {
      activate(keys[i])
    }, 1000 * (i+1) + 1000)
  }

  let i = 0

  let currentKey = keys[i]

  document.addEventListener('keydown', onKeyDown)

  function onKeyDown(ev) {
    if(ev.keyCode == currentKey) {
      activate(currentKey, {success: true})
      i++
      if(i > currentLevel) {
        document.removeEventListener('keydown', onKeyDown)
        setTimeout(function() {
          nextLevel(i)
        }, 1500)
      }
      currentKey = keys[i]
    } else {
      activate(ev.keyCode, {fail: true})
      document.removeEventListener('keydown', onKeyDown)
      setTimeout(function() {
        alert('Perdiste :(')
      }, 400)
    }
  }

}
nextLevel(0)
