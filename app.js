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
const unknownStores = document.querySelector("#unknown-stores");
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
  if (!hasTrustedPrice(offer)) {
    return Number.POSITIVE_INFINITY;
  }

  return offer.price + (Number.isFinite(offer.shipping) ? offer.shipping : 0);
}

function formatPrice(value) {
  return currency.format(value);
}

function hasTrustedPrice(offer) {
  return Boolean(offer?.liveUpdatedAt) && Number.isFinite(offer.price);
}

function priceText(offer) {
  return hasTrustedPrice(offer) ? formatPrice(totalPrice(offer)) : "Pris hämtas hos butik";
}

function trustedOffers(variant) {
  return variant.offers.filter(hasTrustedPrice);
}

function hasTrustedVariant(variant) {
  return trustedOffers(variant).length > 0;
}

function compareOfferPrice(a, b) {
  const aTrusted = hasTrustedPrice(a);
  const bTrusted = hasTrustedPrice(b);

  if (aTrusted && !bTrusted) return -1;
  if (!aTrusted && bTrusted) return 1;
  if (!aTrusted && !bTrusted) return a.name.localeCompare(b.name, "sv-SE");

  return totalPrice(a) - totalPrice(b);
}

function stockText(offer) {
  if (!offer?.liveUpdatedAt || typeof offer.stock !== "boolean") {
    return "Lagerstatus visas hos butik";
  }

  return offer.stock ? "I lager" : "Ej i lager";
}

function linkTypeText(offer) {
  return offer.exactVariant ? "Exakt variantlänk" : "Butikslänk, kontrollera variant";
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
  return [...trustedOffers(variant)].sort(compareOfferPrice)[0];
}

function bestVariant(model, variants = matchingVariants(model)) {
  return [...variants].sort((a, b) => compareOfferPrice(bestOffer(a), bestOffer(b)))[0];
}

function uniqueValues(values) {
  return [...new Set(values)].filter(Boolean);
}

function priceMatches(variant) {
  if (state.price === "alla") {
    return true;
  }

  const offer = bestOffer(variant);

  if (!offer) {
    return false;
  }

  const price = totalPrice(offer);

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
    const matchesStock = !state.inStockOnly || variant.offers.some((offer) => offer.liveUpdatedAt && offer.stock === true);

    return hasTrustedVariant(variant) && matchesColor && matchesStock && priceMatches(variant);
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
        return a.model.name.localeCompare(b.model.name, "sv-SE");
      }

      if (state.sortBy === "delivery") {
        return totalPrice(offerA) - totalPrice(offerB);
      }

      return compareOfferPrice(offerA, offerB);
    });
}

function populateFilters() {
  const pricedProducts = products.filter((model) => model.variants.some(hasTrustedVariant));
  const brands = uniqueValues(pricedProducts.map((model) => model.brand)).sort();
  const colors = uniqueValues(pricedProducts.flatMap((model) => model.variants.filter(hasTrustedVariant).map((variant) => variant.color))).sort();

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
      const trustedPrice = hasTrustedPrice(offer);

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
              <div class="shop-line"><span>${trustedPrice ? `Bekräftat hos ${offer.name}` : "Pris ej bekräftat"}</span><strong>${priceText(offer)}</strong></div>
              <div class="shop-line"><span>${trustedOffers(variant).length} bekräftat pris</span><strong>Livekontrollerat</strong></div>
            </div>
          </div>
          <div class="price-block">
            <div>
              <div class="price">${priceText(offer)}</div>
              <div class="delivery">${shippingText(offer)} · ${deliveryText(offer.delivery)}</div>
              ${dealText ? `<div class="card-deal-expiry">${dealText}</div>` : ""}
              <div class="stock ${offer.liveUpdatedAt && offer.stock === false ? "out" : ""}">${stockText(offer)}</div>
            </div>
            <button type="button">Visa priser</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderUnknownStores() {
  if (!unknownStores) {
    return;
  }

  const unknown = new Map();

  products.forEach((model) => {
    model.variants.forEach((variant) => {
      variant.offers.forEach((offer) => {
        if (hasTrustedPrice(offer)) {
          return;
        }

        const current = unknown.get(offer.name) || { links: 0, exact: 0, examples: new Set() };
        current.links += 1;
        current.exact += offer.exactVariant ? 1 : 0;

        if (current.examples.size < 3) {
          current.examples.add(model.name);
        }

        unknown.set(offer.name, current);
      });
    });
  });

  const rows = [...unknown.entries()].sort((a, b) => b[1].links - a[1].links);

  if (!rows.length) {
    unknownStores.innerHTML = "<p>Alla butikslänkar som visas har bekräftat pris.</p>";
    return;
  }

  unknownStores.innerHTML = `
    <p>De här butikerna finns i katalogen, men deras pris visas inte eftersom priset inte kunde bekräftas säkert.</p>
    <div class="unknown-list">
      ${rows
        .map(
          ([store, info]) => `
            <div class="unknown-row">
              <div>
                <strong>${store}</strong>
                <span>${info.exact} exakta variantlänkar utan pris · exempel: ${[...info.examples].join(", ")}</span>
              </div>
              <em>${info.links} länkar</em>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function chooseVariant(model) {
  const variants = matchingVariants(model);
  const preferredColor = state.selectedColor || (state.color !== "alla" ? state.color : "");
  const preferredStorage = state.selectedStorage;

  return (
    variants.find((variant) => variant.color === preferredColor && variant.storage === preferredStorage) ||
    variants.find((variant) => variant.color === preferredColor) ||
    variants.find((variant) => variant.storage === preferredStorage) ||
    bestVariant(model, variants)
  );
}

function priceRows(variant) {
  const sortedOffers = trustedOffers(variant).sort(compareOfferPrice);

  if (!sortedOffers.length) {
    return '<div class="empty-state">Inget bekräftat pris för den här varianten.</div>';
  }

  const bestTotal = totalPrice(sortedOffers[0]);

  return sortedOffers
    .map((offer, index) => {
      const isBest = totalPrice(offer) === bestTotal;
      const dealLabel = offer.deal?.label || "";
      const dealText = offer.deal?.endsAt ? `Erbjudande till ${formatDealDate(offer.deal.endsAt)}` : "";
      const trustedPrice = hasTrustedPrice(offer);

      return `
        <div class="price-row ${isBest && trustedPrice ? "best" : ""} ${dealLabel ? "has-deal" : ""}">
          ${dealLabel ? `<div class="deal-badge">${dealLabel}</div>` : ""}
          <div>
            <strong>${offer.name}</strong>
            <span>${linkTypeText(offer)} · ${stockText(offer)}${offer.liveUpdatedAt ? " · live hämtat" : " · ej livekontrollerat"}</span>
            ${dealText ? `<span class="deal-expiry">${dealText}</span>` : ""}
          </div>
          <div class="store-price">
            <strong>${priceText(offer)}</strong>
            <span>${shippingText(offer)} · ${deliveryText(offer.delivery)}</span>
          </div>
            <button type="button" data-store-link="${offer.url}">${offer.exactVariant ? "Öppna exakt sida" : "Öppna butikslänk"}</button>
        </div>
      `;
    })
    .join("");
}

function renderStorageTabs(model, activeVariant) {
  return uniqueValues(model.variants.filter((variant) => hasTrustedVariant(variant) && variant.color === activeVariant.color).map((variant) => variant.storage))
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
  return uniqueValues(model.variants.filter(hasTrustedVariant).map((variant) => variant.color))
    .map((color) => {
      const variant = model.variants.find((item) => hasTrustedVariant(item) && item.color === color);
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
  const visibleProducts = filteredProducts();
  let model = products.find((item) => item.id === state.selectedProductId);

  if (!model || !matchingVariants(model).length) {
    model = visibleProducts[0]?.model;
  }

  if (!model) {
    target.innerHTML = '<div class="empty-state">Inga telefoner med bekräftat pris just nu.</div>';
    return;
  }

  state.selectedProductId = model.id;
  const variant = chooseVariant(model);
  if (!variant) {
    target.innerHTML = '<div class="empty-state">Inga bekräftade priser matchar dina filter.</div>';
    return;
  }

  state.selectedColor = variant.color;
  state.selectedStorage = variant.storage;
  const offer = bestOffer(variant);
  const trustedPrice = hasTrustedPrice(offer);

  target.innerHTML = `
    <div class="selected-product">
      <img src="${variant.image}" alt="${model.name} ${variant.color}" onerror="this.onerror=null;this.src='${fallbackImage}'" />
      <div>
        <span class="chip">${model.brand}</span>
        <h3>${model.name}</h3>
        <p>${variant.color}, ${variant.storage}. ${trustedPrice ? `Bekräftat pris är ${priceText(offer)} hos ${offer.name}.` : "Inget bekräftat livepris ännu."} Frakt och leverans kontrolleras hos butiken.</p>
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
  renderUnknownStores();
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
    updateLiveStatus(
      result.checked
        ? `Kontrollerade ${result.checked} exakta länkar, uppdaterade ${result.updated}`
        : `Inga exakta variantlänkar att hämta pris från. ${result.skipped || 0} butikslänkar hoppades över.`
    );
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
