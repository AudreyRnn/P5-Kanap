// Récupération du local Storage
let localStorageProduct = JSON.parse(localStorage.getItem("item"));
var totalQuantity = 0;
var priceTotal = 0;

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
          priceTotal += item.quantityProduct * product.price;

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
          quantityChoice = item.quantityProduct;

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

          // suppression d'un produit

          itemDelete.addEventListener("click", function () {
            let newCart = localStorageProduct.splice(index, 1);
            localStorage.setItem("item", JSON.stringify(localStorageProduct));
            location.reload();
          });

          //modification quantité

          inputQuantity.addEventListener("change", function () {
            if (
              localStorageProduct[index].quantityProduct > inputQuantity.value
            ) {
              priceTotal = priceTotal - product.price;
              cartPrice.innerHTML = priceTotal;
            } else {
              priceTotal = priceTotal + product.price;
              cartPrice.innerHTML = priceTotal;
            }

            localStorageProduct[index].quantityProduct = parseInt(
              inputQuantity.value
            );
            localStorage.setItem("item", JSON.stringify(localStorageProduct));
          });
          console.log("quantityChoice");
          console.log(quantityChoice);

          // quantité totale
          let itemTotal = document.querySelector("#totalQuantity");
          itemTotal.innerHTML = totalQuantity;
          console.log("totalQuantity");
          console.log(totalQuantity);

          // prix total
          let cartPrice = document.querySelector("#totalPrice");
          cartPrice.innerHTML = priceTotal;
        })

        .catch((error) => {
          console.log("Erreur Api");
        });
    });
  }
}

getToCart();

//********************************FORMULAIRE DE COMMANDE ******************************************

function checkForm() {
  // liste des reg exp à tester

  // prénom entre 3 et 20 caractères, accents et tirets autorisés
  let firstNameReg = new RegExp("^[A-Za-zÀ-ž-]{3,20}$");

  // nom de famile entre 2 et 20 caractères, tiret, accent apostrophe et espace autorisé
  let nameReg = new RegExp("^[A-Za-zÀ-ž-' ]{2,20}$");

  // adresse chiffres autorisés +mêmes caractères que nom -- code postal à voir
  let addressReg = new RegExp("^[0-9]+[A-Za-zÀ-ž-' ]*$");

  // ville: mêmes caractéristiques que le nom
  let cityReg = new RegExp("^[A-Za-zÀ-ž-' ]{2,20}$");

  // email
  let emailReg = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  // Sélection du formulaire dans le DOM
  const form = document.querySelector(".cart__order__form");

  // écouter modification  de chaque champ avec attribut "change"
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });
  form.lastName.addEventListener("change", function () {
    validName(this);
  });
  form.address.addEventListener("change", function () {
    validAddress(this);
  });
  form.city.addEventListener("change", function () {
    validCity(this);
  });
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  // Vérification par la regex si le champ est rempli selon les règles, sinon un message d'erreur s'affiche
  const validFirstName = function (checkfirstName) {
    let firstNameError = checkfirstName.nextElementSibling;
    if (firstNameReg.test(checkfirstName.value)) {
      firstNameError.innerHTML = "";
    } else {
      firstNameError.innerHTML =
        "Merci d'indiquer votre prénom (seules les lettres sont autorisées)";
    }
  };

  const validName = function (checkName) {
    let nameError = checkName.nextElementSibling;
    if (nameReg.test(checkName.value)) {
      nameError.innerHTML = "";
    } else {
      nameError.innerHTML =
        "Merci d'indiquer votre nom (seules les lettres sont autorisées)";
    }
  };

  const validAddress = function (checkAddress) {
    let addressError = checkAddress.nextElementSibling;
    if (addressReg.test(checkAddress.value)) {
      addressError.innerHTML = "";
    } else {
      addressError.innerHTML = "Merci de renseigner votre adresse";
    }
  };

  const validCity = function (checkCity) {
    let cityError = checkCity.nextElementSibling;
    if (cityReg.test(checkCity.value)) {
      cityError.innerHTML = "";
    } else {
      cityError.innerHTML = "Merci de rentrer le nom de votre ville";
    }
  };

  const validEmail = function (checkEmail) {
    let emailError = checkEmail.nextElementSibling;
    if (emailReg.test(checkEmail.value)) {
      emailError.innerHTML = "";
    } else {
      emailError.innerHTML = "Merci de renseigner un email valide";
    }
  };
}
checkForm();

function validateForm() {
  let inputFirstName = document.getElementById("firstName");
  let inputName = document.getElementById("lastName");
  let inputAddress = document.getElementById("address");
  let inputCity = document.getElementById("city");
  let inputEmail = document.getElementById("Email");

  document.getElementById("order").addEventListener("click", (e) => {
    //création d'un tableau

    let orderProduct = [];
    for (let i in localStorageProduct) {
      orderProduct.push(localStorageProduct[i].idProduct);
    }
    console.log(orderProduct);
    const order = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: orderProduct,
    };
    // creation de la réquête post: constante avec la méthode post que l'on utilisera dans l'API

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    // Appel à l'Api pour la requête Post avec la constante options

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        document.location.href = "confirmation.html?orderId=" + data.orderId;
      })
      .catch((error) => {
        alert("une erreur est seurvenue" + error);
      });
  });
}
validateForm();
