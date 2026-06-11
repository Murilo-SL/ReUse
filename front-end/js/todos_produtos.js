let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
    await carregarTodosProdutos();
    bindActions();
});

async function carregarTodosProdutos() {
    const grid = document.getElementById("productsGrid");
    const countEl = document.getElementById("productsCount");

    try {
        const response = await fetch("http://localhost:3600/products");
        const result = await response.json();

        allProducts = result.data || [];

        renderProducts(allProducts);

        if (countEl) {
            countEl.textContent = `${allProducts.length} produto(s) encontrado(s)`;
        }

        populateFilterOptions();

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);

        if (grid) {
            grid.innerHTML = "<p>Erro ao carregar produtos.</p>";
        }
    }
}

function renderProducts(list) {
    const grid = document.getElementById("productsGrid");

    if (!grid) return;

    grid.innerHTML = "";

    if (!list.length) {
        grid.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    list.forEach(product => {
        const imageUrl = product.image_url
            ? `http://localhost:3600/${product.image_url}`
            : "IMG/no-image.png";

        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-product-id", product.id);

        card.innerHTML = `
            <a href="produto.html?id=${product.id}" class="product-link">
                <div class="product-image">
                    <img src="${imageUrl}" alt="${product.name}">
                    <span class="product-badge">${product.condition_status || ""}</span>
                </div>
            </a>

            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>

                <p class="product-description">
                    ${product.description || ""}
                </p>

                <div class="product-price">
                    R$ ${Number(product.price).toFixed(2).replace(".", ",")}
                </div>

                <div class="product-actions">
                    <button
                        class="btn btn-primary add-to-cart"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-image="${imageUrl}">
                        <i class="bi bi-cart-plus"></i>
                    </button>

                    <button
                        class="btn btn-outline add-to-favorites"
                        data-id="${product.id}">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    const countEl = document.getElementById("productsCount");
    if (countEl) {
        countEl.textContent = `${list.length} produto(s) encontrado(s)`;
    }
}

function populateFilterOptions() {
    const categorySelect =
        document.getElementById("filterCategory");

    const conditionSelect =
        document.getElementById("filterCondition");

    if (categorySelect) {
        categorySelect.innerHTML =
            `<option value="">Todas</option>`;

        const categories = [
            ...new Set(
                allProducts
                    .map(p => p.category)
                    .filter(Boolean)
            )
        ];

        categories.forEach(category => {
            const option =
                document.createElement("option");

            option.value = category;
            option.textContent = category;

            categorySelect.appendChild(option);
        });
    }

    if (conditionSelect) {
        conditionSelect.innerHTML =
            `<option value="">Todas</option>`;

        const conditions = [
            ...new Set(
                allProducts
                    .map(p => p.condition_status)
                    .filter(Boolean)
            )
        ];

        conditions.forEach(condition => {
            const option =
                document.createElement("option");

            option.value = condition;
            option.textContent = condition;

            conditionSelect.appendChild(option);
        });
    }
}

function applyFilters() {
    let list = [...allProducts];

    const search =
        document.getElementById("searchInput")?.value.toLowerCase() || "";

    const category =
        document.getElementById("filterCategory")?.value || "";

    const condition =
        document.getElementById("filterCondition")?.value || "";

    const priceMax =
        Number(document.getElementById("filterPriceMax")?.value || 0);

    const sortBy =
        document.getElementById("sortBy")?.value || "default";

    if (search) {
        list = list.filter(product =>
            product.name.toLowerCase().includes(search) ||
            (product.description || "").toLowerCase().includes(search)
        );
    }

    if (category) {
        list = list.filter(product => product.category === category);
    }

    if (condition) {
        list = list.filter(product => product.condition_status === condition);
    }

    if (priceMax > 0) {
        list = list.filter(product => Number(product.price) <= priceMax);
    }

    if (sortBy === "price-asc") {
        list.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-desc") {
        list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "title-asc") {
        list.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(list);
}

function bindActions() {
    document.getElementById("applyFilters")?.addEventListener("click", applyFilters);

    document.getElementById("clearFilters")?.addEventListener("click", () => {
        document.getElementById("filterCategory").value = "";
        document.getElementById("filterCondition").value = "";
        document.getElementById("filterPriceMax").value = "";
        document.getElementById("sortBy").value = "default";
        document.getElementById("searchInput").value = "";

        renderProducts(allProducts);
    });

    document.getElementById("searchInput")?.addEventListener("input", applyFilters);

    document.getElementById("productsGrid")?.addEventListener("click", (e) => {
        const cartBtn = e.target.closest(".add-to-cart");
        const favBtn = e.target.closest(".add-to-favorites");

        if (cartBtn) {
            e.preventDefault();

            const productData = {
                id: cartBtn.dataset.id,
                title: cartBtn.dataset.name,
                price: Number(cartBtn.dataset.price),
                image: cartBtn.dataset.image
            };

            if (window.cartMenu) {
                window.cartMenu.addItem(productData, 1);
            }
        }

        if (favBtn) {
            e.preventDefault();

            const productId = Number(favBtn.dataset.id);
            const product = allProducts.find(p => Number(p.id) === productId);

            if (window.favoritesMenu && product) {
                window.favoritesMenu.addToFavorites(product);
                favBtn.classList.add("active");
            }
        }
    });
}