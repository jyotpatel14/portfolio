import { getState } from '../store.js'
import { escapeHtml } from '../utils.js'
import '../styles/education.css'

export function renderEducation() {
  const { education } = getState()

  const section = document.createElement('section')
  section.id = 'education'
  section.className = 'section container'

  section.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">05 / Education</p>
      <h2>Learning path</h2>
    </div>
    <div class="education-grid" id="education-grid">
      ${(education.academic || [])
        .map(
          (edu) => `
        <article class="education-card">
          <h3>${escapeHtml(edu.degree || '')}</h3>
          <p><strong>${escapeHtml(edu.institution || '')}</strong></p>
          <p>${escapeHtml(edu.startDate || '')} — ${escapeHtml(edu.endDate || '')}</p>
          <p>${escapeHtml(edu.grade || '')}</p>
        </article>`
        )
        .join('')}
    </div>
  `

  return section
}

export function updateEducation(education) {
  const grid = document.querySelector('#education-grid')
  if (!grid) return
  grid.innerHTML = (education.academic || [])
    .map(
      (edu) => `
    <article class="education-card">
      <h3>${escapeHtml(edu.degree || '')}</h3>
      <p><strong>${escapeHtml(edu.institution || '')}</strong></p>
      <p>${escapeHtml(edu.startDate || '')} — ${escapeHtml(edu.endDate || '')}</p>
      <p>${escapeHtml(edu.grade || '')}</p>
    </article>`
    )
    .join('')
}
