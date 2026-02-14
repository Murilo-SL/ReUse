document.addEventListener('DOMContentLoaded', function() {
  function getParam(name) { return new URL(window.location.href).searchParams.get(name); }
  const ongId = getParam('ong') || getParam('id');

  const DATA = {
    'sos-felino': {
      name: 'SOS Felino',
      description: 'Produtos oficiais da SOS Felino — parte da renda vai para resgates.',
      products: [
        { id: 'sf-1', title: 'Camiseta SOS Felino (P/M/G)', price: 'R$ 49,90', image: 'img/camiseta.sos.jpg' },
        { id: 'sf-2', title: 'Caneca SOS Felino', price: 'R$ 29,90', image: 'img/caneca.sos.jpg' },
        { id: 'sf-3', title: 'Ecobag SOS Felino', price: 'R$ 39,90', image: 'img/bolsa.sos.jpg' }
      ]
    },
    'patas-conscientes': {
      name: 'Patas Conscientes',
      description: 'Apoie a causa comprando produtos da Patas Conscientes.',
      products: [
        { id: 'pc-1', title: 'Camiseta Patas Conscientes', price: 'R$ 54,90', image: 'img/camiseta-patas.jpg' },
        { id: 'pc-2', title: 'Botton Patas Conscientes', price: 'R$ 12,90', image: 'img/broche-patas.jpg' }
      ]
    },
    'amazonia-viva': {
      name: 'Amazônia Viva',
      description: 'Produtos que ajudam a financiar o reflorestamento.',
      products: [
        { id: 'av-1', title: 'Camiseta Amazônia Viva', price: 'R$ 59,90', image: 'img/amazonia-shirt.jpg' },
        { id: 'av-2', title: 'Kit Mudas', price: 'R$ 79,90', image: 'img/amazonia-kit.jpg' }
      ]
    }
  };

  const container = document.getElementById('productsGrid');
  const title = document.getElementById('ongTitle');
  const intro = document.getElementById('ongIntro');

  if (!ongId || !DATA[ongId]) {
    title.textContent = 'Produtos';
    intro.textContent = 'ONG não encontrada ou sem produtos disponíveis.';
    return;
  }

  const ong = DATA[ongId];
  title.textContent = `Loja — ${ong.name}`;
  intro.textContent = ong.description;

  container.innerHTML = '';
  ong.products.forEach(p => {
    const a = document.createElement('a');
    a.href = `produto.html?id=${encodeURIComponent(p.id)}`;
    a.className = 'product-link';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${p.title}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-description">Produto oficial — parte da renda apoia a ONG.</p>
        <div class="product-price">${p.price}</div>
        <div class="product-actions">
          <button class="btn btn-primary add-to-cart" data-id="${p.id}"><i class="bi bi-cart-plus"></i> Comprar</button>
          <button class="btn btn-outline add-to-favorites" data-id="${p.id}"><i class="bi bi-heart"></i></button>
        </div>
      </div>
    `;

    a.appendChild(card);
    container.appendChild(a);
  });

  // Helper notification (delegates to cartMenu/favoritesMenu if available)
  function notify(message, type = 'info') {
    if (window.cartMenu && typeof window.cartMenu.showNotification === 'function') {
      window.cartMenu.showNotification(message, type);
      return;
    }
    if (window.favoritesMenu && typeof window.favoritesMenu.showNotification === 'function') {
      window.favoritesMenu.showNotification(message, type);
      return;
    }

    // Fallback simple DOM notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'success' ? '#00cc99' : (type === 'error' ? '#ff4757' : '#0066cc');
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.25rem';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '10000';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Wire up add-to-cart and favorites (delegation)
  container.addEventListener('click', (e) => {
    const cartBtn = e.target.closest('.add-to-cart');
    const favBtn = e.target.closest('.add-to-favorites');
    if (!cartBtn && !favBtn) return;

    // If user clicked favorite, allow the global FavoritesMenu handler to handle it
    if (favBtn && !cartBtn) {
      // Allow global FavoritesMenu to handle the favorite; if it's not present, show notification
      if (!(window.favoritesMenu && typeof window.favoritesMenu.addToFavorites === 'function')) {
        const prodId = favBtn.dataset.id || 'produto';
        notify(`Favorito: ${prodId}`, 'success');
      }
      return;
    }

    // Handle add-to-cart: build product object and call cartMenu if available
    if (cartBtn) {
      e.preventDefault();
      const productCard = cartBtn.closest('.product-card');
      if (!productCard) return;

      const title = productCard.querySelector('.product-title')?.textContent || 'Produto';
      const priceText = productCard.querySelector('.product-price')?.textContent || 'R$ 0,00';
      const price = parseFloat(priceText.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) || 0;
      const image = productCard.querySelector('.product-image img')?.src || '';
      const description = productCard.querySelector('.product-description')?.textContent || '';
      const id = cartBtn.dataset.id || (title.toLowerCase().replace(/\s+/g, '-'));

      const productObj = {
        id,
        title,
        price,
        image,
        description
      };

      if (window.cartMenu && typeof window.cartMenu.addItem === 'function') {
        window.cartMenu.addItem(productObj, 1);
      } else {
        // fallback: show notification
        notify(`${title} adicionado ao carrinho (simulado).`, 'success');
      }
    }
  });
});
