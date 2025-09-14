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

    // Drag-scroll: melhora no mobile deixando o scroll nativo; drag apenas no mouse
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

    // Pointer events: aplica drag somente para dispositivos com mouse
    const isMousePointer = (e) => e.pointerType === 'mouse'
    catalogTrack.addEventListener('pointerdown', (e) => {
      if (!isMousePointer(e)) return
      try { if (e.pointerId != null && e.target && typeof e.target.setPointerCapture === 'function') e.target.setPointerCapture(e.pointerId) } catch {}
      e.preventDefault()
      onPointerDown(e.clientX)
    })
    catalogTrack.addEventListener('pointermove', (e) => { if (isMousePointer(e)) onPointerMove(e.clientX, e) })
    catalogTrack.addEventListener('pointerup', (e) => {
      if (!isMousePointer(e)) return
      try { if (e.pointerId != null && e.target && typeof e.target.releasePointerCapture === 'function') e.target.releasePointerCapture(e.pointerId) } catch {}
      onPointerUp()
    })
    catalogTrack.addEventListener('pointercancel', (e) => { if (isMousePointer(e)) onPointerUp() })

    // Em touch, usamos o scroll nativo para ficar mais suave
    // Apenas prevenimos drag da imagem e clique acidental

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

  // Gestos na imagem do lightbox: swipe, pinch‑to‑zoom e pan
  if (lightboxImg) {
    let lbPointerDown = false
    let lbStartX = 0
    let lbMoved = false

    // Estado de zoom/pan
    let scale = 1
    let baseScale = 1
    let panX = 0
    let panY = 0
    let startPanX = 0
    let startPanY = 0
    let startClientX = 0
    let startClientY = 0
    const pointers = new Map()

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
    const applyTransform = () => {
      lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`
    }
    const maxPan = () => {
      const w = lightboxImg.clientWidth
      const h = lightboxImg.clientHeight
      const maxX = (w * (scale - 1)) / 2
      const maxY = (h * (scale - 1)) / 2
      return { maxX, maxY }
    }

    // Swipe (apenas quando não está com zoom)
    const lbDown = (x) => { lbPointerDown = true; lbMoved = false; lbStartX = x }
    const lbMove = (x, e) => {
      if (!lbPointerDown) return
      if (Math.abs(x - lbStartX) > 6) lbMoved = true
      if (e) e.preventDefault()
    }
    const lbUp = (x) => {
      if (!lbPointerDown) return
      const delta = x - lbStartX
      lbPointerDown = false
      if (Math.abs(delta) > 40) {
        if (delta < 0) showNext()
        else showPrev()
      }
    }

    const updatePointer = (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    }
    const removePointer = (e) => { pointers.delete(e.pointerId) }

    let pinchStartDist = 0
    let pinchBaseScale = 1

    const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
    const center = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })

    lightboxImg.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      updatePointer(e)
      // Quando com zoom, inicia pan com dedo único
      if (pointers.size === 1 && scale > 1) {
        startPanX = panX
        startPanY = panY
        startClientX = e.clientX
        startClientY = e.clientY
        return
      }
      // Duplo toque (desktop: dblclick; mobile: threshold rápido)
      lbDown(e.clientX)
      try { if (e.pointerId != null) e.target.setPointerCapture(e.pointerId) } catch {}
      if (pointers.size === 2) {
        const it = Array.from(pointers.values())
        pinchStartDist = distance(it[0], it[1])
        pinchBaseScale = scale
      }
    })

    lightboxImg.addEventListener('pointermove', (e) => {
      updatePointer(e)
      if (pointers.size === 2) {
        const it = Array.from(pointers.values())
        const dist = distance(it[0], it[1])
        const next = clamp(pinchBaseScale * (dist / Math.max(1, pinchStartDist)), 1, 4)
        scale = next
        // Limita pan quando faz pinch: mantém dentro dos limites atuais
        const { maxX, maxY } = maxPan()
        panX = clamp(panX, -maxX, maxX)
        panY = clamp(panY, -maxY, maxY)
        applyTransform()
        e.preventDefault()
        return
      }
      if (pointers.size === 1 && scale > 1) {
        const dx = e.clientX - startClientX
        const dy = e.clientY - startClientY
        const { maxX, maxY } = maxPan()
        panX = clamp(startPanX + dx, -maxX, maxX)
        panY = clamp(startPanY + dy, -maxY, maxY)
        applyTransform()
        e.preventDefault()
        return
      }
      // Swipe somente quando não está com zoom
      if (scale === 1) lbMove(e.clientX, e)
    })

    lightboxImg.addEventListener('pointerup', (e) => {
      removePointer(e)
      try { if (e.pointerId != null) e.target.releasePointerCapture(e.pointerId) } catch {}
      if (pointers.size === 0) {
        baseScale = scale
        if (scale === 1) { panX = 0; panY = 0; applyTransform() }
      }
      if (scale === 1) lbUp(e.clientX)
    })
    lightboxImg.addEventListener('pointercancel', (e) => { removePointer(e); lbPointerDown = false })

    // Fallback Touch (iOS antigos) – apenas para swipe quando sem zoom
    lightboxImg.addEventListener('touchstart', (e) => { if (scale === 1) lbDown(e.touches[0].clientX) }, { passive: false })
    lightboxImg.addEventListener('touchmove', (e) => { if (scale === 1) lbMove(e.touches[0].clientX, e) }, { passive: false })
    lightboxImg.addEventListener('touchend', (e) => { if (scale === 1) { const t = e.changedTouches && e.changedTouches[0]; lbUp(t ? t.clientX : lbStartX) } })

    // Duplo toque / double-tap para zoom in/out
    let lastTap = 0
    const toggleZoomAtCenter = () => {
      if (scale === 1) { scale = 2; panX = 0; panY = 0 } else { scale = 1; panX = 0; panY = 0 }
      applyTransform()
    }
    lightboxImg.addEventListener('click', () => {
      const now = Date.now()
      if (now - lastTap < 300) { toggleZoomAtCenter() }
      lastTap = now
    })
    lightboxImg.addEventListener('dblclick', (e) => { e.preventDefault(); toggleZoomAtCenter() })
  }
}


