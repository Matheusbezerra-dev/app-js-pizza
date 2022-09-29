const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

pizzaJson.map((pizza, i) => {
  let pizzaItem = qS('.pizza-item').cloneNode(true);
  pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
  qS('.pizza-area').append(pizzaItem);
});