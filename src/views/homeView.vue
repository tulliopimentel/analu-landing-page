<template>
  <div class="landing-page">
    <nav class="main-nav" :class="{ 'is-scrolled': isScrolled }">
      <div class="nav-container">
        <a href="#" class="nav-brand">Ana Luiza Pucca</a>
        
        <button class="hamburger-button" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }" aria-label="Menu">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        
        <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
          <ul>
            <li><a href="#sobre" @click="closeMenu">Sobre</a></li>
            <li><a href="#servicos" @click="closeMenu">Serviços</a></li>
            <li><a href="#temas" @click="closeMenu">Temas</a></li>
            <li><a href="#depoimentos" @click="closeMenu">Depoimentos</a></li>
            <li><a href="#contato" @click="closeMenu" class="nav-cta">Contato</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
    <header class="hero-section">
      <div class="hero-content">
        <div class="text-content">
          <h1 class="animate-on-scroll">Conexões que Constroem. Conversas que Transformam.</h1>
          <p class="animate-on-scroll delay-1">Leve para sua equipe uma nova perspectiva sobre liderança, cultura e inovação através de palestras e mentorias que inspiram a ação.</p>
          <a href="#contato" class="cta-button animate-on-scroll">Agende uma Conversa</a>
        </div>
        <div class="image-content">
          <img src="../assets/foto5.png" alt="Foto da Palestrante" class="speaker-image animate-on-scroll delay-3">
          <div class="background-shape"></div>
        </div>
      </div>
    </header>

    <main>
      <section id="sobre" class="about-section">
        <div class="container">
          <div class="about-content">
            <div class="about-image">
              <img src="../assets/foto3.png" alt="Palestrante em ação">
            </div>
            <div class="about-text">
              <h2 class="section-title">Sobre Mim</h2>
              <h3>Meia década dedicada a despertar o potencial humano nas organizações.</h3>
              <p>Com mais de 5 anos de experiência em desenvolvimento de lideranças e cultura organizacional, minha paixão é criar ambientes onde a comunicação flui e as pessoas prosperam. Acredito que equipes engajadas são o motor para a inovação e o sucesso sustentável. Minha jornada passou por [mencione 1 ou 2 empresas/experiências relevantes], e hoje, como palestrante e mentora, meu objetivo é simples: equipar seus líderes e equipes com as ferramentas para um futuro mais colaborativo e humano.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" class="services-section">
        <div class="container">
          <h2 class="section-title text-center">Como Posso Ajudar</h2>
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon"><i class="fas fa-microphone-alt"></i></div>
              <h4>Palestras de Impacto</h4>
              <p>Keynotes e palestras energizantes que abrem mentes e inspiram novas formas de pensar e agir no ambiente de trabalho.</p>
            </div>
            <div class="service-card">
              <div class="service-icon"><i class="fas fa-users"></i></div>
              <h4>Rodas de Conversa</h4>
              <p>Mediação de conversas estratégicas e rodas de diálogo para resolver conflitos, alinhar visões e fortalecer a cultura da empresa.</p>
            </div>
            <div class="service-card">
              <div class="service-icon"><i class="fas fa-hands-helping"></i></div>
              <h4>Mentoria Executiva</h4>
              <p>Sessões individuais ou em grupo para líderes que buscam aprimorar suas habilidades de gestão e liderança humanizada.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="temas" class="topics-section">
        <div class="container">
          <h2 class="section-title">Temas em Destaque</h2>
          <div class="topics-accordion">
            <div class="topic-item" v-for="(topic, index) in topics" :key="index" @click="toggleTopic(index)">
              <div class="topic-header">
                <h3>{{ topic.title }}</h3>
                <span class="topic-icon">{{ activeTopic === index ? '-' : '+' }}</span>
              </div>
              <div class="topic-content" :class="{ 'active': activeTopic === index }">
                <p>{{ topic.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos" class="testimonials-section">
        <div class="container">
          <h2 class="section-title text-center">O que meus clientes dizem</h2>
          <div class="testimonial-card">
            <blockquote>
              "A palestra da Ana Luiza Pucca foi um divisor de águas para nossa equipe. A abordagem sobre comunicação não-violenta trouxe resultados imediatos na colaboração entre os times."
            </blockquote>
            <cite>
              <img src="https://i.pravatar.cc/80?img=1" alt="Foto do Cliente">
              <div>
                <strong>Ana Silva</strong>
                <span>Diretora de RH na Empresa XPTO</span>
              </div>
            </cite>
          </div>
          <div class="client-logos">
            <p>Empresas que já confiaram no meu trabalho:</p>
            <div class="logos-slider">
               <img src="https://cdn.worldvectorlogo.com/logos/google-2015.svg" alt="Logo Cliente Google">
               <img src="https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" alt="Logo Cliente Microsoft">
               <img src="https://cdn.worldvectorlogo.com/logos/amazon-2.svg" alt="Logo Cliente Amazon">
               <img src="https://cdn.worldvectorlogo.com/logos/netflix-2.svg" alt="Logo Cliente Netflix">
               <img src="https://cdn.worldvectorlogo.com/logos/spotify-1.svg" alt="Logo Cliente Spotify">
            </div>
          </div>
        </div>
      </section>
      
      <section id="videos" class="video-section">
        <div class="container">
          <h2 class="section-title text-center">Veja em Ação</h2>
          <div class="video-player-wrapper">
             <iframe 
               width="560" 
               height="315" 
               src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
               title="YouTube video player" 
               frameborder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowfullscreen>
             </iframe>
          </div>
        </div>
      </section>

      <section id="contato" class="cta-contact-section">
        <div class="container">
          <div class="cta-box">
            <h2>Vamos conversar sobre o futuro da sua equipe?</h2>
            <p>Estou pronta para entender suas necessidades e desenhar uma experiência única para sua empresa. Clique no botão abaixo e vamos iniciar essa conversa.</p>
            <a href="mailto:seuemail@exemplo.com?subject=Interesse em Palestra" class="cta-button-final">Solicite um Orçamento</a>
          </div>
          <div class="contact-info">
            <p>Ou me encontre nas redes:</p>
            <div class="social-links">
              <a href="#" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="#" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="mailto:seuemail@exemplo.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer class="footer">
        <p>© {{ new Date().getFullYear() }} Ana Luiza Pucca. Todos os direitos reservados.</p>
    </footer>
    
  </div>
</template>

<script>
export default {
  name: 'PalestranteLandingPage',
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false, 
      activeTopic: 0, 
      topics: [
        {
          title: 'Liderança Humanizada na Era Digital',
          description: 'Como liderar com empatia e autenticidade, mantendo a alta performance em equipes remotas e híbridas. Ferramentas práticas para uma gestão que inspira e retém talentos.'
        },
        {
          title: 'Comunicação Não-Violenta no Ambiente Corporativo',
          description: 'Técnicas para transformar o diálogo, reduzir conflitos e criar um ambiente de segurança psicológica onde o feedback construtivo floresce.'
        },
        {
          title: 'Cultura de Inovação e Intraempreendedorismo',
          description: 'Como estimular a mentalidade criativa e proativa na sua equipe, transformando colaboradores em verdadeiros donos do negócio e impulsionando a inovação de dentro para fora.'
        },
        {
            title: 'Resiliência e Gestão do Estresse',
            description: 'Estratégias para construir equipes mais resilientes, capazes de navegar por mudanças e pressões com inteligência emocional e bem-estar.'
        }
      ]
    };
  },
  methods: {
    toggleTopic(index) {
      this.activeTopic = this.activeTopic === index ? null : index;
    },
    handleScrollAnimation() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(el => {
        observer.observe(el);
      });
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    handleScroll() {
        this.isScrolled = window.scrollY > 50;
    }
  },
  mounted() {
    this.handleScrollAnimation();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Playfair+Display:wght@700;800&display=swap');

html {
  scroll-behavior: smooth;
}
.hero-section {
    padding-top: 80px; 
}

/* ========== ESTILOS DO MENU (COM AJUSTES) ========== */

.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
  background-color: #ffffff; 
  box-shadow: 0 2px 15px rgba(0,0,0,0.05); 
}
.main-nav.is-scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.nav-brand {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-primary);
  text-decoration: none;
}
.nav-links ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}
.nav-links a {
  color: var(--color-dark);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding-bottom: 5px;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-secondary);
  transition: width 0.3s ease;
}
.nav-links a:hover::after {
  width: 100%;
}
.nav-links a.nav-cta {
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
}
.nav-links a.nav-cta:hover {
  background-color: var(--color-secondary);
  color: var(--color-light);
}
.nav-links a.nav-cta::after {
  display: none;
}


/* --- LÓGICA DOS ÍCONES CORRIGIDA --- */
.hamburger-button {
  display: none;
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1001;
}
.hamburger-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 24px;
  transform: translate(-50%, -50%);
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  position: absolute;
  left: 0;
  width: 30px;
  height: 3px;
  background-color: #000;
  border-radius: 3px;
  transition: transform 0.3s ease, top 0.3s ease, bottom 0.3s ease, background-color 0.2s ease;
}
.hamburger-inner {
  top: 50%;
  transform: translateY(-50%);
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: '';
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}
.hamburger-button.is-active .hamburger-inner {
  background-color: transparent;
}
.hamburger-button.is-active .hamburger-inner::before {
  top: 0;
  transform: rotate(45deg);
}
.hamburger-button.is-active .hamburger-inner::after {
  bottom: 0;
  transform: rotate(-45deg);
}


/* Estilos do Menu Mobile */
@media (max-width: 992px) {
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: #ffffff; 
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-links.is-open {
    transform: translateX(0);
  }
  .nav-links ul {
    flex-direction: column;
    gap: 2.5rem;
  }
  .nav-links a {
    color: var(--color-primary); 
    font-size: 1.5rem;
  }
  .nav-links a.nav-cta {
    background-color: var(--color-secondary);
    color: var(--color-light);
  }
  .hamburger-button {
    display: block;
  }
}

/* ========== RESTANTE DO CSS ========== */

.landing-page {
  /* --- DEFINIÇÃO DAS VARIÁVEIS DE FONTE E COR --- */
  --font-primary: 'Playfair Display', serif;
  --font-secondary: 'Montserrat', sans-serif;
  
  --color-primary: #5F4B8B;   /* Roxo sofisticado */
  --color-secondary: #E69A8D; /* Coral/Terracota suave para CTAs */
  --color-dark: #333333;      /* Cinza escuro para textos */
  --color-light: #FFFFFF;     /* Branco puro */
  --color-background: #F9F9F9;/* Branco suave para o fundo */

  background-color: var(--color-background);
  color: var(--color-dark);
  font-family: var(--font-secondary);
  overflow-x: hidden;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-family: var(--font-primary);
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
  font-weight: 800;
}

.text-center {
  text-align: center;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.animate-on-scroll.delay-1 { transition-delay: 0.2s; }
.animate-on-scroll.delay-2 { transition-delay: 0.4s; }
.animate-on-scroll.delay-3 { transition-delay: 0.6s; }


.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-background) 60%, var(--color-primary) 60%);
  padding: 4rem 0;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.text-content {
  max-width: 45%;
  z-index: 2;
}

.text-content h1 {
  font-family: var(--font-primary);
  font-size: 3.5rem;
  line-height: 1.2;
  color: var(--color-dark);
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.text-content p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;
}

.cta-button {
  background-color: var(--color-secondary);
  color: var(--color-light);
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-block;
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.image-content {
  position: relative;
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.speaker-image {
  max-width: 100%;
  height: auto;
  max-height: 80vh;
  z-index: 1;
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));
}

.background-shape {
  position: absolute;
  width: 120%;
  height: 120%;
  background-color: rgba(230, 154, 141, 0.6); 
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  z-index: 0;
  animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
  0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 60% 40% 50% 50% / 40% 60% 40% 60%; }
  100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

.about-section {
    padding: 4rem 0;
}
.about-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
    align-items: center;
}
.about-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: -20px -20px 0 0 var(--color-primary);
}
.about-text h3 {
    font-family: var(--font-primary);
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
}
.about-text p {
    line-height: 1.8;
}

.services-section {
  padding: 4rem 0;
  background-color: var(--color-light);
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.service-card {
  background: var(--color-background);
  padding: 2.5rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
.service-icon {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}
.service-card h4 {
  font-family: var(--font-primary);
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.topics-section {
  padding: 4rem 0;
}
.topics-accordion {
  max-width: 800px;
  margin: 0 auto;
}
.topic-item {
  background: var(--color-light);
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  cursor: pointer;
  overflow: hidden;
}
.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
}
.topic-header h3 {
  font-family: var(--font-primary);
  font-size: 1.2rem;
  margin: 0;
}
.topic-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
}
.topic-content {
  max-height: 0;
  transition: max-height 0.5s ease-out, padding 0.5s ease;
}
.topic-content.active {
  max-height: 200px;
  transition: max-height 0.5s ease-in;
}
.topic-content p {
  padding: 0 1.5rem 1.5rem 1.5rem;
  margin: 0;
  line-height: 1.7;
}

.testimonials-section {
  padding: 4rem 0;
  background-color: var(--color-light);
}
.testimonial-card {
  background: var(--color-primary);
  color: var(--color-light);
  padding: 3rem;
  border-radius: 15px;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  position: relative;
}
.testimonial-card::before {
  content: '“';
  font-family: serif;
  font-size: 8rem;
  position: absolute;
  top: -1rem;
  left: 1rem;
  color: rgba(255, 255, 255, 0.1);
}
.testimonial-card blockquote {
  font-size: 1.3rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0 0 2rem 0;
  border: none;
}
.testimonial-card cite {
  display: flex;
  align-items: center;
  font-style: normal;
}
.testimonial-card cite img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 2px solid var(--color-secondary);
}
.testimonial-card cite strong {
  display: block;
}
.client-logos {
  text-align: center;
  margin-top: 4rem;
}
.client-logos p {
    margin-bottom: 2rem;
    font-weight: 500;
    color: #555;
}
.logos-slider {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
}
.logos-slider img {
    height: 35px;
    opacity: 0.6;
    transition: opacity 0.3s ease;
}
.logos-slider img:hover {
    opacity: 1;
}

.video-section {
    padding: 4rem 0;
}
.video-player-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 1000px;
    margin: auto;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
.video-player-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.cta-contact-section {
  padding: 4rem 0;
  background-color: var(--color-dark);
  color: var(--color-light);
  text-align: center;
}
.cta-box {
  background: var(--color-primary);
  padding: 4rem;
  border-radius: 15px;
  max-width: 900px;
  margin: 0 auto 3rem auto;
}
.cta-box h2 {
  font-family: var(--font-primary);
  font-size: 2.2rem;
  margin-bottom: 1rem;
}
.cta-box p {
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: 0.9;
}
.cta-button-final {
  background-color: var(--color-secondary);
  color: var(--color-light);
  padding: 1rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-block;
  font-size: 1.1rem;
}
.cta-button-final:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
.contact-info p {
  margin-bottom: 1rem;
}
.social-links a {
  color: var(--color-light);
  font-size: 1.8rem;
  margin: 0 1rem;
  transition: color 0.3s ease, transform 0.3s ease;
}
.social-links a:hover {
  color: var(--color-secondary);
  transform: scale(1.2);
}

.footer {
  text-align: center;
  padding: 2rem 0;
  background-color: #111;
  color: #888;
}

/* Responsividade */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  .text-content {
    max-width: 100%;
    margin-bottom: 3rem;
  }
  .image-content {
    width: 100%;
  }
  .speaker-image {
    max-height: 60vh;
  }
  .about-content {
    grid-template-columns: 1fr;
  }
  .about-image {
      margin-bottom: 2rem;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  /* --- CORREÇÃO APLICADA AQUI --- */
  .hero-section {
    /* Mantém o fundo dividido no mobile */
    background: linear-gradient(135deg, var(--color-background) 50%, var(--color-primary) 50%);
    padding-top: 80px;
  }
  .text-content h1 {
    font-size: 2.8rem;
    /* Garante que o texto seja legível no fundo dividido */
    color: var(--color-dark);
  }
  .text-content p {
    /* Garante que o texto seja legível no fundo dividido */
    color: var(--color-dark);
  }
}
</style>