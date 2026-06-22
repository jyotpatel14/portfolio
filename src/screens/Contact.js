import { getState } from '../store.js'
import { formatLocation } from '../utils.js'
import '../styles/contact.css'

export function renderContact() {
  const { profile } = getState()

  const section = document.createElement('section')
  section.id = 'contact'
  section.className = 'section container contact-section'

  const linkedin = (profile.socials || []).find((s) => s.platform === 'LinkedIn')
  const github = (profile.socials || []).find((s) => s.platform === 'GitHub')

  section.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">06 / Contact</p>
      <h2>Let's build something</h2>
    </div>
    <div class="contact-card">
      <div>
        <p id="contact-email">${profile.email || ''}</p>
        <p id="contact-location">${formatLocation(profile.location)}</p>
      </div>
      <div class="contact-links">
        <a href="${linkedin ? linkedin.url : '#'}" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="${github ? github.url : '#'}" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  `

  return section
}

export function updateContact(profile) {
  const emailEl = document.querySelector('#contact-email')
  const locationEl = document.querySelector('#contact-location')
  const linkedinEl = document.querySelector('.contact-links a[href*="linkedin"]')
  const githubEl = document.querySelector('.contact-links a[href*="github"]')

  if (emailEl) emailEl.textContent = profile.email || ''
  if (locationEl) locationEl.textContent = formatLocation(profile.location)

  const linkedin = (profile.socials || []).find((s) => s.platform === 'LinkedIn')
  const github = (profile.socials || []).find((s) => s.platform === 'GitHub')

  if (linkedinEl && linkedin) linkedinEl.href = linkedin.url
  if (githubEl && github) githubEl.href = github.url
}
