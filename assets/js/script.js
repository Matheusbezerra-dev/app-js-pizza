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

qS('.menu-openner').addEventListener('click', () => {
  if (carItem.length > 0) {     
    qS('aside').style.left = '0';
  }
});

qS('.menu-closer').addEventListener('click', () => {
  qS('aside').style.left = '100vw';
});

const updateCart = () => {
  qS('.menu-openner span').innerHTML = carItem.length;

  if (carItem.length > 0) {
    qS('aside').classList.add('show');
    qS('.cart').innerHTML = '';

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for (let i in carItem) {
      let pizzaItem = pizzaJson.find((item) => item.id == carItem[i].id);
      subtotal = (subtotal + pizzaItem.price) * carItem[i].qt;
      let car = qS('.models .cart--item').cloneNode(true);
      let pizzaSize;
      switch(carItem[i].size){
        case 0:
          pizzaSize = 'P';
          break;
        case 1: 
          pizzaSize = 'M';
          break;
        case 2: 
          pizzaSize = 'G';
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSize})`

      car.querySelector('img').src = pizzaItem.img;
      car.querySelector('.cart--item-nome').innerHTML = pizzaName;
      car.querySelector('.cart--item--qt').innerHTML = carItem[i].qt;
      car.querySelector('.cart--item-qtsub').addEventListener('click', () => {
        if (carItem[i].qt > 1) {
          carItem[i].qt = carItem[i].qt - 1
        } else {
          carItem.splice(i, 1)
        }        
        updateCart();
      });

      car.querySelector('.cart--item-qtsum').addEventListener('click', () => {
        carItem[i].qt = carItem[i].qt + 1;
        updateCart();
      });

      qS('.cart').append(car)
    }
    
    desconto = subtotal * 0.1;
    total = subtotal - desconto;
    qS('.subtotal span:last-child').innerHTML =`R$ ${subtotal.toFixed(2)}`;
    qS('.desconto span:last-child').innerHTML =`R$ ${desconto.toFixed(2)}`;
    qS('.total span:last-child').innerHTML =`R$ ${total.toFixed(2)}`;

  } else {
    qS('aside').classList.remove('show') 
    qS('aside').style.left = '100vw'
  }
};
