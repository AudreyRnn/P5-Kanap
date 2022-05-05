// Récupération du local Storage
let localStorageProduct = JSON.parse(localStorage.getItem("item"));
var totalQuantity = 0;

console.table(localStorageProduct);
const emptyCart = document.querySelector("#cart__items");

function getToCart() {
  // si panier vide
  if (localStorageProduct === null || localStorageProduct === 0) {
    const yourCartIsEmpty = `<p> Votre panier ne contient aucun article<p>`;
    emptyCart.innerHTML = yourCartIsEmpty;
    return [];
  } else {
    //si panier non vide
    localStorageProduct.forEach((item, index) => {
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
          cartArticle.setAttribute("data-id", product._id);

          //insertion de la div
          let itemDivImg = document.createElement("div");
          cartArticle.appendChild(itemDivImg);
          itemDivImg.setAttribute("class", "cart__item__img");

          // insertion de l'image
          let itemImg = document.createElement("img");
          itemDivImg.appendChild(itemImg);
          itemImg.src = product.imageUrl;
          itemImg.alt = product.altTxt;

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
          itemPrice.innerHTML = product.price + " €";

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
          itemQtity.innerText = "Quantité : "; 

          // input quantité
          let inputQuantity = document.createElement("input");
          contentSettingsQuantity.appendChild(inputQuantity);
          inputQuantity.value = item.quantityProduct;
          inputQuantity.className = "itemQuantity";
          inputQuantity.setAttribute("type", "number");
          inputQuantity.setAttribute("min", "1");
          inputQuantity.setAttribute("max", "100");
          inputQuantity.setAttribute("name", "itemQuantity");
          totalQuantity += item.quantityProduct;
          console.log(item.quantityProduct);

          // // insertion de la div delete

          let contentSettingsDelete = document.createElement("div");
          contentSetting.appendChild(contentSettingsDelete);
          contentSettingsDelete.className =
            "cart__item__content__settings__delete";

          // // insertion de la balise "p" delete

          let itemDelete = document.createElement("p");
          contentSettingsDelete.appendChild(itemDelete);
          itemDelete.className = "deleteItem ";
          itemDelete.innerText = "Supprimer";
          itemDelete.addEventListener("click", function () {
            console.log(index);
            let newCart = localStorageProduct.splice(index, 1);
            localStorage.setItem("item", JSON.stringify(localStorageProduct));
            location.reload();
          });

          let itemTotal = document.querySelector("#totalQuantity");
          itemTotal.innerHTML = totalQuantity;
          console.log(totalQuantity);

          let priceTotal = document.querySelector("#totalPrice");
          priceTotal.innerHTML = totalQuantity * resultatApi.price;
          
        
          
        })

        .catch((error) => {
          console.log("Erreur Api");
        });
    });
  }
}

getToCart();


//**************************************************************************

// formulaire

// nom et prénom
// RegEx("^[a-z]+[ -']?[[a-z]+[ -']?]*[a-z]+$", "gi");

// // tester un email
// ^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$

// tester un code postal

// ^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$
