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
  // Reuse the same card class used in Catálogo so both sections share the behavior
  const sustButtons = Array.from(document.querySelectorAll('#sustentabilidadeTrack .catalog-card'))
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const lightboxCanvas = document.getElementById('lightboxCanvas')
  const lightboxHint = document.querySelector('.lightbox__hint')
  const btnClose = document.getElementById('lightboxClose')
  const btnPrev = document.getElementById('lightboxPrev')
  const btnNext = document.getElementById('lightboxNext')
  let currentIndex = 0
  // Zoom state (hoisted so openLightbox can reset without ReferenceError)
  let scale = 1
  let baseScale = 1
  let panX = 0
  let panY = 0
  // Canvas render state
  let originalBitmap = null // ImageBitmap ou HTMLImageElement da imagem atual
  let lastCanvasGeom = null // { x, y, w, h } em pixels CSS dentro do canvas
  const applyTransform = () => {
    if (lightboxCanvas && originalBitmap) renderCanvas()
    else if (lightboxImg) lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`
  }
  const resetTransform = () => { scale = 1; baseScale = 1; panX = 0; panY = 0; applyTransform() }

  // Build image groups (catalog & sustentabilidade)
  const catalogImages = catalogButtons.map((btn) => {
    const img = btn.querySelector('img')
    const src = (img && (img.currentSrc || img.src || img.getAttribute('src'))) || ''
    return { src, alt: (img?.getAttribute('alt') || img?.alt || '') }
  })
  const sustImages = sustButtons.map((btn) => {
    const img = btn.querySelector('img')
    const src = (img && (img.currentSrc || img.src || img.getAttribute('src'))) || ''
    return { src, alt: (img?.getAttribute('alt') || img?.alt || '') }
  })
  let activeImages = catalogImages
  let activeGroup = 'catalog'

  const applyImage = () => {
    if (!lightboxImg || !activeImages[currentIndex]) return
    const { src, alt } = activeImages[currentIndex]
    // Set base image immediately
    lightboxImg.src = src
    lightboxImg.alt = alt
    // Try to upgrade to an upscaled, lightly sharpened version for better zoom quality
    const targetLongEdge = computeTargetLongEdgeForViewport()
    tryUpgradeToHiRes(src, targetLongEdge)
    // Prepare canvas original bitmap as rendering source
    prepareCanvasSource(src)
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
    // Mostra a dica (fica visível enquanto o lightbox estiver aberto)
    if (lightbox) lightbox.classList.add('show-hint')
    if (lightboxHint) lightboxHint.style.display = 'inline-flex'
  }
  const closeLightbox = () => {
    if (!lightbox) return
    lightbox.setAttribute('aria-hidden', 'true')
    lightbox.classList.remove('show-hint')
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

      // Drag-scroll behavior (mouse + touch) com detecção de intenção horizontal
      let pointerDown = false, startX = 0, startY = 0, startScrollLeft = 0, dragged = false, suppressClick = false, touchDragging = false
      const onPointerDown = (clientX, clientY) => {
        pointerDown = true; dragged = false; touchDragging = false
        track.classList.add('is-dragging')
        startX = clientX; startY = clientY; startScrollLeft = track.scrollLeft
      }
      const onPointerMove = (e) => {
        if (!pointerDown) return
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        // Para toque: só ativa drag se movimento horizontal for predominante
        if (e.pointerType !== 'mouse' && !touchDragging) {
          if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
            if (Math.abs(dx) > Math.abs(dy)) touchDragging = true
            else { // liberar para scroll vertical da página
              pointerDown = false
              track.classList.remove('is-dragging')
              return
            }
          } else {
            return
          }
        }
        // Mouse: considerar drag apenas após um pequeno threshold
        if (e.pointerType === 'mouse' && Math.abs(dx) <= 3) return
        if (Math.abs(dx) > 3) dragged = true
        // Só impedir comportamento padrão quando de fato estiver arrastando
        if (dragged || touchDragging) e.preventDefault()
        if (dragged || touchDragging) track.scrollLeft = startScrollLeft - dx
      }
      const onPointerUp = (e) => {
        pointerDown = false
        track.classList.remove('is-dragging')
        try { if (e?.pointerId != null && e.target && typeof e.target.releasePointerCapture === 'function') e.target.releasePointerCapture(e.pointerId) } catch {}
        if (dragged || touchDragging) {
          suppressClick = true
          setTimeout(() => { suppressClick = false }, 150)
        }
      }
      track.addEventListener('pointerdown', (e) => {
        onPointerDown(e.clientX, e.clientY)
      })
      track.addEventListener('pointermove', (e) => onPointerMove(e))
      track.addEventListener('pointerup', (e) => {
        const wasDragged = dragged || touchDragging
        onPointerUp(e)
        if (!wasDragged && !suppressClick) {
          const card = e.target && (e.target.closest ? e.target.closest('.catalog-card') : null)
          if (card) {
            let index
            if (clickHandlerNamespace === 'catalog' && card.dataset && card.dataset.catalogIndex != null) {
              const n = parseInt(card.dataset.catalogIndex, 10); if (!Number.isNaN(n)) index = n
            } else if (clickHandlerNamespace === 'sustentabilidade' && card.dataset && card.dataset.sustentabilidadeIndex != null) {
              const n = parseInt(card.dataset.sustentabilidadeIndex, 10); if (!Number.isNaN(n)) index = n
            }
            if (index == null) index = buttons.indexOf(card)
            if (index >= 0) openLightbox(index, clickHandlerNamespace)
          }
        }
      })
      track.addEventListener('pointercancel', (e) => onPointerUp(e))
      // Prevent native image drag
      track.querySelectorAll('img').forEach((img) => img.addEventListener('dragstart', (ev) => ev.preventDefault()))
      buttons.forEach((btn, idx) => {
        btn.addEventListener('click', (ev) => {
          if (suppressClick) { ev.preventDefault(); return }
          // Preferir índice semântico vindo do data-* para evitar qualquer divergência
          let index = idx
          if (clickHandlerNamespace === 'catalog' && btn.dataset && btn.dataset.catalogIndex != null) {
            const n = parseInt(btn.dataset.catalogIndex, 10); if (!Number.isNaN(n)) index = n
          } else if (clickHandlerNamespace === 'sustentabilidade' && btn.dataset && btn.dataset.sustentabilidadeIndex != null) {
            const n = parseInt(btn.dataset.sustentabilidadeIndex, 10); if (!Number.isNaN(n)) index = n
          }
          openLightbox(index, clickHandlerNamespace)
        })
      })

      // Fallback: clique no track encontra o botão mais próximo caso o evento de botão tenha sido bloqueado
      track.addEventListener('click', (e) => {
        if (suppressClick) return
        const card = e.target && (e.target.closest ? e.target.closest('.catalog-card') : null)
        if (!card) return
        let index
        if (clickHandlerNamespace === 'catalog' && card.dataset && card.dataset.catalogIndex != null) {
          const n = parseInt(card.dataset.catalogIndex, 10); if (!Number.isNaN(n)) index = n
        } else if (clickHandlerNamespace === 'sustentabilidade' && card.dataset && card.dataset.sustentabilidadeIndex != null) {
          const n = parseInt(card.dataset.sustentabilidadeIndex, 10); if (!Number.isNaN(n)) index = n
        }
        if (index == null) index = buttons.indexOf(card)
        if (index >= 0) openLightbox(index, clickHandlerNamespace)
      })
    }

  initCarousel(catalogTrack, catalogDots, catalogButtons, 'catalog')
  initCarousel(sustTrack, sustDots, sustButtons, 'sustentabilidade')

  // --- Hi-res upscaling pipeline (canvas based) ---
  // Cache for generated object URLs per original src
  const hiresCache = new Map()
  const MAX_LONG_EDGE = 2600 // safety cap for memory
  const DEFAULT_SCALE = 2.0  // aim at 2x linear upscale for zoom
  const MAX_ZOOM = 2.5       // matches gesture max

  function computeTargetLongEdgeForViewport() {
    const vw = Math.max(window.innerWidth || 0, 1)
    const vh = Math.max(window.innerHeight || 0, 1)
    const dpr = Math.max(window.devicePixelRatio || 1, 1)
    // Aim to be crisp up to ~2x zoom of the full viewport
    const desiredZoomCoverage = 2.0
    const base = Math.max(vw, vh) * dpr * Math.min(desiredZoomCoverage, MAX_ZOOM)
    // Cap to MAX_LONG_EDGE to avoid memory spikes
    return Math.min(base, MAX_LONG_EDGE)
  }

  async function loadImage(url) {
    // Prefer createImageBitmap for faster decode if available
    try {
      const resp = await fetch(url)
      const blob = await resp.blob()
      if ('createImageBitmap' in window) {
        const bmp = await createImageBitmap(blob)
        return { bitmap: bmp, width: bmp.width, height: bmp.height, blob }
      }
      // Fallback to HTMLImageElement
      const img = await new Promise((resolve, reject) => {
        const i = new Image()
        i.onload = () => resolve(i)
        i.onerror = reject
        i.src = URL.createObjectURL(blob)
      })
      return { image: img, width: img.naturalWidth || img.width, height: img.naturalHeight || img.height, blob }
    } catch (e) {
      console.warn('Falha ao carregar imagem para upscaling:', e)
      return null
    }
  }

  function getCanvas(w, h) {
    if ('OffscreenCanvas' in window) return new OffscreenCanvas(w, h)
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return c
  }

  function drawSourceToCanvas(ctx, source, sw, sh, dw, dh) {
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    if (source.bitmap) ctx.drawImage(source.bitmap, 0, 0, sw, sh, 0, 0, dw, dh)
    else if (source.image) ctx.drawImage(source.image, 0, 0, sw, sh, 0, 0, dw, dh)
  }

  // Simple 3x3 sharpen convolution to improve perceived detail after upscale
  function applySharpen(ctx, w, h) {
    try {
      const src = ctx.getImageData(0, 0, w, h)
      const dst = ctx.createImageData(w, h)
      const s = src.data
      const d = dst.data
      const ow = w * 4
      // Kernel: 0 -1 0 / -1 5 -1 / 0 -1 0
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = (y * w + x) * 4
          for (let c = 0; c < 3; c++) {
            const v = (
              - s[((y - 1) * w + x) * 4 + c]
              - s[(y * w + (x - 1)) * 4 + c]
              + 5 * s[i + c]
              - s[(y * w + (x + 1)) * 4 + c]
              - s[((y + 1) * w + x) * 4 + c]
            )
            d[i + c] = v < 0 ? 0 : v > 255 ? 255 : v
          }
          d[i + 3] = s[i + 3]
        }
      }
      ctx.putImageData(dst, 0, 0)
    } catch (e) {
      // Fail silently if image data is not accessible (tainted) or memory issues
      console.warn('Sharpen falhou, seguindo sem nitidez extra:', e)
    }
  }

  async function buildHiRes(url, targetLongEdge) {
    const loaded = await loadImage(url)
    if (!loaded) return null
    const { width: sw, height: sh } = loaded
    if (!sw || !sh) return null
    const longSrc = Math.max(sw, sh)
    // Compute target scale so that the upscaled image long edge >= targetLongEdge (if provided)
    const desiredLong = Math.max(targetLongEdge || 0, longSrc * DEFAULT_SCALE)
    const target = Math.min(desiredLong, MAX_LONG_EDGE)
    const scale = Math.max(1, target / Math.max(1, longSrc))
    const dw = Math.max(1, Math.round(sw * scale))
    const dh = Math.max(1, Math.round(sh * scale))
    const canvas = getCanvas(dw, dh)
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return null
    drawSourceToCanvas(ctx, loaded, sw, sh, dw, dh)
    // Light sharpen for clarity
    applySharpen(ctx, dw, dh)
    const blob = await new Promise((resolve) => {
      // Prefer WebP if supported by browser; fall back to JPEG
      const toBlobCb = (b) => resolve(b)
      try {
        // Try webp
        canvas.convertToBlob ? canvas.convertToBlob({ type: 'image/webp', quality: 0.9 }).then(resolve).catch(() => {
          if ('toBlob' in canvas) canvas.toBlob(toBlobCb, 'image/jpeg', 0.92)
          else resolve(null)
        }) : (canvas.toBlob ? canvas.toBlob(toBlobCb, 'image/jpeg', 0.92) : resolve(null))
      } catch {
        if ('toBlob' in canvas) canvas.toBlob(toBlobCb, 'image/jpeg', 0.92)
        else resolve(null)
      }
    })
    if (!blob) return null
    const objectUrl = URL.createObjectURL(blob)
    return { url: objectUrl, width: dw, height: dh }
  }

  async function tryUpgradeToHiRes(src, targetLongEdge) {
    // Already upgraded or in cache?
    if (!lightboxImg) return
    if (hiresCache.has(src)) {
      const cached = hiresCache.get(src)
      if (cached && typeof cached === 'string') {
        lightboxImg.src = cached
        return
      }
    }
    // Avoid race conditions: keep track of last requested src
    const requestedFor = src
    lightboxImg.dataset.requestedSrc = requestedFor
    // Small delay to avoid doing work if user quickly navigates to next/prev
    await new Promise((r) => setTimeout(r, 60))
    if (lightboxImg.dataset.requestedSrc !== requestedFor) return
    const hi = await buildHiRes(src, targetLongEdge)
    if (hi && lightboxImg.dataset.requestedSrc === requestedFor) {
      hiresCache.set(src, hi.url)
      lightboxImg.src = hi.url
      // Se estamos usando canvas agora, atualiza a fonte para a versão hi-res
      if (lightboxCanvas && lightboxCanvas.style.display !== 'none') {
        prepareCanvasSource(hi.url)
      }
    }
  }

  // -------- Canvas-based redraw at every zoom/pan (preserve quality) --------
  async function prepareCanvasSource(url) {
    if (!lightboxCanvas) return
    // Keep IMG visible as fallback until the canvas source is ready
    // Load original as ImageBitmap if possible
    try {
      const loaded = await loadImage(url)
      originalBitmap = loaded?.bitmap || loaded?.image || null
      if (originalBitmap) {
        lightboxCanvas.style.display = 'block'
        if (lightboxImg) lightboxImg.style.display = 'none'
        renderCanvas()
      }
    } catch (e) {
      console.warn('Canvas source load failed:', e)
      // Fallback to IMG transforms
      lightboxCanvas.style.display = 'none'
      if (lightboxImg) lightboxImg.style.display = 'block'
    }
  }

  function renderCanvas() {
    if (!lightboxCanvas || !originalBitmap) return
    const ctx = lightboxCanvas.getContext('2d')
    if (!ctx) return
    // Fit canvas to viewport at device pixel ratio for sharpness
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const vw = Math.max(1, lightboxCanvas.clientWidth || lightboxCanvas.parentElement?.clientWidth || window.innerWidth)
    const vh = Math.max(1, lightboxCanvas.clientHeight || lightboxCanvas.parentElement?.clientHeight || window.innerHeight)
    const cw = Math.floor(vw * dpr)
    const ch = Math.floor(vh * dpr)
    if (lightboxCanvas.width !== cw || lightboxCanvas.height !== ch) {
      lightboxCanvas.width = cw
      lightboxCanvas.height = ch
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, cw, ch)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Compute image box to contain inside canvas at base scale=1
    const iw = originalBitmap.width
    const ih = originalBitmap.height
    const scaleToFit = Math.min(cw / iw, ch / ih)
    const baseW = iw * scaleToFit
    const baseH = ih * scaleToFit
    const cx = cw / 2
    const cy = ch / 2

    // Apply current scale and pan (pan in CSS px -> multiply by dpr)
    const px = panX * dpr
    const py = panY * dpr
    const drawW = baseW * scale
    const drawH = baseH * scale
    const dx = cx - drawW / 2 + px
    const dy = cy - drawH / 2 + py
    ctx.drawImage(originalBitmap, 0, 0, iw, ih, dx, dy, drawW, drawH)

    // Guardar geometria da última pintura em coordenadas CSS (não DPR)
    lastCanvasGeom = { x: dx / dpr, y: dy / dpr, w: drawW / dpr, h: drawH / dpr }
  }

  // Gestos na imagem/canvas do lightbox: swipe, pinch‑to‑zoom e pan
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
    const getActiveSurfaceSize = () => {
      const el = (lightboxCanvas && lightboxCanvas.style.display !== 'none') ? lightboxCanvas : lightboxImg
      const rect = el.getBoundingClientRect()
      return { w: rect.width, h: rect.height }
    }
    const maxPan = () => {
      const { w, h } = getActiveSurfaceSize()
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

    function attachZoomListeners(targetEl) {
      if (!targetEl) return
      targetEl.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        lastPointerType = e.pointerType || 'mouse'
        updatePointer(e)
        if (pointers.size === 1 && scale > 1) {
          startPanX = panX
          startPanY = panY
          startClientX = e.clientX
          startClientY = e.clientY
          isPanning = true
          panMovedSinceDown = false
          return
        }
        lbDown(e.clientX)
        try { if (e.pointerId != null) targetEl.setPointerCapture(e.pointerId) } catch {}
        if (pointers.size === 2) {
          const it = Array.from(pointers.values())
          pinchStartDist = distance(it[0], it[1])
          pinchBaseScale = scale
        }
      })

      let rafPending = false
      const scheduleTransform = () => { if (rafPending) return; rafPending = true; requestAnimationFrame(() => { applyTransform(); rafPending = false }) }

      targetEl.addEventListener('pointermove', (e) => {
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
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) panMovedSinceDown = true
          const { maxX, maxY } = maxPan()
          panX = clamp(startPanX + dx, -maxX, maxX)
          panY = clamp(startPanY + dy, -maxY, maxY)
          scheduleTransform()
          e.preventDefault(); return
        }
        if (scale === 1) lbMove(e.clientX, e)
      })

      targetEl.addEventListener('pointerup', (e) => {
        removePointer(e)
        try { if (e.pointerId != null) targetEl.releasePointerCapture(e.pointerId) } catch {}
        isPanning = false
        if (pointers.size === 0) {
          if (scale <= 1.02) { resetTransform() } else { applyTransform() }
          baseScale = scale
          scheduleTransform()
        }
        if (scale === 1) lbUp(e.clientX)
      })
      targetEl.addEventListener('pointercancel', (e) => { removePointer(e); lbPointerDown = false })

      // Fallback Touch (iOS antigos) – apenas para swipe quando sem zoom
      targetEl.addEventListener('touchstart', (e) => { if (scale === 1) lbDown(e.touches[0].clientX) }, { passive: false })
      targetEl.addEventListener('touchmove', (e) => { if (scale === 1) lbMove(e.touches[0].clientX, e) }, { passive: false })
      targetEl.addEventListener('touchend', (e) => { if (scale === 1) { const t = e.changedTouches && e.changedTouches[0]; lbUp(t ? t.clientX : lbStartX) } })

      // Duplo toque / double-tap para zoom in/out
      // Double click / double tap to zoom (2 clicks)
      targetEl.addEventListener('click', (e) => {
        // Prevent bubbling to the lightbox backdrop click handler
        e.stopPropagation()
        // Se é o canvas e clicou fora da área desenhada, fechar
        if (targetEl === lightboxCanvas && lastCanvasGeom) {
          const rect = targetEl.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const inside = (
            x >= lastCanvasGeom.x &&
            y >= lastCanvasGeom.y &&
            x <= lastCanvasGeom.x + lastCanvasGeom.w &&
            y <= lastCanvasGeom.y + lastCanvasGeom.h
          )
          if (!inside) { closeLightbox(); return }
        }
        if (panMovedSinceDown) { panMovedSinceDown = false; return }
        if (lastPointerType === 'mouse') { toggleZoom(); return }
        const now = Date.now()
        if (now - lastClick < 320) toggleZoom()
        lastClick = now
      })
    }

    // Shared double-click state across surfaces
    let lastClick = 0
    let lastPointerType = 'mouse'
    const toggleZoom = () => {
      if (scale === 1) { scale = 2; panX = 0; panY = 0 }
      else { resetTransform() }
      applyTransform()
    }
    // Flag para saber se houve movimento de pan antes do clique final
    let panMovedSinceDown = false

    // Attach handlers for both IMG and CANVAS surfaces
    attachZoomListeners(lightboxImg)
    if (lightboxCanvas) attachZoomListeners(lightboxCanvas)
  }

  // Close controls (backdrop, buttons & keys)
  if (btnClose) btnClose.addEventListener('click', closeLightbox)
  if (btnNext) btnNext.addEventListener('click', showNext)
  if (btnPrev) btnPrev.addEventListener('click', showPrev)
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      const img = lightboxImg
      const canvas = lightboxCanvas
      if (!img) return
      if (e.target === lightbox) { closeLightbox(); return }
      // Clicking inside wrapper but NOT on image (wrapper has pointer-events:none normally)
      if (
        e.target !== img && !img.contains(e.target) &&
        e.target !== canvas && !(canvas && canvas.contains(e.target))
      ) closeLightbox()
    })
  }
  window.addEventListener('keydown', (e) => {
    const isOpen = lightbox && lightbox.getAttribute('aria-hidden') === 'false'
    if (!isOpen) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') showNext()
    if (e.key === 'ArrowLeft') showPrev()
  })

  // Re-render canvas on viewport changes for crispness
  const rerenderIfOpen = () => {
    const isOpen = lightbox && lightbox.getAttribute('aria-hidden') === 'false'
    if (!isOpen) return
    if (lightboxCanvas && originalBitmap) renderCanvas()
  }
  window.addEventListener('resize', rerenderIfOpen)
  window.addEventListener('orientationchange', rerenderIfOpen)

  // Revoke cached object URLs on page unload to free memory
  window.addEventListener('beforeunload', () => {
    for (const v of hiresCache.values()) {
      try { URL.revokeObjectURL(v) } catch {}
    }
    hiresCache.clear()
  })
}


