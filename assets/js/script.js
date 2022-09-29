const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

pizzaJson.map((pizza, i) => {
  const pizzaItem = qS('.pizza-item').cloneNode(true);
  const pizzaQS = (el) => pizzaItem.querySelector(el);  
  pizzaQS('.pizza-item--img img').src = pizza.img;
  pizzaQS('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
  pizzaQS('.pizza-item--name').innerHTML = pizza.name;
  pizzaQS('.pizza-item--desc').innerHTML = pizza.description;
  pizzaQS('a').addEventListener(('click'), (e) => {
    e.preventDefault();
    qS('.pizzaWindowArea').style.opacity = 0;
    qS('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      qS('.pizzaWindowArea').style.opacity = 1;
    }, 400)
  });
  qS('.pizza-area').append(pizzaItem);
});