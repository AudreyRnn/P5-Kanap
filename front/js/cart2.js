// Récupération du local Storage
let localStorageProduct = JSON.parse(localStorage.getItem("item"));
console.log(localStorageProduct);
const cartItems = document.getElementById("cart__items");

function getToCart() {
  // si panier vide
  if (localStorageProduct === null || localStorageProduct === 0) {
    cartItems.innerHTML= `<p> Votre panier ne contient aucun article<p>`;
  
  } else {
    //si panier non vide
    localStorageProduct.forEach((item) => {
      console.log(item.idProduct);
      fetch("http://localhost:3000/api/products/" + item.idProduct)
        .then(function (response) {
          return response.json();
        })

        .then(function (resultatApi) {
          let product = {
              'color':item.color,
              'quantity': parseInt(item.quantity),
              'name':resultatApi.name,
              'price':resultatApi.price,
              'imgUrl':resultatApi.imageUrl,
              '_id':idProduct,
          };
          //On remplis la section cart__items et remplis avec la variable précédemment créé
                    cartItems.innerHTML += `
                    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                    <div class="cart__item__img">
                    <img src="${product.imgUrl}" alt="Photographie du canapé ${product.name}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p id='productPrice_${product._id}_${product.color}'>${product.price * parseInt(product.quantity)} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete" data-id="${product._id}" data-color="${product.color}">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`});});}}