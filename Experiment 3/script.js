const products = [
  { name: "Laptop", category: "electronics", price: 999, desc: "High performance laptop for work and play." },
  { name: "Shirt", category: "clothing", price: 25, desc: "Comfortable cotton shirt in various sizes." },
  { name: "Headphones", category: "electronics", price: 199, desc: "Noise-cancelling headphones for music lovers." }
];

// Render products on page load
window.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});

document.getElementById('filter').addEventListener('change', (e) => {
  const selected = e.target.value;
  const filtered = selected === 'all' ? products : products.filter(p => p.category === selected);
  renderProducts(filtered);
});

function renderProducts(productsArr) {
  const container = document.getElementById('products-container');
  if (productsArr.length === 0) {
    container.innerHTML = `<div class="product-card"><p>No products found.</p></div>`;
    return;
  }
  container.innerHTML = productsArr.map(p => `
    <div class="product-card">
      <div class="product-title">${p.name}</div>
      <div class="product-category">${capitalize(p.category)}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-price"><strong>Price:</strong> $${p.price}</div>
    </div>
  `).join('');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}