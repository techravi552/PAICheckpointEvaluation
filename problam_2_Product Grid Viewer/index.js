const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

let products = [];
let currentPage = 1;
const itemsPerPage = 6;

async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  products = await res.json();
  render();
}

function render() {
  let filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  const sortValue = sortSelect.value;
  if (sortValue === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'rating') {
    filtered.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  productGrid.innerHTML = pageItems
    .map(product => {
      return `
        <div class="card">
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}</h3>
          <p><strong>$${product.price}</strong></p>
          <p>Rating: ${product.rating.rate} ⭐</p>
        </div>
      `;
    })
    .join('');

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

searchInput.addEventListener('input', () => {
  currentPage = 1;
  render();
});

sortSelect.addEventListener('change', () => {
  currentPage = 1;
  render();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    render();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  render();
});

fetchProducts();
