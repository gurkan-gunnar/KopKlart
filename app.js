let products = window.phoneModels || [];

const state = {
  query: "",
  category: "alla",
  brand: "alla",
  color: "alla",
  price: "alla",
  sortBy: "total",
  inStockOnly: false,
  selectedProductId: products[0]?.id || "",
  selectedColor: "",
  selectedStorage: ""
};

const productList = document.querySelector("#product-list");
const priceComparison = document.querySelector("#price-comparison");
const searchForm = document.querySelector(".search-panel");
const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const brandFilter = document.querySelector("#brand-filter");
const colorFilter = document.querySelector("#color-filter");
const priceFilter = document.querySelector("#price-filter");
const sortFilter = document.querySelector("#sort-filter");
const stockFilter = document.querySelector("#stock-filter");
const refreshPricesButton = document.querySelector("#refresh-prices");
const liveStatus = document.querySelector("#live-status");
const productModal = document.querySelector("#product-modal");
const modalContent = document.querySelector("#modal-content");

const currency = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0
});
const fallbackImage = window.phoneFallbackImage || "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg";

function totalPrice(offer) {
  return offer.price + (Number.isFinite(offer.shipping) ? offer.shipping : 0);
}

function formatPrice(value) {
  return currency.format(value);
}

function deliveryText(days) {
  if (!Number.isFinite(days)) {
    return "Leverans visas hos butik";
  }

  return days === 1 ? "Leverans imorgon" : `${days} dagars leverans`;
}

function formatDealDate(value) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short"
  }).format(new Date(value));
}

function shippingText(offer) {
  if (!Number.isFinite(offer.shipping)) {
    return "Frakt visas hos butik";
  }

  return offer.shipping === 0 ? "Fri frakt" : `${formatPrice(offer.shipping)} frakt`;
}

function bestOffer(variant) {
  return [...variant.offers].sort((a, b) => totalPrice(a) - totalPrice(b))[0];
}

function bestVariant(model, variants = matchingVariants(model)) {
  return [...variants].sort((a, b) => totalPrice(bestOffer(a)) - totalPrice(bestOffer(b)))[0];
}

function uniqueValues(values) {
  return [...new Set(values)].filter(Boolean);
}

function priceMatches(variant) {
  if (state.price === "alla") {
    return true;
  }

  const price = totalPrice(bestOffer(variant));

  if (state.price === "0-5000") return price <= 5000;
  if (state.price === "5000-10000") return price > 5000 && price <= 10000;
  if (state.price === "10000-15000") return price > 10000 && price <= 15000;
  return price > 15000;
}

function normalizeSearch(value) {
  return value
    .trim()
    .toLowerCase()
    .replaceAll("xaomi", "xiaomi")
    .replaceAll("xiomi", "xiaomi")
    .replaceAll("samsong", "samsung")
    .replaceAll("appel", "apple");
}

function matchingVariants(model) {
  return model.variants.filter((variant) => {
    const matchesColor = state.color === "alla" || variant.color === state.color;
    const matchesStock = !state.inStockOnly || variant.offers.some((offer) => offer.stock);

    return matchesColor && matchesStock && priceMatches(variant);
  });
}

function filteredProducts() {
  return products
    .map((model) => ({ model, variants: matchingVariants(model) }))
    .filter(({ model, variants }) => {
      const query = normalizeSearch(state.query);
      const haystack = normalizeSearch(
        [
          model.name,
          model.brand,
          model.series,
          ...variants.flatMap((variant) => [variant.color, variant.storage, ...variant.offers.map((offer) => offer.name)])
        ].join(" ")
      );
      const matchesQuery =
        !query || haystack.includes(query);
      const matchesCategory = state.category === "alla" || model.category === state.category;
      const matchesBrand = state.brand === "alla" || model.brand === state.brand;

      return variants.length && matchesQuery && matchesCategory && matchesBrand;
    })
    .sort((a, b) => {
      const variantA = bestVariant(a.model, a.variants);
      const variantB = bestVariant(b.model, b.variants);
      const offerA = bestOffer(variantA);
      const offerB = bestOffer(variantB);

      if (state.sortBy === "rating") {
        return offerB.rating - offerA.rating;
      }

      if (state.sortBy === "delivery") {
        return offerA.delivery - offerB.delivery;
      }

      return totalPrice(offerA) - totalPrice(offerB);
    });
}

function populateFilters() {
  const brands = uniqueValues(products.map((model) => model.brand)).sort();
  const colors = uniqueValues(products.flatMap((model) => model.variants.map((variant) => variant.color))).sort();

  brandFilter.innerHTML = [
    '<option value="alla">Alla märken</option>',
    ...brands.map((brand) => `<option value="${brand}">${brand}</option>`)
  ].join("");

  colorFilter.innerHTML = [
    '<option value="alla">Alla färger</option>',
    ...colors.map((color) => `<option value="${color}">${color}</option>`)
  ].join("");
}

function updateLiveStatus(message) {
  if (liveStatus) {
    liveStatus.textContent = message;
  }
}

async function loadLiveProducts() {
  try {
    const response = await fetch("/api/models");

    if (!response.ok) {
      throw new Error("API svarade inte");
    }

    const payload = await response.json();
    products = payload.models || products;
    state.selectedProductId = products[0]?.id || "";
    updateLiveStatus(payload.updatedAt ? `Liveprisdata: ${new Date(payload.updatedAt).toLocaleString("sv-SE")}` : "Server ansluten");
  } catch {
    updateLiveStatus("Offline-data används");
  }
}

function renderProducts() {
  const visibleProducts = filteredProducts();

  if (!visibleProducts.length) {
    productList.innerHTML = '<div class="empty-state">Inga telefoner matchar dina filter.</div>';
    return;
  }

  productList.innerHTML = visibleProducts
    .map(({ model, variants }) => {
      const variant = bestVariant(model, variants);
      const offer = bestOffer(variant);
      const colorCount = uniqueValues(model.variants.map((item) => item.color)).length;
      const storageCount = uniqueValues(model.variants.map((item) => item.storage)).length;
      const selected = state.selectedProductId === model.id;
      const dealText = offer.deal?.endsAt ? `Erbjudande till ${formatDealDate(offer.deal.endsAt)}` : "";

      return `
        <article class="product-card ${selected ? "selected" : ""} ${offer.deal ? "on-sale" : ""}" data-product-card="${model.id}">
          ${offer.deal ? `<div class="card-sale-ribbon">${offer.deal.label}</div>` : ""}
          <img src="${variant.image}" alt="${model.name} ${variant.color}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}'" />
          <div class="product-info">
            <h3>${model.name}</h3>
            <div class="meta">
              <span class="chip">${model.brand}</span>
              <span class="chip">${colorCount} färger</span>
              <span class="chip">${storageCount} lagringar</span>
              <span class="chip">Från ${variant.color}, ${variant.storage}</span>
            </div>
            <div class="shop-list">
              <div class="shop-line"><span>Bäst hos ${offer.name}</span><strong>${formatPrice(totalPrice(offer))}</strong></div>
              <div class="shop-line"><span>${variant.offers.length} produktsidor</span><strong>${offer.rating.toFixed(1)} i betyg</strong></div>
            </div>
          </div>
          <div class="price-block">
            <div>
              <div class="price">${formatPrice(totalPrice(offer))}</div>
              <div class="delivery">${shippingText(offer)} · ${deliveryText(offer.delivery)}</div>
              ${dealText ? `<div class="card-deal-expiry">${dealText}</div>` : ""}
              <div class="stock ${offer.stock ? "" : "out"}">${offer.stock ? "I lager" : "Ej i lager"}</div>
            </div>
            <button type="button">Visa priser</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function chooseVariant(model) {
  const variants = matchingVariants(model);
  const preferredColor = state.selectedColor || (state.color !== "alla" ? state.color : "");
  const preferredStorage = state.selectedStorage;

  return (
    variants.find((variant) => variant.color === preferredColor && variant.storage === preferredStorage) ||
    variants.find((variant) => variant.color === preferredColor) ||
    variants.find((variant) => variant.storage === preferredStorage) ||
    bestVariant(model, variants) ||
    model.variants[0]
  );
}

function priceRows(variant) {
  const sortedOffers = [...variant.offers].sort((a, b) => totalPrice(a) - totalPrice(b));
  const bestTotal = totalPrice(sortedOffers[0]);

  return sortedOffers
    .map((offer, index) => {
      const isBest = totalPrice(offer) === bestTotal;
      const dealLabel = offer.deal?.label || "";
      const dealText = offer.deal?.endsAt ? `Erbjudande till ${formatDealDate(offer.deal.endsAt)}` : "";

      return `
        <div class="price-row ${isBest ? "best" : ""} ${dealLabel ? "has-deal" : ""}">
          ${dealLabel ? `<div class="deal-badge">${dealLabel}</div>` : ""}
          <div>
            <strong>${offer.name}</strong>
            <span>${offer.rating.toFixed(1)} i betyg · ${offer.stock ? "I lager" : "Ej i lager"}${offer.liveUpdatedAt ? " · live" : ""}</span>
            ${dealText ? `<span class="deal-expiry">${dealText}</span>` : ""}
          </div>
          <div class="store-price">
            <strong>${formatPrice(totalPrice(offer))}</strong>
            <span>${shippingText(offer)} · ${deliveryText(offer.delivery)}</span>
          </div>
          <button type="button" data-store-link="${offer.url}">${index === 0 ? "Öppna produktsida" : "Till butik"}</button>
        </div>
      `;
    })
    .join("");
}

function renderStorageTabs(model, activeVariant) {
  return uniqueValues(model.variants.filter((variant) => variant.color === activeVariant.color).map((variant) => variant.storage))
    .map(
      (storage) => `
        <button class="tab-button ${storage === activeVariant.storage ? "active" : ""}" type="button" data-storage="${storage}">
          ${storage}
        </button>
      `
    )
    .join("");
}

function renderColorSwatches(model, activeVariant) {
  return uniqueValues(model.variants.map((variant) => variant.color))
    .map((color) => {
      const variant = model.variants.find((item) => item.color === color);
      return `
        <button class="swatch-button ${color === activeVariant.color ? "active" : ""}" type="button" data-color="${color}">
          <span style="background:${variant.colorHex}"></span>
          ${color}
        </button>
      `;
    })
    .join("");
}

function renderComparison(target = priceComparison) {
  const model = products.find((item) => item.id === state.selectedProductId) || filteredProducts()[0]?.model;

  if (!model) {
    target.innerHTML = '<div class="empty-state">Välj en telefon för att se priser hos olika affärer.</div>';
    return;
  }

  state.selectedProductId = model.id;
  const variant = chooseVariant(model);
  state.selectedColor = variant.color;
  state.selectedStorage = variant.storage;
  const offer = bestOffer(variant);

  target.innerHTML = `
    <div class="selected-product">
      <img src="${variant.image}" alt="${model.name} ${variant.color}" onerror="this.onerror=null;this.src='${fallbackImage}'" />
      <div>
        <span class="chip">${model.brand}</span>
        <h3>${model.name}</h3>
        <p>${variant.color}, ${variant.storage}. Bästa pris är ${formatPrice(offer.price)} hos ${offer.name}. Frakt kontrolleras hos butiken.</p>
      </div>
    </div>
    <div class="compact-variant-list">
      <div class="tab-row">${renderStorageTabs(model, variant)}</div>
      <div class="swatch-row">${renderColorSwatches(model, variant)}</div>
    </div>
    <div class="price-table">${priceRows(variant)}</div>
  `;
}

function render() {
  renderProducts();
  renderComparison();
}

function openProductWindow(productId) {
  const model = products.find((item) => item.id === productId);

  if (!model) {
    return;
  }

  state.selectedProductId = model.id;
  renderComparison(modalContent);
  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProductWindow() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function updateVariantChoice(event) {
  const storageButton = event.target.closest("[data-storage]");
  const colorButton = event.target.closest("[data-color]");

  if (storageButton) {
    state.selectedStorage = storageButton.dataset.storage;
    renderComparison(priceComparison);

    if (productModal.classList.contains("open")) {
      renderComparison(modalContent);
    }
  }

  if (colorButton) {
    state.selectedColor = colorButton.dataset.color;
    const model = products.find((item) => item.id === state.selectedProductId);
    const hasStorage = model?.variants.some(
      (variant) => variant.color === state.selectedColor && variant.storage === state.selectedStorage
    );

    if (!hasStorage) {
      state.selectedStorage = "";
    }

    renderComparison(priceComparison);

    if (productModal.classList.contains("open")) {
      renderComparison(modalContent);
    }
  }
}

function openStoreFromButton(event) {
  const button = event.target.closest("[data-store-link]");

  if (!button) {
    return;
  }

  event.stopPropagation();
  window.open(button.dataset.storeLink, "_blank", "noopener");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value;
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

categoryFilter.addEventListener("change", (event) => {
  state.category = event.target.value;
  render();
});

brandFilter.addEventListener("change", (event) => {
  state.brand = event.target.value;
  render();
});

colorFilter.addEventListener("change", (event) => {
  state.color = event.target.value;
  state.selectedColor = event.target.value === "alla" ? "" : event.target.value;
  render();
});

priceFilter.addEventListener("change", (event) => {
  state.price = event.target.value;
  render();
});

sortFilter.addEventListener("change", (event) => {
  state.sortBy = event.target.value;
  render();
});

stockFilter.addEventListener("change", (event) => {
  state.inStockOnly = event.target.checked;
  render();
});

refreshPricesButton.addEventListener("click", async () => {
  refreshPricesButton.disabled = true;
  updateLiveStatus("Hämtar livepriser från butikssidor...");

  try {
    const refreshResponse = await fetch("/api/refresh?limit=80", { method: "POST" });

    if (!refreshResponse.ok) {
      throw new Error("Uppdateringen misslyckades");
    }

    const result = await refreshResponse.json();
    await loadLiveProducts();
    populateFilters();
    render();
    updateLiveStatus(`Kontrollerade ${result.checked} länkar, uppdaterade ${result.updated}`);
  } catch {
    updateLiveStatus("Kunde inte hämta livepriser. Starta sidan med npm start.");
  } finally {
    refreshPricesButton.disabled = false;
  }
});

productList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-product-card]");

  if (!card) {
    return;
  }

  state.selectedProductId = card.dataset.productCard;
  state.selectedColor = state.color === "alla" ? "" : state.color;
  state.selectedStorage = "";

  render();
  openProductWindow(state.selectedProductId);
});

priceComparison.addEventListener("click", (event) => {
  updateVariantChoice(event);
  openStoreFromButton(event);
});

productModal.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-modal]")) {
    closeProductWindow();
    return;
  }

  updateVariantChoice(event);
  openStoreFromButton(event);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productModal.classList.contains("open")) {
    closeProductWindow();
  }
});

async function init() {
  await loadLiveProducts();
  populateFilters();
  render();
}

init();
