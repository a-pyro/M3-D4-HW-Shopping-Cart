'use strict';

console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

/*             You are creating the "shopping cart experience" for a Online Marketplace.
            You have the list of the available books from the current API:
            https://striveschool-api.herokuapp.com/books
            What you have to do is:
           XX 0) Get all the products from the API using a fetch
           XX 1) Display the list of items available on the page using template literals `` and .forEach
           XX 2) Add a "add to cart button"
            3) When the button is pressed, change the style of the item and add it to another list
           XX 4) Add "skip" button next to each item
           XX 5) When pressed, the button should remove from the page the item not interesting from the user
            6) Add a "search bar". When the user types more than 3 chars, you should filter the content of the page to show only the items with a matching name (hint: use .filter method)
            7) Allow the user to delete items from the cart list
            
            [EXTRA]
            8) Add a "clean cart" button, to clean the whole list.
            9) Create a second "detail page" for the product. When the user clicks on a product name, the app should redirect him to the secondary page, passing the ASIN in query string
            10) In page "detail" show some details of the selected product (https://striveschool-api.herokuapp.com/books/1940026091 to fetch the details of a specific book) */
const entryPoint = document.getElementById('entryPoint');
let cart = [];
window.addEventListener('DOMContentLoaded', getData);

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
  data.forEach((book) => {
    const { asin, category, img: url, price, title } = book;
    entryPoint.insertAdjacentHTML(
      'beforeend',
      CardComponent(asin, category, url, price, title)
    );
  });
}

function CardComponent(asin, category, url, price, title) {
  return `
  <div class="col animate__animated animate__faster animate__fadeInUp m-3">
    <div class="card">
      <img src="${url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h6 class="card-title">${title}</h6>
        <p class="card-text">Brief book description.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Category: ${category}</li>
        <li class="list-group-item">Asin: ${asin}</li>
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

function addCardBtnsEventListeners() {
  const addCartBtns = document.querySelectorAll('.add-cart-btn');
  const skipBtns = document.querySelectorAll('.skip-btn');
  addCartBtns.forEach((btn) => btn.addEventListener('click', addToCart));
  skipBtns.forEach((btn) => btn.addEventListener('click', skipBook));
}

function addToCart(e) {
  console.log(e.target);
  const card = e.target.closest('.card');
  card.classList.add('added-to-cart');
  //! animazioni e style
}

function skipBook(e) {
  console.log(e.target);
  const col = e.target.closest('.col');
  col.remove();
  // ! animazioni
}
