import { getState } from '../store.js'
import { escapeHtml } from '../utils.js'
import '../styles/experience.css'

export function renderExperience() {
  const { experience } = getState()

  const section = document.createElement('section')
  section.id = 'experience'
  section.className = 'section container'

  section.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">03 / Experience</p>
      <h2>Professional journey</h2>
    </div>
    <div class="timeline" id="experience-list">
      ${(experience.professional || [])
        .map(
          (job) => `
        <article class="timeline-item">
          <h3>${escapeHtml(job.role)} @ ${escapeHtml(job.company)}</h3>
          <small>${escapeHtml(job.startDate || '')} — ${escapeHtml(job.endDate || 'Present')}</small>
          <p>${escapeHtml(job.summary || '')}</p>
        </article>`
        )
        .join('')}
    </div>
  `

  return section
}

export function updateExperience(experience) {
  const list = document.querySelector('#experience-list')
  if (!list) return
  list.innerHTML = (experience.professional || [])
    .map(
      (job) => `
    <article class="timeline-item">
      <h3>${escapeHtml(job.role)} @ ${escapeHtml(job.company)}</h3>
      <small>${escapeHtml(job.startDate || '')} — ${escapeHtml(job.endDate || 'Present')}</small>
      <p>${escapeHtml(job.summary || '')}</p>
    </article>`
    )
    .join('')
}
