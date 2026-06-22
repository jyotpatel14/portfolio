import '../styles/header.css'

export function renderHeader() {
  const existing = document.querySelector('.site-header')
  if (existing) existing.remove()

  const header = document.createElement('header')
  header.className = 'site-header'

  header.innerHTML = `
    <nav class="nav container">
      <a href="#home" class="brand">
        <span class="brand__symbol">&lt;/&gt;</span>
        <span>Jyot Patel</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  `

  document.body.prepend(header)

  const toggle = header.querySelector('.nav-toggle')
  const links = header.querySelector('.nav-links')
  toggle?.addEventListener('click', () => links?.classList.toggle('open'))
  links?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('open'))
  })
}
