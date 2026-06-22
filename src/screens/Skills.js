import { getState } from '../store.js'
import '../styles/skills.css'

export function renderSkills() {
  const { skills } = getState()

  const section = document.createElement('section')
  section.id = 'skills'
  section.className = 'section container'

  section.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">02 / Skills</p>
      <h2>Tech stack</h2>
    </div>
    <div class="skills-grid" id="skills-grid">
      ${(skills.categories || [])
        .map(
          (cat) => `
        <div class="skill-card">
          <span class="skill-card__label">${cat.category || ''}</span>
          <div class="skill-card__items">
            ${(cat.items || []).map((item) => `<span class="skill-pill">${item}</span>`).join('')}
          </div>
        </div>`
        )
        .join('')}
    </div>
  `

  return section
}

export function updateSkills(skills) {
  const grid = document.querySelector('#skills-grid')
  if (!grid) return
  grid.innerHTML = (skills.categories || [])
    .map(
      (cat) => `
    <div class="skill-card">
      <span class="skill-card__label">${cat.category || ''}</span>
      <div class="skill-card__items">
        ${(cat.items || []).map((item) => `<span class="skill-pill">${item}</span>`).join('')}
      </div>
    </div>`
    )
    .join('')
}
