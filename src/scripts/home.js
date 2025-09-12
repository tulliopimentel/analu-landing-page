export function initHomeInteractions() {
  const nav = document.querySelector('.nav')
  const toggle = document.querySelector('.nav__toggle')
  const menu = document.getElementById('menu')

  if (toggle && nav && menu) {
    const setState = (open) => {
      nav.classList.toggle('nav--open', open)
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

    // Fechar menu ao redimensionar para desktop e garantir desbloqueio do scroll
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && nav.classList.contains('nav--open')) setState(false)
    })
    window.addEventListener('orientationchange', () => setState(false))
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
  const catalogTrack = document.getElementById('catalogTrack')
  const catalogDots = document.getElementById('catalogDots')
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

  // Dots do carrossel (mobile)
  if (catalogTrack && catalogDots) {
    const getPageSize = () => catalogTrack.clientWidth
    const getTotalWidth = () => catalogTrack.scrollWidth
    const computePageCount = () => Math.max(1, Math.ceil(getTotalWidth() / getPageSize()))

    const renderDots = () => {
      const pages = computePageCount()
      catalogDots.innerHTML = ''
      for (let i = 0; i < pages; i += 1) {
        const dot = document.createElement('span')
        dot.className = 'carousel-dot'
        dot.setAttribute('aria-current', i === 0 ? 'true' : 'false')
        dot.addEventListener('click', () => {
          catalogTrack.scrollTo({ left: i * getPageSize(), behavior: 'smooth' })
        })
        catalogDots.appendChild(dot)
      }
    }
    const updateActiveDot = () => {
      const pages = computePageCount()
      const dots = catalogDots.querySelectorAll('.carousel-dot')
      if (!dots.length) return
      const rawIndex = Math.round(catalogTrack.scrollLeft / getPageSize())
      const idx = Math.min(Math.max(rawIndex, 0), pages - 1)
      dots.forEach((d, i) => d.setAttribute('aria-current', i === idx ? 'true' : 'false'))
    }
    renderDots()
    updateActiveDot()
    let ticking = false
    catalogTrack.addEventListener('scroll', () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateActiveDot()
        ticking = false
      })
    })
    window.addEventListener('resize', () => {
      const currentPage = Math.round(catalogTrack.scrollLeft / getPageSize())
      renderDots()
      updateActiveDot()
      catalogTrack.scrollTo({ left: currentPage * getPageSize() })
    })

    // Drag-scroll unificado (mouse e touch via Pointer Events; com fallback para touch)
    let pointerDown = false
    let startX = 0
    let startScrollLeft = 0
    let dragged = false
    let suppressClick = false

    const onPointerDown = (clientX) => {
      pointerDown = true
      dragged = false
      catalogTrack.classList.add('is-dragging')
      startX = clientX
      startScrollLeft = catalogTrack.scrollLeft
    }
    const onPointerMove = (clientX, evt) => {
      if (!pointerDown) return
      const delta = clientX - startX
      if (Math.abs(delta) > 3) dragged = true
      catalogTrack.scrollLeft = startScrollLeft - delta
      if (evt) evt.preventDefault()
    }
    const onPointerUp = () => {
      pointerDown = false
      catalogTrack.classList.remove('is-dragging')
      if (dragged) {
        suppressClick = true
        setTimeout(() => { suppressClick = false }, 60)
      }
    }

    // Pointer events (cobre mouse e a maioria dos navegadores mobile)
    catalogTrack.addEventListener('pointerdown', (e) => {
      // Captura o ponteiro para continuar recebendo eventos durante o arraste
      try { if (e.pointerId != null) catalogTrack.setPointerCapture(e.pointerId) } catch {}
      e.preventDefault()
      onPointerDown(e.clientX)
    })
    catalogTrack.addEventListener('pointermove', (e) => onPointerMove(e.clientX, e))
    catalogTrack.addEventListener('pointerup', (e) => {
      try { if (e.pointerId != null) catalogTrack.releasePointerCapture(e.pointerId) } catch {}
      onPointerUp()
    })
    catalogTrack.addEventListener('pointercancel', onPointerUp)

    // Fallback para touch (iOS antigos)
    catalogTrack.addEventListener('touchstart', (e) => onPointerDown(e.touches[0].clientX), { passive: false })
    catalogTrack.addEventListener('touchmove', (e) => onPointerMove(e.touches[0].clientX, e), { passive: false })
    catalogTrack.addEventListener('touchend', onPointerUp)

    // Evita comportamento nativo de arrastar imagens e abrir lightbox ao arrastar
    catalogTrack.querySelectorAll('img').forEach((img) => {
      img.addEventListener('dragstart', (ev) => ev.preventDefault())
    })
    catalogButtons.forEach((btn, idx) => {
      btn.addEventListener('click', (ev) => {
        if (suppressClick) { ev.preventDefault(); return }
        openLightbox(idx)
      })
    })
  }
}


