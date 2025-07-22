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
              <h3>Com mais de 8 anos de experiência em produtos, desenvolvimento de lideranças e cultura organizacional, </h3>
              <p>minha paixão é criar ambientes onde a comunicação flui, as pessoas cresçam e que a cultura de produtos seja cada vez mais conhecida. Acredito que equipes engajadas são o motor para a inovação e o sucesso sustentável. Minha jornada passou por Ifood, Itaú, Mercado Livre, e atualmente atuo como liderança, palestrante e mentora, meu objetivo é simples: equipar seus líderes e equipes para elevarem sua performance, cultivarem a excelência e se destacarem no mercado.</p>
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
              <p>Sessões individuais para profissionais que buscam aprimorar suas habilidades de gestão, liderança humanizada ou dar um salto na carreira.</p>
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
          <h2 class="section-title text-center">Recomendações</h2>
          
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="30"
            :loop="true"
            :pagination="{ clickable: true }"
            :navigation="true"
            :breakpoints="{
              '768': {
                slidesPerView: 2,
                spaceBetween: 20
              },
              '1024': {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }"
            class="testimonial-carousel"
          >
            <swiper-slide v-for="testimonial in testimonials" :key="testimonial.name">
              <div class="linkedin-testimonial-card">
                  <div class="testimonial-header">
                      <img :src="testimonial.imageUrl" :alt="'Foto de ' + testimonial.name" class="author-photo">
                      <div class="author-info">
                          <strong class="author-name">{{ testimonial.name }}</strong>
                          <span class="author-title">{{ testimonial.title }}</span>
                          <span class="testimonial-relationship">{{ testimonial.relationship }}</span>
                      </div>
                       <a :href="testimonial.linkedinUrl || '#'" target="_blank" class="linkedin-icon" aria-label="Ver no LinkedIn">
                          <i class="fab fa-linkedin"></i>
                      </a>
                  </div>
                  <p class="testimonial-text">"{{ testimonial.text }}"</p>
              </div>
            </swiper-slide>
          </swiper>

          <div class="client-logos">
            <p>Empresas que já confiaram no meu trabalho:</p>
           <div class="logos-slider">
              <img src="../assets/mercado-livre.png" alt="Logo Cliente Mercado Livre">
              <img src="https://cdn.worldvectorlogo.com/logos/itau-4.svg" alt="Logo Cliente Itaú BBA">
              <img src="../assets/ifood.png" alt="Logo Cliente Ifood">
              <img src="../assets/tc.png" alt="Logo Cliente TC">
              <img src="../assets/superlogica.png" alt="Logo Cliente Superlógica">
              <img src="../assets/rocks.png" alt="Logo Cliente Rocks">
              <img src="../assets/tera.png" alt="Logo Cliente Tera">
              <img src="../assets/product-camp.png" alt="Logo Cliente Product Camp">
              <img src="../assets/boticario.png" alt="Logo Cliente Boticário">
              <img src="../assets/equifax.png" alt="Logo Cliente Equifax">
              <img src="../assets/teddy.png" alt="Logo Cliente Teddy">
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
            <a href="https://wa.me/5511912808034?text=Olá, gostaria de saber mais sobre seus serviços" class="cta-button-final">Solicite um Orçamento</a>
          </div>
          <div class="contact-info">
            <p>Ou me encontre nas redes:</p>
            <div class="social-links">
              <a href="https://www.linkedin.com/in/analupuccar/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="https://www.instagram.com/analuproductdaily/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
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
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default {
  name: 'PalestranteLandingPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Navigation],
      isMenuOpen: false,
      isScrolled: false, 
      activeTopic: 0, 
      topics: [
        { title: 'Liderança Humanizada', description: 'Como liderar com empatia e autenticidade, mantendo a alta performance em equipes remotas e híbridas. Ferramentas práticas para uma gestão que inspira e retém talentos.' },
        { title: 'Cultura de Produtos e Transformação Digital', description: 'Técnicas para transformar o diálogo, reduzir conflitos e criar um ambiente de segurança psicológica onde o feedback construtivo floresce.' },
        { title: 'Carreira + Maternidade ', description: 'Como estimular a mentalidade criativa e proativa na sua equipe, transformando colaboradores em verdadeiros donos do negócio e impulsionando a inovação de dentro para fora.' },
        { title: 'Comunicação e conversas difíceis', description: 'Estratégias para construir equipes mais resilientes, capazes de navegar por mudanças e pressões com inteligência emocional e bem-estar.' }
      ],
      testimonials: [
        { name: 'Rodolfo P.', title: 'Product @ BEES | AB-InBev', relationship: 'Em 7 de junho de 2025, Rodolfo era cliente de Analu', text: 'Analu surgiu na minha timeline com vagas de mentoria! De longe foi a melhor coisa que fiz, me conectar com ela. Uma mentoria leve, sobre o meu momento profissional e pessoal, tivemos muita troca. A sua empolgação, sinceridade e transparência te fazer uma pessoa extremamente confiável! Pude abrir muitos detalhes e assim construir um plano juntos! Você me ajudou muito a trazer clareza para os meus objetivos e um senso de urgência para alcança-los.', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHfW1q3d2Q7rg/profile-displayphoto-scale_100_100/B4DZfWN7RzGsAg-/0/1751645666025?e=1756339200&v=beta&t=nv-GAIi2IhFsX1bDQyeikw3_mJLaP-N5Kx7Nvtu8YvI', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Larissa Camargo', title: 'Especialista de produtos financeiros', relationship: 'Em 2 de outubro de 2024, Larissa trabalhava com Analu mas em empresas diferentes', text: 'Tive a incrível oportunidade de ter Analu como minha mentora, uma experiência que trouxe um impacto profundo tanto na minha vida profissional quanto pessoal. Com sua energia única e vasto conhecimento de mercado, Analu me levou a enxergar aspectos da minha carreira que antes eu não havia considerado. Ela me fez entender que o movimento é o que inaugura a jornada, e que, diante dos desafios, sempre temos a capacidade de dar o nosso melhor. Com certeza, Analu é uma profissional diferenciada!', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGSsKfG40c5lw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1729781947537?e=1756339200&v=beta&t=cq0p-rebL5pvHY_Bbv3EW_WMgcx_wkqo3s3AJK4op58', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Arthur Pegoretti', title: 'Product Manager at RD Saúde', relationship: 'Em 10 de junho de 2024, Arthur era cliente de Analu', text: 'Analu é uma profissional incrível que me ajudou muito a me especializar na área de Produto. Ela possui um vasto conhecimento sobre o mercado, está sempre antenada nas tendências e sabe como aplicá-las da melhor forma. Além disso, é uma excelente comunicadora, facilitadora e um exemplo de mulher!', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQFFnwY_pT91Mw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1683638516365?e=1756339200&v=beta&t=PhUmbaspVUQAzW6htQ125WYonQIzoo_01z6cIu0hD_Q', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Vinícius L.', title: 'Produto | Product Manager | Fintech', relationship: 'Em 6 de fevereiro de 2024, Vinícius ensinava Analu', text: 'Analu é extremamente participativa e generosa com seu tempo para a a comunidade de gestão de produtos digitais no Brasil. Não somente, mas especialmente para as pessoas em transição de carreira, com sua curadoria e diulgação de vagas, mentorias particulares e em bootcamps. Analu é uma voz femina ativa e pulsante no mercado de gestão de Produtos digitais.', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGO2PRH-kXd3Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1708860005792?e=1756339200&v=beta&t=2TjFq56I1j97BhwBWgUraRwpPZKDPqZDVxu8bMtnvG8', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Manuel Itapura de Miranda', title: 'Sales and Marketing Manager', relationship: 'Em 14 de dezembro de 2023, Manuel trabalhava com Analu mas em empresas diferentes', text: 'Analu ajudou a rever meu perfil no LinkedIn. Ela tem um olhar critico e muito profissional. É aquela pessoa com quem você quer trabalhar, que te ouve mas questiona. Fala a verdade mas te impulsiona e motiva você a ser melhor!', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHp27G5v2fcbA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1699270543294?e=1756339200&v=beta&t=DDX0VjUgn-kYRTnoZiZiib4vtpVyOsEvd1TYhFR2vmc', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Janiele Silva', title: 'Product Manager | Product Owner', relationship: 'Em 24 de agosto de 2023, Janiele trabalhava com Analu mas em equipes diferentes', text: 'Analu é uma pessoa de uma energia incrível, muito humana e uma grande profissional. Tive o prazer de ser mentorada por ela e aprendi muito como pessoa e como profissional. As experiências compartilhadas, os direcionamentos claros e os desafios propostos foram sem dúvidas um processo muito rico e de evolução para mim.', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGXV2JWZWU5xg/profile-displayphoto-shrink_100_100/B4DZPZesS5GgAU-/0/1734520524246?e=1756339200&v=beta&t=IRqq3Xa6J_4p0qH53aPeUFxPubs7vhbZenGM3A4opeg', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Camila Luna Mendes', title: 'Consultora de Produtos Digitais | Itaú Unibanco', relationship: 'Em 15 de abril de 2023, Analu era sênior em relação a Camila', text: 'A Analu é uma grande parceira no dia a dia. Genuinamente preocupada com pessoas, está sempre atenta, identifica facilmente as forças de cada um e ajuda no que for preciso. Honesta e transparente, consegue desenvolver relações ótimas com o time. Tem uma visão estratégica muito boa e sabe colocar todos na mesma página. Pude aprender muito trabalhando com ela!', imageUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQEWkzxCbVSbeQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1621699884102?e=1756339200&v=beta&t=SiMxW24wXPGZGZCXXgV5ypfBwxtTq1ezwslJ6a9Olyo', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Diego Oliveira', title: 'Gerente de Marketing | Go-to-market (GTM)', relationship: 'Em 1 de março de 2023, Diego trabalhava com Analu na mesma equipe', text: 'Fiz uma mentoria recente com a Ana, e gostaria de deixar registrado como o processo foi legal e me ajudou muito a entender o meu momento de carreira! Discutimos alguns caminhos, foi muito rico e necessário pra mim. Ela como mentora se mostrou muito disponível e clara nos direcionamentos, foi uma troca que me ajudou muito e tenho certeza que irei colher bons frutos. :)', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQEQ6ZTE6pEaew/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1690222286127?e=1756339200&v=beta&t=4VsLJW9SepjQnZGRvRYp9ArGdXCvKkAT4cRGTGV5fIk', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Diogo Brant', title: 'Product Manager', relationship: 'Em 18 de outubro de 2022, Diogo era sênior em relação a Analu', text: 'Tive o prazer de ter sido mentorado pela Ana e foi um dos momentos em que mais aprendi como pessoa e como profissional. As experiências que ela compartilhou comigo tiveram um valor enorme e me ajudaram a crescer muito. Além disso, sempre demonstrou muita empatia e disposição em ajudar. Sem dúvidas é uma profissional diferenciada!', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQEf4lwDu2_YeA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1729116205116?e=1756339200&v=beta&t=jhR6mYxWvWf5npowIn7BMYjUfsb7PfkKvZHHZqGkQQY', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Jonatha Vieira', title: 'Product Owner | Product Manager', relationship: 'Em 17 de outubro de 2022, Analu era sênior em relação a Jonatha', text: 'A Ana é uma pessoa incrível pois junta seu lado humano com a grande profissional que é. Preocupando-se sempre com a qualidade não só do seu trabalho mas também com o impacto na vida das pessoas, além de possuir muito domínio sobre a área de produtos e ter a facilidade de trazer insights que sem dúvida agregaram muito.', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGeSQq6RIgbCw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723486074582?e=1756339200&v=beta&t=I6xb4YbDW0opLpBy2MDvF2f4dG5wicijDttfe_pRGDA', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Bruna Gomes', title: 'Sales & Service Consultant', relationship: 'Em 23 de março de 2022, Bruna trabalhava com Analu na mesma equipe', text: 'Uma pessoa excepcional pra se ter no time! A experiência de trabalhar com a Ana Luiza tem sido muito boa, nós celebramos as conquistas, nos ajudamos nos perrengues diários, compartilhamos nosso anseios de carreira e nos unimos pra deixar as experiências sempre fluídas e maravilhosas no produto. Destaco sua forte capacidade de negociação e sua criatividade para resolver problemas complexos. Grande mãe, grande profissional e grande parceira de vida.', imageUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQF7JA6lDBFGAA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1629131736714?e=1756339200&v=beta&t=kba_VlcNanXJj5gCswEWPj4Yw-3IDRHmzXRLdg8-2jo', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Rafael Guerreiro', title: 'Specialist Product Manager @ Grupo Boticário', relationship: 'Em 25 de novembro de 2021, Rafael respondia a Analu', text: 'A Analu é uma profissional muito humana e prioriza sempre a relação saudável com as pessoas. Possui um embasamento excelente na carreira de Produtos, teórico e prático, e é sempre procurada como uma fonte de informação segura para guiar times de sucesso na carreira de Produtos dentro da organização.', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQEoGtGv1P0FNg/profile-displayphoto-shrink_100_100/B4DZTN62QfG4AU-/0/1738621544623?e=1756339200&v=beta&t=S_ogJD5gZd16uGjiLfZrYCv7u3cedXnbmJOndJHv3YU', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Danilo Pereira De Luca', title: 'Software Craftsman | Distributed Platforms Architect', relationship: 'Em 1 de setembro de 2021, Danilo trabalhava com Analu na mesma equipe', text: 'Ana Luiza é uma das pessoas que em pouco tempo de trabalho juntos vi uma grande evolução, vontade e garra para aprender coisas novas! Entrou em um time até então desorganizado em vários aspectos, desde aspectos voltados para área de produto e até interação/relacionamento de time de desenvolvimento. Trouxe diversas ideias, correu atrás de pessoas, fez dinâmicas e mais um monte ações para romper paradigmas estagnados dentro do time. É o tipo de PM que rompe as barreiras entre produto e tech/dev e cultiva a cultura de todos serem um único time.', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHWQgytrQ-n8g/profile-displayphoto-scale_100_100/B4DZfMBrF7GYAc-/0/1751474682108?e=1756339200&v=beta&t=FSn6YbfBmVeAQv2tffdZ0FpgHrniYnA4lbNCPBXZ_WE', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Gabriel M.', title: 'Software Engineering Manager', relationship: 'Em 28 de agosto de 2021, Gabriel trabalhava com Analu na mesma equipe', text: 'Analu é uma excelente profissional, que tive o prazer de trabalhar! Possui conhecimento em diferentes competências para exercer muito bem o trabalho de uma PM, além de conseguir fazer um time se sentir unido e o trabalho ser prazeroso. Ela é uma profissional fora da curva que consegue se adaptar a qualquer lugar e situação. Sua comunicação é feita de forma muito transparente e a empatia que ela tem pelas pessoas é contagiante, que dificilmente não se torna algo recíproco!', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGVjDOuFu-WdQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721822456410?e=1756339200&v=beta&t=OqXtqi4bNWWEirGo19aKygrf7jxxqcXiS7kRs3o_EEA', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Arlete Almeida Pinto', title: 'Design / Negócio / Inovação', relationship: 'Em 1 de maio de 2021, Arlete trabalhava com Analu mas em equipes diferentes', text: 'Além de uma Product Manager muito compete, a Analu é o tipo de pessoa que não espera para fazer acontecer. Com uma capacidade incrível de adaptação, ela se determina em entregar o melhor com o que se tem em mãos. Admiro sua força humildade para enfrentar obstáculos e adversidades. Ela levanta a mão quando precisa de ajuda. Ela ouve para entender. Ela pergunta para aprender. Ela cuida do time. A Analu é persistência, comprometimento e humanização.', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQEIYjFBnKJdhw/profile-displayphoto-shrink_100_100/B4DZb1fmvJHQAY-/0/1747875426613?e=1756339200&v=beta&t=EAz722P7ABdcg1T8tCMbBYe2bJ01iqo7hYmHi5gSg48', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Simone de Alencar 🏳️‍🌈', title: 'Consultora & Estrategista Educacional', relationship: 'Em 17 de janeiro de 2021, Simone de trabalhava com Analu na mesma equipe', text: 'Com todos os papéis que desenvolve Ana Lu sabe agir com leveza e sempre está pronta para apoiar amigos e colegas! É altamente responsável, tem energia, senso crítico, sabe se posicionar e acima de tudo: É muito humana. Foi muito bom trabalhar com você, Ana. Brilha em cada projeto, ação e task... Você é gigante. Bjo', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQG2JGw8toyuoQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1703107004499?e=1756339200&v=beta&t=xIRHvv9ryLnNLJDwxWNkleYyrcYVGvbFiO3Da35ajx8', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' },
        { name: 'Marcelo Nepomuceno Estelles', title: 'Diretor de TV', relationship: 'Em 25 de junho de 2012, Marcelo supervisionava Analu diretamente', text: 'Profissional competente, centrada e organizada, ótimo relacionamento com o grupo de trabalho e com atendimento a clientes.', imageUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQFE3T-scpyTkQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1658410132660?e=1756339200&v=beta&t=UyBeJdk1UY2cT5YYSwQLeyKrk_iA3gF5tDVdZp9TLqg', linkedinUrl: 'https://www.linkedin.com/in/analupuccar/details/recommendations/?detailScreenTabIndex=0' }
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
/* Os estilos de <style> permanecem os mesmos da resposta anterior */
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
  margin-bottom: 3rem;
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

.image-content img { 
  border-radius: 10px;
  max-width: 100%;
  height: auto; 
  max-height: 
  80vh; z-index: 1; 
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3)); }

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

/* ========== NOVOS ESTILOS PARA DEPOIMENTOS COM CARROSSEL ========== */
.testimonials-section {
  padding: 4rem 0;
  background-color: var(--color-background);
}

.testimonial-carousel {
  padding: 0 20px 4rem 20px; /* Espaço para a paginação e setas */
  margin: 0 -20px;
}

.swiper-slide {
  height: auto; /* Permite que os slides tenham altura automática */
}

.linkedin-testimonial-card {
    background-color: var(--color-light);
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    height: 100%;
    /* ✅ AQUI ESTÁ A CORREÇÃO PRINCIPAL */
    justify-content: flex-start; /* Alinha os itens no topo do card */
}

.testimonial-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem; /* Espaço entre cabeçalho e texto */
    position: relative;
}

.author-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    flex-shrink: 0;
}

.author-info {
    flex-grow: 1;
}

.author-name {
    font-weight: 700;
    color: var(--color-dark);
    margin: 0;
    display: block;
}

.author-title {
    font-size: 0.85rem;
    color: #555;
    display: block;
    line-height: 1.4;
    margin-top: 2px;
}

.testimonial-relationship {
    font-size: 0.75rem;
    color: #888;
    margin-top: 4px;
    display: block;
}

.linkedin-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
    color: #0A66C2; /* Cor oficial do LinkedIn */
    text-decoration: none;
    transition: transform 0.3s ease;
}

.linkedin-icon:hover {
    transform: scale(1.1);
}

.testimonial-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-dark);
    margin: 0;
    padding-left: 0.5rem;
    border-left: 3px solid var(--color-secondary);
}

/* Customização do Swiper */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
    color: var(--color-primary);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: opacity 0.3s ease;
}
:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
    font-size: 1.2rem;
    font-weight: bold;
}

:deep(.swiper-pagination-bullet) {
    background: var(--color-primary);
    opacity: 0.5;
    transition: background-color 0.3s ease, opacity 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
    background: var(--color-secondary);
    opacity: 1;
}

/* ====================================================== */

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
    height: 90px;
    opacity: 0.8;
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
  .hero-section {
    background: linear-gradient(135deg, var(--color-background) 50%, var(--color-primary) 50%);
    padding-top: 80px;
  }
  .text-content h1 {
    font-size: 2.8rem;
    color: var(--color-dark);
  }
  .text-content p {
    color: var(--color-dark);
  }
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
      display: none;
  }
}
</style>