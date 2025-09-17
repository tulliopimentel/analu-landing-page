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
  const catalogButtons = Array.from(document.querySelectorAll('#catalogTrack .catalog-card'))
  const catalogTrack = document.getElementById('catalogTrack')
  const catalogDots = document.getElementById('catalogDots')
  // Sustentabilidade carousel elements
  const sustTrack = document.getElementById('sustentabilidadeTrack')
  const sustDots = document.getElementById('sustentabilidadeDots')
  const sustButtons = Array.from(document.querySelectorAll('#sustentabilidadeTrack .sustentabilidade-card'))
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const btnClose = document.getElementById('lightboxClose')
  const btnPrev = document.getElementById('lightboxPrev')
  const btnNext = document.getElementById('lightboxNext')
  let currentIndex = 0
  // Zoom state (hoisted so openLightbox can reset without ReferenceError)
  let scale = 1
  let baseScale = 1
  let panX = 0
  let panY = 0
  const applyTransform = () => { if (lightboxImg) lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})` }
  const resetTransform = () => { scale = 1; baseScale = 1; panX = 0; panY = 0; applyTransform() }

  // Build image groups (catalog & sustentabilidade)
  const catalogImages = catalogButtons.map((btn) => {
    const img = btn.querySelector('img')
    return { src: img?.getAttribute('src') || '', alt: img?.getAttribute('alt') || '' }
  })
  const sustImages = sustButtons.map((btn) => {
    const img = btn.querySelector('img')
    return { src: img?.getAttribute('src') || '', alt: img?.getAttribute('alt') || '' }
  })
  let activeImages = catalogImages
  let activeGroup = 'catalog'

  const applyImage = () => {
    if (!lightboxImg || !activeImages[currentIndex]) return
    lightboxImg.src = activeImages[currentIndex].src
    lightboxImg.alt = activeImages[currentIndex].alt
  }

  const openLightbox = (index, group = 'catalog') => {
    if (!lightbox || !lightboxImg) return
    activeGroup = group
    activeImages = group === 'sustentabilidade' ? sustImages : catalogImages
    currentIndex = Math.min(Math.max(index, 0), activeImages.length - 1)
    // Reset zoom state
    resetTransform()
    applyImage()
    lightbox.setAttribute('aria-hidden', 'false')
    document.documentElement.classList.add('menu-open')
  }
  const closeLightbox = () => {
    if (!lightbox) return
    lightbox.setAttribute('aria-hidden', 'true')
    document.documentElement.classList.remove('menu-open')
  }
  const showNext = () => {
    if (!activeImages.length) return
    currentIndex = (currentIndex + 1) % activeImages.length
    applyImage(); resetTransform()
  }
  const showPrev = () => {
    if (!activeImages.length) return
    currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length
    applyImage(); resetTransform()
  }

  // Generic function to init a horizontal carousel with dots & drag
    function initCarousel(track, dots, buttons, clickHandlerNamespace) {
      if (!track || !dots) return
      const getPageSize = () => track.clientWidth
      const getTotalWidth = () => track.scrollWidth
      const computePageCount = () => Math.max(1, Math.ceil(getTotalWidth() / getPageSize()))

      const renderDots = () => {
        const pages = computePageCount()
        dots.innerHTML = ''
        for (let i = 0; i < pages; i += 1) {
          const dot = document.createElement('span')
          dot.className = 'carousel-dot'
          dot.setAttribute('aria-current', i === 0 ? 'true' : 'false')
          dot.addEventListener('click', () => {
            track.scrollTo({ left: i * getPageSize(), behavior: 'smooth' })
          })
          dots.appendChild(dot)
        }
      }
      const updateActiveDot = () => {
        const pages = computePageCount()
        const dotEls = dots.querySelectorAll('.carousel-dot')
        if (!dotEls.length) return
        const rawIndex = Math.round(track.scrollLeft / getPageSize())
        const idx = Math.min(Math.max(rawIndex, 0), pages - 1)
        dotEls.forEach((d, i) => d.setAttribute('aria-current', i === idx ? 'true' : 'false'))
      }
      renderDots(); updateActiveDot()
      let ticking = false
      track.addEventListener('scroll', () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          updateActiveDot();
          ticking = false
        })
      })
      window.addEventListener('resize', () => {
        const currentPage = Math.round(track.scrollLeft / getPageSize())
        renderDots(); updateActiveDot();
        track.scrollTo({ left: currentPage * getPageSize() })
      })

      // Drag-scroll behavior (mouse only)
      let pointerDown = false, startX = 0, startScrollLeft = 0, dragged = false, suppressClick = false
      const onPointerDown = (clientX) => { pointerDown = true; dragged = false; track.classList.add('is-dragging'); startX = clientX; startScrollLeft = track.scrollLeft }
      const onPointerMove = (clientX, evt) => { if (!pointerDown) return; const delta = clientX - startX; if (Math.abs(delta) > 3) dragged = true; track.scrollLeft = startScrollLeft - delta; if (evt) evt.preventDefault() }
      const onPointerUp = () => { pointerDown = false; track.classList.remove('is-dragging'); if (dragged) { suppressClick = true; setTimeout(() => { suppressClick = false }, 150) } }
      const isMousePointer = (e) => e.pointerType === 'mouse'
      track.addEventListener('pointerdown', (e) => { if (!isMousePointer(e)) return; try { if (e.pointerId != null && e.target && typeof e.target.setPointerCapture === 'function') e.target.setPointerCapture(e.pointerId) } catch {}; e.preventDefault(); onPointerDown(e.clientX) })
      track.addEventListener('pointermove', (e) => { if (isMousePointer(e)) onPointerMove(e.clientX, e) })
      track.addEventListener('pointerup', (e) => { if (!isMousePointer(e)) return; try { if (e.pointerId != null && e.target && typeof e.target.releasePointerCapture === 'function') e.target.releasePointerCapture(e.pointerId) } catch {}; onPointerUp() })
      track.addEventListener('pointercancel', (e) => { if (isMousePointer(e)) onPointerUp() })
      // Prevent native image drag
      track.querySelectorAll('img').forEach((img) => img.addEventListener('dragstart', (ev) => ev.preventDefault()))
      buttons.forEach((btn, idx) => {
        btn.addEventListener('click', (ev) => {
          if (suppressClick) { ev.preventDefault(); return }
          openLightbox(idx, clickHandlerNamespace)
        })
      })
    }

  initCarousel(catalogTrack, catalogDots, catalogButtons, 'catalog')
  initCarousel(sustTrack, sustDots, sustButtons, 'sustentabilidade')

  // Gestos na imagem do lightbox: swipe, pinch‑to‑zoom e pan
  if (lightboxImg) {
    let lbPointerDown = false
    let lbStartX = 0
    let lbMoved = false

  // (Estado de zoom/pan já hoistado)
    let startPanX = 0
    let startPanY = 0
    let startClientX = 0
    let startClientY = 0
    const pointers = new Map()

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
  // (Funções applyTransform/resetTransform já definidas acima)
    const maxPan = () => {
      const w = lightboxImg.clientWidth
      const h = lightboxImg.clientHeight
      const maxX = (w * (scale - 1)) / 2
      const maxY = (h * (scale - 1)) / 2
      return { maxX, maxY }
    }
    // Controla estado de pan ativo (mouse pressionado enquanto com zoom)
    let isPanning = false

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
      // Track last pointer type to distinguish desktop (mouse) from touch for zoom behavior
      lastPointerType = e.pointerType || 'mouse'
      updatePointer(e)
      // Quando com zoom, inicia pan com dedo único
      if (pointers.size === 1 && scale > 1) {
        startPanX = panX
        startPanY = panY
        startClientX = e.clientX
        startClientY = e.clientY
        isPanning = true
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

    let rafPending = false
    const scheduleTransform = () => { if (rafPending) return; rafPending = true; requestAnimationFrame(() => { applyTransform(); rafPending = false }) }

    lightboxImg.addEventListener('pointermove', (e) => {
      updatePointer(e)
      if (pointers.size === 2) {
        const it = Array.from(pointers.values())
        const dist = distance(it[0], it[1])
        const next = clamp(pinchBaseScale * (dist / Math.max(1, pinchStartDist)), 1, 2.5)
        scale = next
        const { maxX, maxY } = maxPan()
        panX = clamp(panX, -maxX, maxX)
        panY = clamp(panY, -maxY, maxY)
        scheduleTransform()
        e.preventDefault(); return
      }
      if (pointers.size === 1 && scale > 1 && isPanning) {
        const dx = e.clientX - startClientX
        const dy = e.clientY - startClientY
        const { maxX, maxY } = maxPan()
        panX = clamp(startPanX + dx, -maxX, maxX)
        panY = clamp(startPanY + dy, -maxY, maxY)
        scheduleTransform()
        e.preventDefault(); return
      }
      if (scale === 1) lbMove(e.clientX, e)
    })

    lightboxImg.addEventListener('pointerup', (e) => {
      removePointer(e)
      try { if (e.pointerId != null) e.target.releasePointerCapture(e.pointerId) } catch {}
      isPanning = false
      if (pointers.size === 0) {
        // Se o zoom está próximo de caber na tela, ajusta para caber 100% e centraliza
        if (scale <= 1.02) { resetTransform() } else { applyTransform() }
        baseScale = scale
        scheduleTransform()
      }
      if (scale === 1) lbUp(e.clientX)
    })
    lightboxImg.addEventListener('pointercancel', (e) => { removePointer(e); lbPointerDown = false })

    // Fallback Touch (iOS antigos) – apenas para swipe quando sem zoom
    lightboxImg.addEventListener('touchstart', (e) => { if (scale === 1) lbDown(e.touches[0].clientX) }, { passive: false })
    lightboxImg.addEventListener('touchmove', (e) => { if (scale === 1) lbMove(e.touches[0].clientX, e) }, { passive: false })
    lightboxImg.addEventListener('touchend', (e) => { if (scale === 1) { const t = e.changedTouches && e.changedTouches[0]; lbUp(t ? t.clientX : lbStartX) } })

    // Duplo toque / double-tap para zoom in/out
    // Double click / double tap to zoom (2 clicks)
    let lastClick = 0
    let lastPointerType = 'mouse'
    const toggleZoom = () => {
      if (scale === 1) {
        scale = 2; panX = 0; panY = 0
      } else {
        resetTransform()
      }
      applyTransform()
    }
    // On desktop (mouse): single click toggles zoom.
    // On touch: retain double-tap (within 320ms) to avoid accidental zoom on simple tap to navigate/swipe.
    lightboxImg.addEventListener('click', (e) => {
      if (lastPointerType === 'mouse') {
        toggleZoom()
        return
      }
      const now = Date.now()
      if (now - lastClick < 320) toggleZoom()
      lastClick = now
    })
  }

  // Close controls (backdrop, buttons & keys)
  if (btnClose) btnClose.addEventListener('click', closeLightbox)
  if (btnNext) btnNext.addEventListener('click', showNext)
  if (btnPrev) btnPrev.addEventListener('click', showPrev)
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      const img = lightboxImg
      if (!img) return
      if (e.target === lightbox) { closeLightbox(); return }
      // Clicking inside wrapper but NOT on image (wrapper has pointer-events:none normally)
      if (e.target !== img && !img.contains(e.target)) closeLightbox()
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


