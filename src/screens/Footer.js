import '../styles/footer.css'

export function renderFooter() {
  const footer = document.createElement('footer')
  footer.className = 'site-footer'

  footer.innerHTML = `
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Jyot Patel. Built with vanilla intent.</p>
    </div>
  `

  return footer
}
