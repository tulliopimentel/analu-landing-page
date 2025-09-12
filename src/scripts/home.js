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

  // Lightbox Catálogo
  const catalogButtons = Array.from(document.querySelectorAll('.catalog-card'))
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const btnClose = document.getElementById('lightboxClose')
  const btnPrev = document.getElementById('lightboxPrev')
  const btnNext = document.getElementById('lightboxNext')
  let currentIndex = 0

  const images = catalogButtons.map((btn) => {
    const img = btn.querySelector('img')
    return { src: img?.getAttribute('src') || '', alt: img?.getAttribute('alt') || '' }
  })

  const openLightbox = (index) => {
    if (!lightbox || !lightboxImg || !images[index]) return
    currentIndex = index
    lightboxImg.src = images[currentIndex].src
    lightboxImg.alt = images[currentIndex].alt
    lightbox.setAttribute('aria-hidden', 'false')
    document.documentElement.classList.add('menu-open')
  }

  const closeLightbox = () => {
    if (!lightbox) return
    lightbox.setAttribute('aria-hidden', 'true')
    document.documentElement.classList.remove('menu-open')
  }

  const showNext = () => openLightbox((currentIndex + 1) % images.length)
  const showPrev = () => openLightbox((currentIndex - 1 + images.length) % images.length)

  catalogButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => openLightbox(idx))
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openLightbox(idx)
      }
    })
  })

  if (btnClose) btnClose.addEventListener('click', closeLightbox)
  if (btnNext) btnNext.addEventListener('click', showNext)
  if (btnPrev) btnPrev.addEventListener('click', showPrev)

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox()
    })
  }

  window.addEventListener('keydown', (e) => {
    const isOpen = lightbox && lightbox.getAttribute('aria-hidden') === 'false'
    if (!isOpen) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') showNext()
    if (e.key === 'ArrowLeft') showPrev()
  })
}


