// todos-produtos.js — renderiza produtos e aplica filtros usando o objeto `products` definido em product-detail.js
(function(){
    function $(sel){return document.querySelector(sel)}
    function $all(sel){return Array.from(document.querySelectorAll(sel))}

    function getProductsArray(){
        if(window.products) return Object.values(window.products);
        return [];
    }

    function renderProducts(list){
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '';
        if(!list.length){
            grid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        list.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const imgSrc = (prod.images && prod.images[0]) ? prod.images[0] : 'img/tenis-nike.avif';
            card.innerHTML = `
                <a href="produto.html?id=${prod.id}" class="product-link">
                    <div class="product-image"><img src="${imgSrc}" alt="${prod.title}"></div>
                </a>
                <div class="product-info">
                    <h3 class="product-title">${prod.title}</h3>
                    <div class="product-price">${formatCurrency(prod.price)}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" data-id="${prod.id}"><i class="bi bi-cart-plus"></i></button>
                        <button class="btn btn-outline add-to-favorites" data-id="${prod.id}"><i class="bi bi-heart"></i></button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function formatCurrency(v){ return `R$ ${Number(v).toFixed(2).replace('.',',')}` }

    function collectFilterValues(){
        return {
            q: (document.getElementById('globalSearch')?.value || '').toLowerCase(),
            category: (document.getElementById('filterCategory')?.value || ''),
            brand: (document.getElementById('filterBrand')?.value || ''),
            condition: (document.getElementById('filterCondition')?.value || ''),
            priceMax: Number(document.getElementById('filterPriceMax')?.value || 0),
            sortBy: (document.getElementById('sortBy')?.value || 'default')
        }
    }

    function applyFilters(){
        let list = getProductsArray();
        const f = collectFilterValues();

        if(f.q) list = list.filter(p => p.title.toLowerCase().includes(f.q) || (p.description||'').toLowerCase().includes(f.q));
        if(f.category) list = list.filter(p => p.category === f.category);
        if(f.brand) list = list.filter(p => p.brand === f.brand);
        if(f.condition) list = list.filter(p => p.condition === f.condition);
        if(f.priceMax && f.priceMax > 0) list = list.filter(p => Number(p.price) <= f.priceMax);

        if(f.sortBy === 'price-asc') list.sort((a,b)=>a.price-b.price);
        if(f.sortBy === 'price-desc') list.sort((a,b)=>b.price-a.price);
        if(f.sortBy === 'title-asc') list.sort((a,b)=> a.title.localeCompare(b.title, 'pt'));

        renderProducts(list);
    }

    function populateFilterOptions(){
        const list = getProductsArray();
        const cats = Array.from(new Set(list.map(p=>p.category).filter(Boolean))).sort();
        const brands = Array.from(new Set(list.map(p=>p.brand).filter(Boolean))).sort();

        const catSel = document.getElementById('filterCategory');
        cats.forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; catSel.appendChild(o)});

        const brandSel = document.getElementById('filterBrand');
        brands.forEach(b=>{ const o=document.createElement('option'); o.value=b; o.textContent=b; brandSel.appendChild(o)});
    }

    function bindActions(){
        document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
        document.getElementById('clearFilters')?.addEventListener('click', () => { document.getElementById('filterCategory').value=''; document.getElementById('filterBrand').value=''; document.getElementById('filterCondition').value=''; document.getElementById('filterPriceMax').value=''; document.getElementById('sortBy').value='default'; document.getElementById('globalSearch').value=''; applyFilters(); });
        document.getElementById('globalSearch')?.addEventListener('input', () => { setTimeout(applyFilters, 250) });

        // Delegation for add to cart / favorites
        document.getElementById('productsGrid')?.addEventListener('click', (e)=>{
            const cartBtn = e.target.closest('.add-to-cart');
            const favBtn = e.target.closest('.add-to-favorites');
            if(cartBtn){
                const id = cartBtn.getAttribute('data-id');
                const prod = (window.products && window.products[id]) ? window.products[id] : null;
                if(window.cartMenu && prod){ window.cartMenu.addItem(prod, 1); window.cartMenu.showNotification && window.cartMenu.showNotification('Produto adicionado ao carrinho','success'); }
                else console.log('Adicionar ao carrinho:', id);
            }
            if(favBtn){
                const id = favBtn.getAttribute('data-id');
                const prod = (window.products && window.products[id]) ? window.products[id] : null;
                if(window.favoritesMenu && prod){ window.favoritesMenu.addToFavorites(prod); window.favoritesMenu.showNotification && window.favoritesMenu.showNotification('Produto adicionado aos favoritos','success'); favBtn.classList.add('active'); }
                else console.log('Favoritar:', id);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        populateFilterOptions();
        applyFilters();
        bindActions();
    });
})();
