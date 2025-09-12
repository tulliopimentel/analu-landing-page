export function initHomeInteractions() {
  const nav = document.querySelector('.nav')
  const toggle = document.querySelector('.nav__toggle')
  const menu = document.getElementById('menu')

  if (toggle && nav && menu) {
    const setState = (open) => {
      nav.classList.toggle('nav--open', open)
      document.documentElement.classList.toggle('menu-open', open)
      toggle.setAttribute('aria-expanded', String(open))
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
    }

    toggle.addEventListener('click', () => {
      const willOpen = !nav.classList.contains('nav--open')
      setState(willOpen)
    })

    menu.addEventListener('click', (e) => {
      const t = e.target
      if (t && t.tagName === 'A') setState(false)
    })

    // Fechar com ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setState(false)
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.14 }
  )

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))

  const y = document.getElementById('year')
  if (y) y.textContent = new Date().getFullYear().toString()
}


