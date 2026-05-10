const params = new URLSearchParams(window.location.search);
const shop = params.get("shop") || "Butik";
const product = params.get("product") || "Produkt";
const price = Number(params.get("price") || 0);
const stock = params.get("stock") || "I lager";
const details = document.querySelector("#store-details");

const currency = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0
});

document.title = `${shop} - ${product}`;
document.querySelector("#store-title").textContent = shop;

details.innerHTML = `
  <div>
    <span>Produkt</span>
    <strong>${product}</strong>
  </div>
  <div>
    <span>Totalpris</span>
    <strong>${currency.format(price)}</strong>
  </div>
  <div>
    <span>Status</span>
    <strong>${stock}</strong>
  </div>
  <button type="button">Lägg i varukorg</button>
`;
