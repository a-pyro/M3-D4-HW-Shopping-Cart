'use strict';

console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

let userCart = [];
const entryPoint = document.getElementById('entryPoint');
const shoppingCartDom = document.getElementById('shoppingCartDom');
const totalItems = document.getElementById('totalItems');
const totalAmount = document.getElementById('totalAmount');
const searchField = document.querySelector('.form-inline input');
const deleteCartBtn = document.getElementById('deleteCartBtn');

window.addEventListener('DOMContentLoaded', getData);
searchField.addEventListener('keyup', filterBooks);
deleteCartBtn.addEventListener('click', wipeCart);
async function getData() {
  try {
    const res = await fetch('https://striveschool-api.herokuapp.com/books');
    const data = await res.json();
    console.log(data);
    renderData(data);
    addCardBtnsEventListeners();
  } catch (error) {
    console.log(error);
  }
}

function renderData(data) {
  entryPoint.innerHTML = data.reduce((prev, book) => {
    const { asin, category, img: url, price, title } = book;
    return prev + alternativeCard(asin, category, url, price, title);
  }, '');

  /* data.forEach((book) => {
    const { asin, category, img: url, price, title } = book;
    entryPoint.insertAdjacentHTML(
      'beforeend',
      CardComponent(asin, category, url, price, title)
    );
  }); */
}

function CardComponent(asin, category, url, price, title) {
  return `
  <div class="col animate__animated animate__faster animate__fadeInUp m-3">
    <div class="card">
      <img src="${url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h6 class="card-title">${title}</h6>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Category: ${category}</li>
        <li class="list-group-item" data-attribute="${asin}">Asin: <span class="asin">${asin}</span></li>
        <li class="list-group-item">Price: ${price}€</li>
      </ul>
      <div class="card-body">
        <div class="btn-group w-100">
            <button type="button" class="btn btn-sm btn-outline-secondary add-cart-btn">Cart</button>
            <button type="button" class="btn btn-sm btn-outline-secondary skip-btn">Skip</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

function alternativeCard(asin, category, url, price, title) {
  return `
  <div class="card mb-3 mr-3 overflow-hidden" style="width: 540px; height: 28vh;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img class="img-fluid img-card-top" src="${url}" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <div class="btn-group">
          <span class="asin d-none">${asin}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary add-cart-btn">Cart</button>
            <button type="button" class="btn btn-sm btn-outline-secondary skip-btn">Skip</button>
            <a href="details.html?asin=${asin}" class="btn btn-sm btn-outline-secondary">Details</a>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function addCardBtnsEventListeners() {
  const addCartBtns = document.querySelectorAll('.add-cart-btn');
  const skipBtns = document.querySelectorAll('.skip-btn');
  addCartBtns.forEach((btn) => btn.addEventListener('click', addToCart));
  skipBtns.forEach((btn) => btn.addEventListener('click', skipBook));
}

function addToCart(e) {
  const card = e.target.closest('.card');
  card.classList.add('added-to-cart');
  //! animazioni e style
  const asinDom = card.querySelector('.asin');
  const asin = asinDom.innerText;
  console.log(asin);
  fetch(`https://striveschool-api.herokuapp.com/books/${asin}`)
    .then((res) => res.json())
    .then((data) => {
      userCart.push(data);
      console.log(userCart);
      renderShoppingCart(userCart);
      addDeleteEvent();
      calcTotalAmout(userCart);
    })
    .catch((err) => console.log(err));
}

function skipBook(e) {
  console.log(e.target);
  // const col = e.target.closest('.col');
  const card = e.target.closest('.card.mb-3'); //alternative card

  card.remove();
  // ! animazioni
}

function renderShoppingCart(userCart) {
  shoppingCartDom.innerHTML = userCart.reduce((acc, book) => {
    const { asin, category, img: url, price, title } = book;
    return acc + LiComponent(asin, category, url, price, title);
  }, '');

  /*  userCart.forEach((book) => {
    const { asin, category, img: url, price, title } = book;
    shoppingCartDom.innerHTML += LiComponent(asin, category, url, price, title);
  }); */
}

function LiComponent(asin = 0, category = '', url = '', price, title) {
  return `
    <li class="list-group-item"> Asin <span class="asin-cart">${asin}</span> <br> ${title} <br> ${price}€ <br><i class="fas fa-trash-alt"></i></li>
  `;
}

function addDeleteEvent() {
  const removeBtns = document.querySelectorAll('.fa-trash-alt');
  removeBtns.forEach((btn) => btn.addEventListener('click', removeFromCart));
}

function removeFromCart(e) {
  const li = e.target.closest('.list-group-item');
  const asin = li.querySelector('.asin-cart');
  const asinValue = asin.innerText;
  console.log(asinValue);
  const itemtoRemove = userCart.findIndex((book) => book.asin === asinValue);
  userCart.splice(itemtoRemove, 1);
  renderShoppingCart(userCart);
  addDeleteEvent();
  console.log(userCart);
  // update ui
  const bookInUi = document.querySelector(`li[data-attribute="${asinValue}"]`);
  const card = bookInUi.closest('.card');
  card.classList.remove('added-to-cart');
  calcTotalAmout();
}

function calcTotalAmout() {
  const total =
    userCart.reduce((acc, cv) => acc + parseFloat(cv.price), 0) || 0;
  totalAmount.innerText = `Total ${total.toFixed(2)}€`;
  totalItems.innerText = `${userCart.length} item${
    userCart.length === 1 ? '' : 's'
  }`;
}

// per dropdown
$('#shoppingCartDom').on('click', function (event) {
  // The event won't be propagated up to the document NODE and
  // therefore delegated events won't be fired
  event.stopPropagation();
});

function filterBooks(e) {
  const query = e.target.value;

  if (query.length > 3) {
    if (entryPoint.children.length === 1) return;
    console.log(query);
    fetch('https://striveschool-api.herokuapp.com/books')
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        );
        console.log(filteredData);
        renderData(filteredData);
        addCardBtnsEventListeners();
      })
      .catch(console.log);
  }

  if (!query) getData();
}
function wipeCart(e) {
  // const listItemAsins = document.querySelectorAll('.asin');
  const listItemAsins = document.querySelectorAll('.card.added-to-cart');
  listItemAsins.forEach((item) => item.classList.remove('added-to-cart'));
  userCart.length = 0;
  shoppingCartDom.innerHTML = '';
  calcTotalAmout();
}
