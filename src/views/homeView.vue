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
              <p>Keynotes e palestras são energizantes, com o objetivo de abrir mentes e inspirar novas formas de pensar e agir, promovendo um ambiente de trabalho mais dinâmico e produtivo.</p>
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
              <img src="../assets/logo-ifood.png" alt="Logo Cliente Ifood">
              <!-- <img src="../assets/tc.png" alt="Logo Cliente TC"> -->
              <img src="../assets/superlogica_Logo.png" alt="Logo Cliente Superlógica">
              <!-- <img src="../assets/rocks.png" alt="Logo Cliente Rocks"> -->
              <img src="../assets/tera_logo.jpg" alt="Logo Cliente Tera">
              <img src="../assets/pcamp-logo.png" alt="Logo Cliente Product Camp">
              <img src="../assets/boticario_logo.png" alt="Logo Cliente Boticário">
              <img src="../assets/equifax_logo.jpg" alt="Logo Cliente Equifax">
              <!-- <img src="../assets/teddy.png" alt="Logo Cliente Teddy"> -->
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
        { title: 'Cultura de Produtos e Transformação Digital', description: 'A verdadeira transformação digital não se resume a adotar novas tecnologias; ela nasce de uma profunda mudança cultural. Em um ambiente de negócios que evolui rapidamente, construir uma sólida cultura de produtos é o que diferencia as empresas que apenas sobrevivem daquelas que lideram o mercado. Esta palestra foca em como cultivar um ecossistema onde a inovação é consequência direta de um ambiente psicologicamente seguro. Abordaremos técnicas práticas para transformar o diálogo entre equipes, substituindo silos e conflitos por colaboração e alinhamento. Você aprenderá a criar canais onde o feedback construtivo não só é bem-vindo, como é a principal ferramenta para o crescimento contínuo, permitindo que as melhores ideias floresçam e impulsionem o sucesso da sua organização.' },
        { title: 'Carreira + Maternidade ', description: 'A jornada de equilibrar carreira e maternidade é frequentemente vista como um desafio de sacrifícios, mas pode ser uma poderosa fonte de desenvolvimento de habilidades únicas e valiosas. Esta palestra ressignifica essa narrativa, mostrando como as competências adquiridas na maternidade — como empatia, resiliência e uma incrível capacidade de gestão de tempo e prioridades — podem impulsionar o crescimento profissional. Exploraremos como estimular uma mentalidade criativa e proativa, transformando a experiência da maternidade em um catalisador para a inovação. O objetivo é capacitar mulheres a se tornarem verdadeiras "donas do negócio", tanto em suas vidas quanto em suas carreiras, e mostrar às empresas como criar uma cultura de apoio que não apenas retém talentos, mas também impulsiona a inovação de dentro para fora.' },
        { title: 'Comunicação e conversas difíceis', description: 'O sucesso de uma equipe muitas vezes depende não das conversas fáceis, mas da coragem e da habilidade de navegar pelas conversas difíceis. Ignorar conflitos, dar feedbacks vagos ou evitar diálogos cruciais cria um ambiente de incerteza e estagnação. Nesta apresentação, mergulhamos em estratégias práticas para transformar a comunicação na sua equipe, construindo times mais resilientes e preparados para qualquer desafio. Aprenda a abordar temas complexos com inteligência emocional, a navegar por mudanças e pressões com bem-estar e a criar uma cultura onde a honestidade e a empatia são a base para a resolução de problemas. Ao dominar a arte das conversas difíceis, você equipa seus líderes e colaboradores para construir relações de confiança e alcançar resultados extraordinários.' }
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
@import '@/styles/home.css';
</style>