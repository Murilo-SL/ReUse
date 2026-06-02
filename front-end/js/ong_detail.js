// ong-detail.js atualizado
document.addEventListener('DOMContentLoaded', function () {
  function getParam(name) { 
    const url = new URL(window.location.href); 
    return url.searchParams.get(name); 
  }
  
  const id = getParam('id');

  const ONG_DATA = {
    'sos-felino': {
      name: 'SOS Felino',
      image: 'img/sos-felino.jpg',
      bannerImage: 'img/sos-felino-banner.jpg', // Adicione uma imagem de banner
      description: 'Organização dedicada ao resgate e cuidado de felinos abandonados, promovendo a adoção consciente e castração em massa.',
      tags: ['Animais','Resgate','Adoção','+500 animais salvos'],
      history: 'Fundada em 2010 por um grupo de veterinários e protetores de animais, a SOS Felino já resgatou mais de 500 felinos em situação de risco. Trabalhamos em parceria com clínicas veterinárias e abrigos temporários para garantir o bem-estar dos animais resgatados.',
      donationsNeedsDescription: 'Precisamos urgentemente de doações para manter nosso trabalho de resgate e cuidados veterinários.',
      donations: [
        { item: 'Ração para gatos', target: 500, current: 320, unit: 'kg' },
        { item: 'Areia sanitária', target: 200, current: 150, unit: 'sacos' },
        { item: 'Medicamentos veterinários', target: 5000, current: 3200, unit: 'R$' },
        { item: 'Casinhas para gatos', target: 50, current: 25, unit: 'unidades' }
      ],
      contact: {
        phone: '(11) 9999-8888',
        whatsapp: '(11) 99999-7777',
        email: 'contato@sosfelino.org.br',
        address: 'Rua dos Animais, 123 - Centro, São Paulo - SP'
      }
    },
    'patas-conscientes': {
      name: 'Patas Conscientes',
      image: 'img/patas-concientes.jpg',
      bannerImage: 'img/patas-concientes-banner.jpg', // Adicione uma imagem de banner
      description: 'Proteção animal com foco em conscientização, educação e apoio a protetores independentes. Realizamos feiras de adoção semanais.',
      tags: ['Conscientização','Educação','Proteção','+300 adoções/mês'],
      history: 'Desde 2015, a Patas Conscientes trabalha na educação da sociedade sobre posse responsável e direitos dos animais. Já realizamos mais de 100 palestras em escolas e eventos comunitários.',
      donationsNeedsDescription: 'Nossas doações são direcionadas para campanhas de castração e eventos de adoção.',
      donations: [
        { item: 'Coleiras e guias', target: 300, current: 180, unit: 'unidades' },
        { item: 'Ração para cães', target: 1000, current: 750, unit: 'kg' },
        { item: 'Vacinas', target: 10000, current: 6500, unit: 'R$' },
        { item: 'Material educativo', target: 2000, current: 1200, unit: 'R$' }
      ],
      contact: {
        phone: '(21) 8888-7777',
        whatsapp: '(21) 99999-6666',
        email: 'contato@patasconscientes.org.br',
        address: 'Avenida dos Bichos, 456 - Copacabana, Rio de Janeiro - RJ'
      }
    },
    'amazonia-viva': {
      name: 'Amazônia Viva',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Preservação da floresta amazônica através de projetos de reflorestamento, educação ambiental e combate ao desmatamento ilegal.',
      tags: ['Meio Ambiente','Reflorestamento','Amazônia','+10.000 árvores'],
      history: 'Fundada em 2005, a Amazônia Viva já plantou mais de 10.000 árvores nativas e capacitou comunidades locais em práticas sustentáveis. Trabalhamos em parceria com institutos de pesquisa e comunidades indígenas.',
      donationsNeedsDescription: 'Recursos para projetos de reflorestamento e equipamentos para monitoramento ambiental.',
      donations: [
        { item: 'Mudas de árvores nativas', target: 5000, current: 3200, unit: 'unidades' },
        { item: 'Equipamentos de monitoramento', target: 15000, current: 9000, unit: 'R$' },
        { item: 'Kit de reflorestamento', target: 200, current: 130, unit: 'kits' },
        { item: 'Transporte para voluntários', target: 8000, current: 4500, unit: 'R$' }
      ],
      contact: {
        phone: '(92) 7777-6666',
        whatsapp: '(92) 99999-5555',
        email: 'contato@amazoniaviva.org.br',
        address: 'Rodovia AM-010, Km 100 - Manaus, Amazonas'
      }
    }
  };

  // Tornar os dados acessíveis globalmente para outros scripts (ex: ong-modals.js)
  window.ONG_DATA = ONG_DATA;

  const data = ONG_DATA[id];
  
  if (!data) {
    // Se não encontrar a ONG, mostra mensagem de erro
    document.getElementById('ongName').textContent = 'ONG não encontrada';
    document.getElementById('ongNameHeading').textContent = 'ONG não encontrada';
    document.getElementById('ongDescription').textContent = 'Desculpe — não foi possível localizar informações para esta ONG.';
    return;
  }

  // Preenche os dados básicos
  document.getElementById('ongName').textContent = data.name;
  document.getElementById('ongNameHeading').textContent = data.name;
  document.getElementById('ongBannerName').textContent = data.name;
  document.getElementById('ongDescription').textContent = data.description;
  document.getElementById('ongBannerDescription').textContent = data.description;
  
  // Imagens
  document.getElementById('ongImage').src = data.image;
  document.getElementById('ongImage').alt = data.name;
  
  // Se não houver imagem de banner específica, usa a imagem principal
  const bannerImage = data.bannerImage || data.image;
  document.getElementById('ongBannerImage').src = bannerImage;
  document.getElementById('ongBannerImage').alt = `Banner ${data.name}`;
  
  // Tags
  const tagsEl = document.getElementById('ongTags');
  tagsEl.innerHTML = '';
  data.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'ong-tag-detail';
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  // Histórico
  document.getElementById('ongHistory').textContent = data.history;
  
  // Doações necessárias
  document.getElementById('donationsNeedsDescription').textContent = data.donationsNeedsDescription;
  
  const donationsList = document.getElementById('donationsList');
  donationsList.innerHTML = '';
  
  data.donations.forEach(donation => {
    const percentage = Math.round((donation.current / donation.target) * 100);
    
    const donationEl = document.createElement('div');
    donationEl.className = 'donation-item';
    donationEl.innerHTML = `
      <div class="donation-header">
        <h4>${donation.item}</h4>
        <span style="font-weight: 700; color: var(--ong-primary);">${percentage}%</span>
      </div>
      <div class="donation-progress">
        <div class="donation-progress-bar" style="width: ${percentage}%"></div>
      </div>
      <div class="donation-stats">
        <span>${donation.current} ${donation.unit} doados</span>
        <span>Meta: ${donation.target} ${donation.unit}</span>
      </div>
    `;
    
    donationsList.appendChild(donationEl);
  });

  // Informações de contato
  document.getElementById('contactPhone').textContent = data.contact.phone;
  document.getElementById('contactWhatsApp').textContent = data.contact.whatsapp;
  document.getElementById('contactEmail').textContent = data.contact.email;
  document.getElementById('contactAddress').textContent = data.contact.address;

  // Configuração do mapa (simulado)
  const mapContainer = document.getElementById('mapContainer');
  mapContainer.innerHTML = `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-light);">
      <i class="bi bi-geo-alt" style="font-size: 3rem; color: var(--ong-primary); margin-bottom: 1rem;"></i>
      <h4 style="color: var(--text-dark); margin-bottom: 0.5rem;">Localização</h4>
      <p style="text-align: center; max-width: 80%;">${data.contact.address}</p>
      <p style="font-size: 0.9rem; margin-top: 1rem;">(Mapa interativo em breve)</p>
    </div>
  `;
});