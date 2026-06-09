//carregar produtos
async function loadProduct() {

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId =
        urlParams.get("id");

    if (!productId) {
        window.location.href = "cliente-inicio.html";
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3600/products/${productId}`
        );

        const result = await response.json();

        if (!result.data || result.data.length === 0) {
            window.location.href = "cliente-inicio.html";
            return;
        }

        const product = result.data[0];

        const imageUrl = product.image_url
            ? `http://localhost:3600/${product.image_url}`
            : "IMG/no-image.png";

        document.getElementById("productTitle").textContent =
            product.name;

        document.getElementById("productTitleBreadcrumb").textContent =
            product.name;

        document.getElementById("productDescription").textContent =
            product.description || "";

        document.getElementById("productPrice").textContent =
            formatCurrency(Number(product.price));

        document.getElementById("productInstallment").textContent =
            `Em até 10x de ${formatCurrency(Number(product.price) / 10)} sem juros`;

        const mainImage =
            document.getElementById("productMainImage");

        mainImage.src = imageUrl;
        mainImage.alt = product.name;

        const thumbnailsContainer =
            document.getElementById("imageThumbnails");

        thumbnailsContainer.innerHTML = `
            <div class="thumbnail active">
                <img src="${imageUrl}" alt="${product.name}">
            </div>
        `;

        const specsContainer =
            document.getElementById("productSpecs");

        specsContainer.innerHTML = `
            <div class="spec-item">
                <span class="spec-label">Categoria:</span>
                <span class="spec-value">${product.category || "Não informado"}</span>
            </div>

            <div class="spec-item">
                <span class="spec-label">Condição:</span>
                <span class="spec-value">${product.condition_status || "Não informado"}</span>
            </div>
        `;

        loadSellerInfo(product);
        setupActionButtons(product, imageUrl);
        loadRelatedProducts(product.id);

    } catch (error) {

        console.error("Erro ao carregar produto:", error);
    }
}

// Carregar informações do vendedor
function loadSellerInfo(product) {

    const sellerNameLink =
        document.getElementById("sellerNameLink");

    if (sellerNameLink) {
        sellerNameLink.textContent =
            "Vendedor ReUse";

        sellerNameLink.href = "#";
    }

    const sellerRating =
        document.getElementById("sellerRating");

    if (sellerRating) {
        sellerRating.textContent = "4.8";
    }

    const sellerSales =
        document.getElementById("sellerSales");

    if (sellerSales) {
        sellerSales.textContent = "(0 vendas)";
    }
}

// Carregar produtos relacionados
async function loadRelatedProducts(currentProductId) {

    const relatedProductsContainer =
        document.getElementById("relatedProducts");

    relatedProductsContainer.innerHTML = "";

    const response =
        await fetch("http://localhost:3600/products");

    const result =
        await response.json();

    const products =
        (result.data || [])
            .filter(p => Number(p.id) !== Number(currentProductId))
            .slice(0, 4);

    products.forEach(product => {

        const imageUrl = product.image_url
            ? `http://localhost:3600/${product.image_url}`
            : "IMG/no-image.png";

        relatedProductsContainer.innerHTML += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${imageUrl}" alt="${product.name}">
                </div>

                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>

                    <p class="product-description">
                        ${product.description || ""}
                    </p>

                    <div class="product-price">
                        ${formatCurrency(Number(product.price))}
                    </div>

                    <div class="product-actions">
                        <a href="produto.html?id=${product.id}" class="btn btn-primary">
                            <i class="bi bi-eye"></i>
                            Ver Detalhes
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Configurar botões de ação
function setupActionButtons(product, imageUrl) {

    const addToCartBtn =
        document.getElementById("addToCartBtn");

    const addToFavoritesBtn =
        document.getElementById("addToFavoritesBtn");

    const quantityInput =
        document.getElementById("productQuantity");

    addToCartBtn.dataset.id = product.id;
    addToCartBtn.dataset.name = product.name;
    addToCartBtn.dataset.price = product.price;
    addToCartBtn.dataset.image = imageUrl;

    addToFavoritesBtn.dataset.id = product.id;

    addToCartBtn.onclick = () => {

        const quantity =
            parseInt(quantityInput.value) || 1;

        if (window.cartMenu) {
            window.cartMenu.addItem(
                {
                    id: product.id,
                    title: product.name,
                    price: Number(product.price),
                    image: imageUrl
                },
                quantity
            );
        }
    };

    addToFavoritesBtn.onclick = async () => {

        const fakeCard =
            document.createElement("div");

        fakeCard.className = "product-card";
        fakeCard.dataset.id = product.id;

        fakeCard.innerHTML = `
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${formatCurrency(Number(product.price))}</div>
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.name}">
            </div>
            <p class="product-description">${product.description || ""}</p>
        `;

        if (window.favoritesMenu) {
            await window.favoritesMenu.toggleProductFavorite(
                fakeCard,
                addToFavoritesBtn
            );
        }
    };

    if (window.favoritesMenu) {
        const isFavorited =
            window.favoritesMenu.isProductFavorited(product.id);

        window.favoritesMenu.updateHeartIcon(
            addToFavoritesBtn,
            isFavorited
        );

if (isFavorited) {
    addToFavoritesBtn.innerHTML =
        `<i class="bi bi-heart-fill"></i> Favoritado`;
} else {
    addToFavoritesBtn.innerHTML =
        `<i class="bi bi-heart"></i> Favoritar`;
}
    }
}

// Funções auxiliares
function formatCurrency(value) {
    return `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
}
// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
    
    // Verificar se o elemento do vendedor existe no HTML
    const sellerSection = document.querySelector('.seller-info-card');
    if (!sellerSection) {
        console.warn('Elemento .seller-info-card não encontrado. Verifique se o HTML foi atualizado.');
    }
});

// Exportar funções para uso global
window.formatCurrency = formatCurrency;