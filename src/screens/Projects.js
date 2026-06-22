import { getState } from '../store.js'
import { escapeHtml } from '../utils.js'
import '../styles/projects.css'

export function renderProjects() {
  const { projects } = getState()

  const section = document.createElement('section')
  section.id = 'projects'
  section.className = 'section container'

  section.innerHTML = `
    <div class="section-heading section-heading--between">
      <div>
        <p class="eyebrow">04 / Projects</p>
        <h2>Selected work</h2>
      </div>
    </div>
    <div class="project-grid" id="project-grid">
      ${(projects.featured || [])
        .map(
          (project) => `
        <article class="project-card">
          <div class="project-card__body">
            <p class="eyebrow">${escapeHtml(project.type || '')}</p>
            <h3>${escapeHtml(project.name || '')}</h3>
            <p>${escapeHtml(project.description || '')}</p>
            <div class="project-tags">
              ${(project.technologies || []).map((tech) => `<span>${escapeHtml(tech)}</span>`).join('')}
            </div>
          </div>
        </article>`
        )
        .join('')}
    </div>
  `

  return section
}

export function updateProjects(projects) {
  const grid = document.querySelector('#project-grid')
  if (!grid) return
  grid.innerHTML = (projects.featured || [])
    .map(
      (project) => `
    <article class="project-card">
      <div class="project-card__body">
        <p class="eyebrow">${escapeHtml(project.type || '')}</p>
        <h3>${escapeHtml(project.name || '')}</h3>
        <p>${escapeHtml(project.description || '')}</p>
        <div class="project-tags">
          ${(project.technologies || []).map((tech) => `<span>${escapeHtml(tech)}</span>`).join('')}
        </div>
      </div>
    </article>`
    )
    .join('')
}
