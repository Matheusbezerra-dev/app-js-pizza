const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);
let MODALQT = 1;
const sizeSelected = qSAll('.pizzaInfo--size');
const bntClose = qSAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton');
let carItem = [];
let modalKey = 0;

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
    modalKey = key;
    MODALQT = 1;

    qS('.pizzaBig img').src = pizzaJson[key].img;
    qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    qS('.pizzaInfo--size.selected').classList.remove('selected');
    sizeSelected.forEach((sizes, index) => {
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


bntClose.forEach((close) => {
  close.addEventListener('click', closeModal);
});

qS('.pizzaInfo--qtsub').addEventListener('click', () => {
  if (MODALQT > 1) {
    MODALQT = MODALQT - 1;
    qS('.pizzaInfo--qt').innerHTML = MODALQT;
  }
});

qS('.pizzaInfo--qtsum').addEventListener('click', () => {

  MODALQT = MODALQT + 1;
  qS('.pizzaInfo--qt').innerHTML = MODALQT;
});

sizeSelected.forEach((sizes) => {
  sizes.addEventListener('click', () => {
    qS('.pizzaInfo--size.selected').classList.remove('selected');
    sizes.classList.add('selected');
  });
});

qS('.pizzaInfo--addButton').addEventListener('click', () => {
  let size = parseInt(qS('.pizzaInfo--size.selected').getAttribute('data-key'));

  let identifier = pizzaJson[modalKey].id + '@' + size;

  let key = carItem.findIndex((item) => item.identifier == identifier);

  { key > -1 ? carItem[key].qt += MODALQT :
    carItem.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: MODALQT
    });
  };

  updateCart();
  closeModal();
});

const updateCart = () => {
  if (carItem.length> 0) {
    qS('aside').classList.add('show')
    for (let i in carItem) {
      let pizzaItem = pizzaJson.find((item) => item.id == carItem[i].id);
      
      console.log(pizzaItem);
    }
  } else {
    qS('aside').classList.remove('show') 
  }
};
