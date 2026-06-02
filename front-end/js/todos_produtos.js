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
            card.setAttribute('data-product-id', prod.id);
            
            // Obter a imagem do produto
            let imgSrc = '';
            if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
                imgSrc = prod.images[0];
            } else if (prod.image && typeof prod.image === 'string') {
                imgSrc = prod.image;
            } else {
                imgSrc = 'img/placeholder-product.svg';
            }
            
            // Garantir que o caminho da imagem seja válido
            if (imgSrc && !imgSrc.startsWith('http') && !imgSrc.startsWith('data:') && !imgSrc.startsWith('/')) {
                imgSrc = '/' + imgSrc;
            }
            
            // Obter badge
            const badge = prod.condition || prod.badge || '';
            
            card.innerHTML = `
                <a href="produto.html?id=${prod.id}" class="product-link">
                    <div class="product-image">
                        <img src="${imgSrc}" alt="${prod.title}" 
                             onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlOWVjZWYiLz48cGF0aCBkPSJNMzUgNDBoMzB2MjBIMzV6IiBmaWxsPSIjYWRiNWJkIi8+PHBhdGggZD0iTTQwIDM1aDIwdjMwSDQweiIgZmlsbD0iIzZjNzU3ZCIvPjwvc3ZnPg=='">
                        ${badge ? `<span class="product-badge">${badge}</span>` : ''}
                    </div>
                </a>
                <div class="product-info">
                    <h3 class="product-title">${prod.title}</h3>
                    <div class="product-price">${formatCurrency(prod.price)}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" 
                            data-id="${prod.id}"
                            data-name="${prod.title.replace(/"/g, '&quot;')}"
                            data-price="${prod.price}"
                            data-image="${imgSrc.replace(/"/g, '&quot;')}"
                            data-badge="${badge.replace(/"/g, '&quot;')}">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                        <button class="btn btn-outline add-to-favorites" data-id="${prod.id}">
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        
        // Atualizar contador de produtos
        const countEl = document.getElementById('productsCount');
        if (countEl) {
            countEl.textContent = `${list.length} produto(s) encontrado(s)`;
        }
    }

    function formatCurrency(v){ 
        return `R$ ${Number(v).toFixed(2).replace('.',',')}`;
    }

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
        if(catSel) {
            cats.forEach(c=>{ 
                const o=document.createElement('option'); 
                o.value=c; 
                o.textContent=c; 
                catSel.appendChild(o);
            });
        }

        const brandSel = document.getElementById('filterBrand');
        if(brandSel) {
            brands.forEach(b=>{ 
                const o=document.createElement('option'); 
                o.value=b; 
                o.textContent=b; 
                brandSel.appendChild(o);
            });
        }
    }

    function bindActions(){
        document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
        
        document.getElementById('clearFilters')?.addEventListener('click', () => { 
            const filterCategory = document.getElementById('filterCategory');
            const filterBrand = document.getElementById('filterBrand');
            const filterCondition = document.getElementById('filterCondition');
            const filterPriceMax = document.getElementById('filterPriceMax');
            const sortBy = document.getElementById('sortBy');
            const globalSearch = document.getElementById('globalSearch');
            
            if(filterCategory) filterCategory.value = '';
            if(filterBrand) filterBrand.value = '';
            if(filterCondition) filterCondition.value = '';
            if(filterPriceMax) filterPriceMax.value = '';
            if(sortBy) sortBy.value = 'default';
            if(globalSearch) globalSearch.value = '';
            
            applyFilters(); 
        });
        
        document.getElementById('globalSearch')?.addEventListener('input', () => { 
            setTimeout(applyFilters, 250); 
        });

        // Delegação para adicionar ao carrinho / favoritos
        document.getElementById('productsGrid')?.addEventListener('click', (e)=>{
            const cartBtn = e.target.closest('.add-to-cart');
            const favBtn = e.target.closest('.add-to-favorites');
            
            if(cartBtn){
                e.preventDefault();
                e.stopPropagation();
                
                const id = cartBtn.getAttribute('data-id');
                
                // Criar objeto do produto com a imagem correta
                const productData = {
                    id: id,
                    title: cartBtn.getAttribute('data-name') || 'Produto',
                    price: parseFloat(cartBtn.getAttribute('data-price')) || 0,
                    image: cartBtn.getAttribute('data-image') || '',
                    badge: cartBtn.getAttribute('data-badge') || ''
                };
                
                // Se não tiver dados nos atributos, buscar do objeto global
                if (!productData.title || productData.title === 'Produto') {
                    const prod = (window.products && window.products[id]) ? window.products[id] : null;
                    if (prod) {
                        productData.title = prod.title || productData.title;
                        productData.price = Number(prod.price) || productData.price;
                        
                        // Obter imagem do produto
                        if (!productData.image) {
                            if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
                                productData.image = prod.images[0];
                            } else if (prod.image && typeof prod.image === 'string') {
                                productData.image = prod.image;
                            }
                        }
                        
                        if (!productData.badge) {
                            productData.badge = prod.condition || prod.badge || '';
                        }
                    }
                }
                
                // Garantir caminho absoluto da imagem
                if (productData.image && !productData.image.startsWith('http') && !productData.image.startsWith('data:') && !productData.image.startsWith('/')) {
                    productData.image = '/' + productData.image;
                }
                
                if (window.cartMenu && productData.id) {
                    window.cartMenu.addItem(productData, 1);
                }
            }
            
            if(favBtn){
                e.preventDefault();
                e.stopPropagation();
                
                const id = favBtn.getAttribute('data-id');
                const prod = (window.products && window.products[id]) ? window.products[id] : null;
                
                if(window.favoritesMenu && prod){ 
                    window.favoritesMenu.addToFavorites(prod); 
                    favBtn.classList.add('active'); 
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        populateFilterOptions();
        applyFilters();
        bindActions();
    });
})();