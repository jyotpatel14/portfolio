import { getState } from '../store.js'
import { formatLocation } from '../utils.js'
import '../styles/hero.css'

export function renderHero() {
  const { profile } = getState()

  const section = document.createElement('section')
  section.id = 'home'
  section.className = 'hero container'

  section.innerHTML = `
    <div>
      <p class="eyebrow">${profile.currentRole || 'Software Engineer'}</p>
      <h1>${profile.name || 'Jyot Kalpesh Patel'}</h1>
      <p class="hero__lead">${profile.headline || ''}</p>
      <div class="hero__actions">
        <a class="button button--primary" href="#projects">View Projects</a>
        <a class="button button--ghost" href="#contact">Contact Me</a>
      </div>
      <div class="hero__meta">
        <span>${formatLocation(profile.location)}</span>
        <span>${profile.currentRole || ''}</span>
      </div>
    </div>
    <div class="hero__visual">
      <div class="profile-frame">
        <img src="jyot patel [2]-1500w.png" alt="Jyot Patel" loading="eager" />
        <div class="profile-badge">Available for work</div>
      </div>
    </div>
  `

  return section
}

export function updateHero(profile) {
  const nameEl = document.querySelector('#home h1')
  const headlineEl = document.querySelector('#home .hero__lead')
  const metaEls = document.querySelectorAll('#home .hero__meta span')
  const eyebrowEl = document.querySelector('#home .eyebrow')

  if (nameEl) nameEl.textContent = profile.name || 'Jyot Kalpesh Patel'
  if (headlineEl) headlineEl.textContent = profile.headline || ''
  if (eyebrowEl) eyebrowEl.textContent = profile.currentRole || 'Software Engineer'
  if (metaEls.length >= 2) {
    metaEls[0].textContent = formatLocation(profile.location)
    metaEls[1].textContent = profile.currentRole || ''
  }
}
