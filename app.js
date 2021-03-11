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
            0) Get all the products from the API using a fetch
            1) Display the list of items available on the page using template literals `` and .forEach
            2) Add a "add to cart button"
            3) When the button is pressed, change the style of the item and add it to another list
            4) Add "skip" button next to each item
            5) When pressed, the button should remove from the page the item not interesting from the user
            6) Add a "search bar". When the user types more than 3 chars, you should filter the content of the page to show only the items with a matching name (hint: use .filter method)
            7) Allow the user to delete items from the cart list
            
            [EXTRA]
            8) Add a "clean cart" button, to clean the whole list.
            9) Create a second "detail page" for the product. When the user clicks on a product name, the app should redirect him to the secondary page, passing the ASIN in query string
            10) In page "detail" show some details of the selected product (https://striveschool-api.herokuapp.com/books/1940026091 to fetch the details of a specific book) */

let bookStore = [];
let cart = [];
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('https://striveschool-api.herokuapp.com/books');
    const data = await res.json();
    bookStore = [...data];
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
