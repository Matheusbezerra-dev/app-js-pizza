let MODALQT = 1;  
const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

//listagem das pizzas
pizzaJson.map((pizza, i) => {
  const pizzaItem = qS('.pizza-item').cloneNode(true);
  const pizzaQS = (el) => pizzaItem.querySelector(el);
  pizzaItem.setAttribute('data-key', i);
  pizzaQS('.pizza-item--img img').src = pizza.img;
  pizzaQS('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
  pizzaQS('.pizza-item--name').innerHTML = pizza.name;
  pizzaQS('.pizza-item--desc').innerHTML = pizza.description;

  pizzaQS('a').addEventListener(('click'), (e) => {
    e.preventDefault();

    const key = e.target.closest('.pizza-item').getAttribute('data-key');
    MODALQT = 1;

    qS('.pizzaBig img').src = pizzaJson[key].img;
    qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    qS('.pizzaInfo--size.selected').classList.remove('selected');
    let size = qSAll('.pizzaInfo--size');
    size.forEach((sizes, index) => {
      if (index == 2) {
        sizes.classList.add('selected');
      } 
      sizes.querySelector('span').innerHTML = pizzaJson[key].sizes[index];
    });

    qS('.pizzaInfo--qt').innerHTML = MODALQT;
    qS('.pizzaWindowArea').style.opacity = 0;
    qS('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      qS('.pizzaWindowArea').style.opacity = 1;
    }, 400)
  });
  qS('.pizza-area').append(pizzaItem);
});

//evento do modal

const closeModal = () => {
  qS('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    qS('.pizzaWindowArea').style.display = 'none';
  }, 400)
};

const bntClose = qSAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton');

bntClose.forEach((close) => {
  close.addEventListener('click', closeModal);
});
