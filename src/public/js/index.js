const productsContainer = document.querySelector('#products-container');
const socket = io();
socket.emit('client:message', 'NEW USER CONNECTED');

socket.emit('client:products');

socket.on('server:products', async (Products) => {
  addProductsToRealTime(Products);
});

const addProductsToRealTime = (products) => {
  let html = '';
  products.forEach(p => {
    html += `
  <div>
  <h1> Producto </h1>
  <p>title: ${p.title} </p>
  <p>description: ${p.description} </p>
  <p>price: ${p.price} </p>
  <p>status: ${p.status} </p>
  <p>category: ${p.category} </p>
  <p>thumbnail: ${p.thumbnail} </p>
  </div>`
    productsContainer.innerHTML = html;
  });
};

