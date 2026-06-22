import { getState } from '../store.js'
import '../styles/about.css'

export function renderAbout() {
  const { about } = getState()

  const section = document.createElement('section')
  section.id = 'about'
  section.className = 'section container'

  section.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">01 / About</p>
      <h2>Who I am</h2>
    </div>
    <div class="about-grid">
      <div>
        <p class="about-text">${about.philosophy || about.summary || ''}</p>
      </div>
      <div class="about-panel">
        <h3>Core values</h3>
        <ul id="about-values">
          ${(about.values || []).map((v) => `<li>${v}</li>`).join('')}
        </ul>
      </div>
    </div>
  `

  return section
}

export function updateAbout(about) {
  const textEl = document.querySelector('#about .about-text')
  const valuesEl = document.querySelector('#about #about-values')

  if (textEl) textEl.textContent = about.philosophy || about.summary || ''
  if (valuesEl) {
    valuesEl.innerHTML = (about.values || []).map((v) => `<li>${v}</li>`).join('')
  }
}
