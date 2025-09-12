<template>
  <div>
    <header class="site-header" id="topo">
      <div class="container header-wrap">
        <a href="#topo" class="brand" aria-label="Super Sopro - início">
          <img src="../assets/logo.png" alt="Logo Super Sopro" class="brand__logo" />
          <span class="brand__name">Super Sopro</span>
        </a>

        <nav class="nav" aria-label="Navegação principal">
          <button class="nav__toggle" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
          <ul id="menu" class="nav__list">
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#produtos">Produtos Eco</a></li>
            <li><a href="#compromisso">Compromisso</a></li>
            <li><a href="#pontos">Pontos</a></li>
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#contato">Contato</a></li>
            <li class="nav__brand">
              <a href="#topo" aria-label="Voltar ao topo">
                <img src="../assets/logo.png" alt="Logo Super Sopro" />
                <span>Super Sopro</span>
              </a>
              <div class="nav__copyright">
                <span>Todos os direitos reservados.</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section class="hero section" aria-label="Apresentação">
        <picture>
          <img src="../assets/foto4.jpg" alt="Imagem de embalagens sustentáveis" class="hero__bg" />
        </picture>
        <div class="container hero__content reveal-on-scroll">
          <h1 class="hero__title">Plástico com responsabilidade</h1>
          <p class="hero__subtitle">Fábrica de embalagens com foco em soluções biodegradáveis e sustentáveis.</p>
          <div class="hero__cta">
            <a class="btn btn--primary" href="#contato">Fale conosco</a>
            <a class="btn btn--ghost" href="#processos">Ver vídeos</a>
          </div>
        </div>
      </section>

      <!-- Sobre -->
      <section id="sobre" class="section section--light">
        <div class="container grid grid--2col">
          <div class="reveal-on-scroll">
            <h2 class="section__title">Sobre a Empresa</h2>
            <p class="lead"><strong>Super Sopro Embalagens</strong> está presente no mercado há aproximadamente 40 anos. Nossa fábrica é composta por máquinas de sopro, onde produzimos embalagens plásticas em PEAD.</p>
            <p>Após muitas mudanças, hoje estamos com uma nova gestão, mais humanizada e com foco no futuro do nosso planeta.</p>
            <p>Nossa missão é conscientizar a sociedade sobre o consumo sustentável e a importância da preservação, estendendo esse impacto para a cidade, o estado e o mundo.</p>
          </div>
          <div class="gallery reveal-on-scroll">
            <img src="../assets/foto12.jpg" alt="Produção de frascos" />
            <img src="../assets/foto10.jpg" alt="Linha de produção" />
            <img src="../assets/foto3.jpg" alt="Estoque de embalagens"/>
          </div>
        </div>
        <div class="container reveal-on-scroll">
          <div class="grid grid--2col videos">
            <figure class="video-card">
              <div class="video-frame">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&rel=0&modestbranding=1&list=RDdQw4w9WgXcQ&start_radio=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <figcaption>Apresentação da empresa</figcaption>
            </figure>
            <figure class="video-card">
              <div class="video-frame">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&rel=0&modestbranding=1&list=RDdQw4w9WgXcQ&start_radio=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <figcaption>Tour pela fábrica</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- Produtos Eco -->
      <section id="produtos" class="section section--brand">
        <div class="container narrow reveal-on-scroll">
          <h2 class="section__title">Produtos Eco Sustentáveis</h2>
          <p>Nossos produtos biodegradáveis, derivados de fontes renováveis, orgânicas e sustentáveis, não geram microplásticos. Eles simplesmente oxidam e se desintegram, permanecendo na atmosfera apenas água, CO2 e biomassa.</p>
        </div>
      </section>

      <!-- Compromisso Ambiental -->
      <section id="compromisso" class="section section--image-bg">
        <img src="../assets/foto6.jpg" alt="Natureza e embalagens" class="section__bg" />
        <div class="container narrow reveal-on-scroll">
          <h2 class="section__title">Compromisso Ambiental</h2>
          <p>Nosso maior compromisso é causar o menor impacto possível ao meio ambiente. Sabemos que a produção de plástico é uma das maiores causadoras de poluição. Por isso, renovamos e implementamos a produção de plástico biodegradável, que pode ser aplicada em 100% dos nossos frascos.</p>
        </div>
      </section>

      <!-- Principais Pontos -->
      <section id="pontos" class="section section--dark">
        <div class="container narrow reveal-on-scroll">
          <h2 class="section__title">Principais Pontos</h2>
          <ul class="checklist">
            <li><strong>Material sustentável:</strong> orgânico e de fontes renováveis.</li>
            <li><strong>Certificações:</strong> conforme a norma ASTM D6954-18, garantindo degradabilidade e ecotoxicidade.</li>
            <li><strong>Biodegradação:</strong> transforma plásticos em água, CO2 e biomassa, sem gerar microplásticos.</li>
            <li><strong>Facilidade de uso:</strong> integração nos processos existentes, sem alterar fórmula ou maquinário.</li>
            <li><strong>Segurança:</strong> atóxico e seguro para consumidores e meio ambiente.</li>
            <li><strong>Produção nacional:</strong> fabricado no Brasil, reduzindo custos operacionais e logísticos.</li>
          </ul>
        </div>
      </section>

      <!-- Processos e Qualidade (4 vídeos) -->
      <section id="processos" class="section section--light">
        <div class="container reveal-on-scroll">
          <h2 class="section__title">Processos e Qualidade</h2>
          <div class="grid grid--4col videos">
            <figure class="video-card">
              <div class="video-frame">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&rel=0&modestbranding=1&list=RDdQw4w9WgXcQ&start_radio=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <figcaption>
                <h3>Formatos e cores</h3>
                <p>Qualidade com a paleta que você precisa, nos formatos que seu produto exige.</p>
              </figcaption>
            </figure>

            <figure class="video-card">
              <div class="video-frame">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&rel=0&modestbranding=1&list=RDdQw4w9WgXcQ&start_radio=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <figcaption>
                <h3>Moagem</h3>
                <p>Produtos com defeito não são descartados: seguem para a moagem, reciclando 100% da matéria‑prima virgem.</p>
              </figcaption>
            </figure>

            <figure class="video-card">
              <div class="video-frame">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&rel=0&modestbranding=1&list=RDdQw4w9WgXcQ&start_radio=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <figcaption>
                <h3>Processo por sopro</h3>
                <p>Moldagem por sopro para recipientes: aquecer o tubo de plástico e insuflar ar comprimido.</p>
              </figcaption>
            </figure>

            <figure class="video-card">
              <div class="video-frame">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&rel=0&modestbranding=1&list=RDdQw4w9WgXcQ&start_radio=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <figcaption>
                <h3>Testes de produtos</h3>
                <p>Medições por item, ensaios de resistência e testes de queda para validar cada produto.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- Catálogo -->
      <section id="catalogo" class="section section--light">
        <div class="container reveal-on-scroll">
          <h2 class="section__title">Catálogo</h2>
          <div id="catalogTrack" class="grid catalog-grid" aria-label="Páginas do catálogo">
            <button class="catalog-card" type="button" data-catalog-index="0" aria-label="Abrir página 1 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 1 do catálogo" loading="lazy" />
            </button>
            <button class="catalog-card" type="button" data-catalog-index="1" aria-label="Abrir página 2 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 2 do catálogo" loading="lazy" />
            </button>
            <button class="catalog-card" type="button" data-catalog-index="2" aria-label="Abrir página 3 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 3 do catálogo" loading="lazy" />
            </button>
            <button class="catalog-card" type="button" data-catalog-index="3" aria-label="Abrir página 4 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 4 do catálogo" loading="lazy" />
            </button>
            <button class="catalog-card" type="button" data-catalog-index="4" aria-label="Abrir página 5 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 5 do catálogo" loading="lazy" />
            </button>
            <button class="catalog-card" type="button" data-catalog-index="5" aria-label="Abrir página 6 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 6 do catálogo" loading="lazy" />
            </button>
            <button class="catalog-card" type="button" data-catalog-index="6" aria-label="Abrir página 7 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 7 do catálogo" loading="lazy" />
            </button>
            <button class="catalog-card" type="button" data-catalog-index="7" aria-label="Abrir página 8 do catálogo">
              <img src="../assets/foto1.jpg" alt="Página 8 do catálogo" loading="lazy" />
            </button>
          </div>
          <div class="carousel-dots" id="catalogDots" aria-hidden="false"></div>
        </div>
      </section>

      
    </main>

    <!-- Lightbox do Catálogo -->
    <div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Visualização do catálogo">
      <div class="lightbox__img-wrap">
        <img class="lightbox__img" id="lightboxImg" alt="Página ampliada do catálogo" />
        <button class="lightbox__btn lightbox__close" id="lightboxClose" aria-label="Fechar">✕</button>
        <button class="lightbox__btn lightbox__prev" id="lightboxPrev" aria-label="Anterior">‹</button>
        <button class="lightbox__btn lightbox__next" id="lightboxNext" aria-label="Próxima">›</button>
      </div>
    </div>

    <section id="contato" class="section contact">
      <div class="container reveal-on-scroll">
        <h2 class="section__title">Contato</h2>
        <div class="grid grid--2col contact-grid">
        <ul class="contact__list" role="list">
          <li>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
            <a href="mailto:vendas@supersopro.com.br">vendas@supersopro.com.br</a>
          </li>
          <li>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.1a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/></svg>
            <a href="https://www.instagram.com/supersopro" target="_blank" rel="noopener">@supersopro</a>
          </li>
          <li>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 7.5c-.5.2-1 .3-1.6.4a3.1 3.1 0 0 0 1.4-1.7c-.6.4-1.2.6-1.9.8A3.1 3.1 0 0 0 12 9v.7A7.9 7.9 0 0 1 4.1 6s-3 6.8 3.8 9.8c-.9.6-2 .8-3.1.7 4.7 2.6 10.2 0 10.2-6.1 0-.1 0-.3-.01-.4A4.4 4.4 0 0 0 21 7.5Z"/></svg>
            <a href="https://www.tiktok.com/@super.sopro" target="_blank" rel="noopener">@super.sopro</a>
          </li>
          <li>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 6.1 7 13 7 13s7-6.9 7-13c0-3.9-3.1-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>
            <span>Parque Industrial, S/N – Bloco 02, Itaí – SP</span>
          </li>
        </ul>
        <div class="map-frame">
          <iframe
            src="https://www.google.com/maps?q=Parque%20Industrial%2C%20S%2FN%20%E2%80%93%20Bloco%2002%2C%20Ita%C3%AD%20-%20SP&hl=pt-BR&z=15&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer-wrap">
        <div class="footer-mobile-stack">
          <div class="footer-copyright">© <span id="year"></span> Super Sopro Embalagens</div>
          <div class="footer-reserved">Todos os direitos reservados.</div>
          <div class="footer-bartech">Desenvolvido por <a href="https://bartechsoftware.com.br/" target="_blank" rel="noopener">Bartech</a></div>
        </div>
        <div class="footer-desktop">
          <div class="footer-left">
            <img src="../assets/logo.png" alt="Logo Super Sopro" />
          </div>
          <div class="footer-center">
            <p class="footer-copyright">© <span id="year"></span> Super Sopro Embalagens. Todos os direitos reservados.</p>
          </div>
          <div class="footer-right">
            <small class="footer-bartech">Desenvolvido por <a href="https://bartechsoftware.com.br/" target="_blank" rel="noopener">Bartech</a></small>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


