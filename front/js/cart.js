// Récupération du local Storage
let localStorageProduct = JSON.parse(localStorage.getItem("item"));
console.log(localStorageProduct);
const emptyCart = document.querySelector("#cart__items");

function getToCart() {
  // si panier vide
  if (localStorageProduct === null || localStorageProduct === 0) {
    const yourCartIsEmpty = `<p> Votre panier ne contient aucun article<p>`;
    emptyCart.innerHTML = yourCartIsEmpty;
  } else {
    //si panier non vide
    localStorageProduct.forEach((item) => {
      console.log(item.idProduct);
      fetch("http://localhost:3000/api/products/" + item.idProduct)
        .then(function (response) {
          return response.json();
        })

        .then(function (resultatApi) {
          let product = resultatApi;

          // insertion de "l'article"
          let cartArticle = document.createElement("article");
          emptyCart.appendChild(cartArticle);
          cartArticle.className = "cart__item";
          cartArticle.setAttribute("data-id", resultatApi._id);

          //insertion de la div
          let itemDivImg = document.createElement("div");
          cartArticle.appendChild(itemDivImg);
          itemDivImg.setAttribute("class", "cart__item__img");

          // insertion de l'image
          let itemImg = document.createElement("img");
          itemDivImg.appendChild(itemImg);
          itemImg.src = resultatApi.imageUrl;
          itemImg.alt = resultatApi.altTxt;

          // insertion balise div content
          let itemContent = document.createElement("div");
          cartArticle.appendChild(itemContent);
          itemContent.className = "cart__item__content";

          //insertion balise div "descripion "
          let itemContentDescription = document.createElement("div");
          itemContent.appendChild(itemContentDescription);
          itemContentDescription.className = "cart__item__content__description";

          // insertion titre h2
          let itemName = document.createElement("h2");
          itemContentDescription.appendChild(itemName);
          itemName.innerText = resultatApi.name;

          // Insertion de la couleur
          let itemColor = document.createElement("p");
          itemName.appendChild(itemColor);
          itemColor.innerText = item.colorProduct;

          //insertion du prix
          let itemPrice = document.createElement("p");
          itemContentDescription.appendChild(itemPrice);
          itemPrice.innerHTML = resultatApi.price + " €";

          // insertion balise div content settings
          let contentSetting = document.createElement("div");
          cartArticle.appendChild(contentSetting);
          contentSetting.className = "cart__item__content__settings";

          // insertion balise settings quantity
          let contentSettingsQuantity = document.createElement("div");
          contentSetting.appendChild(contentSettingsQuantity);
          contentSettingsQuantity.className =
            "cart__item__content__settings__quantity";

          // Insertion de la Quantité
          let itemQtity = document.createElement("p");
          contentSettingsQuantity.appendChild(itemQtity);
          itemQtity.innerText = "Quantité : " + item.quantityProduct;

          // input quantité
          let inputQuantity = document.createElement("input");
          contentSettingsQuantity.appendChild(inputQuantity);
          inputQuantity.value = item.quantityProduct;
          inputQuantity.className = "itemQuantity";
          inputQuantity.setAttribute("type", "number");
          inputQuantity.setAttribute("min", "1");
          inputQuantity.setAttribute("max", "100");
          inputQuantity.setAttribute("name", "itemQuantity");

          // insertion de la div delete

          let contentSettingsDelete = document.createElement("div");
          contentSetting.appendChild(contentSettingsDelete);
          contentSettingsDelete.className =
            "cart__item__content__settings__delete";

          // insertion de la balise "p" delete

          let itemDelete = document.createElement("p");
          contentSettingsDelete.appendChild(itemDelete);
          itemDelete.className = "deleteItem ";
          itemDelete.innerText = "Supprimer";
        })

        .catch((error) => {
          console.log("Erreur Api");
        });
    });
  }
}

getToCart();
