// Récupération du local Storage
let localStorageProduct = JSON.parse(localStorage.getItem("item"));
// création de variables
var totalQuantity = 0;
var priceTotal = 0;

console.table(localStorageProduct);
const emptyCart = document.querySelector("#cart__items");

function getToCart() {
  // si panier vide afffichage texte
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
          // quantityChoice = item.quantityProduct;

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

          ///////////// suppression d'un produit/////////////

          itemDelete.addEventListener("click", function () {
            let newCart = localStorageProduct.splice(index, 1);
            localStorage.setItem("item", JSON.stringify(localStorageProduct));
            location.reload();
          });

          //////modification quantité/////////

          inputQuantity.addEventListener("change", function () {
            if (
              localStorageProduct[index].quantityProduct > inputQuantity.value
            ) {
              priceTotal = priceTotal - product.price;
              cartPrice.innerHTML = priceTotal;
              totalQuantity--;
            } else {
              priceTotal = priceTotal + product.price;
              cartPrice.innerHTML = priceTotal;
              totalQuantity++;
            }

            document.getElementById("totalQuantity").innerHTML = totalQuantity;

            localStorageProduct[index].quantityProduct = parseInt(
              inputQuantity.value
            );
            localStorage.setItem("item", JSON.stringify(localStorageProduct));
          });

          ////  affichage quantité totale////////
          let itemTotal = document.querySelector("#totalQuantity");
          itemTotal.innerHTML = totalQuantity;

          // affichage  prix total
          let cartPrice = document.querySelector("#totalPrice");
          cartPrice.innerHTML = priceTotal;
        })

        .catch((error) => {
          console.log(`message d'erreur ${error}`);
          alerte("Erreur dans le chargement de la page.");
        });
    });
  }
}
getToCart();

//////////////// FORMULAIRE////////////////////

// Liste des variabls RegEx

//prénom , nom et ville
let textReg = /^[A-Za-zÀ-ž-'\s]{2,35}$/;
//adresse
let addressReg = /^[0-9A-Za-zÀ-ž-'\s]{3,40}$/;
//mail
let emailReg = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// récupération des id des inputs

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// vérification des données par tests des expressions régulières

// prénom
firstName.addEventListener("input", (e) => {
  e.preventDefault();
  if (textReg.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").textContent =
      "Merci de saisir un prénom valide (pas de chiffres ni de carctères spéciaux autre que - et '";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").textContent = "";
    return true;
  }
});

// nom
lastName.addEventListener("input", (e) => {
  e.preventDefault();
  if (textReg.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").textContent =
      "Merci de saisir un nom valide (pas de chiffres ni de carctères spéciaux autre que - et '";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").textContent = "";
    return true;
  }
});
//adresse
address.addEventListener("input", (e) => {
  e.preventDefault();
  if (addressReg.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").textContent =
      "Merci de saisir votre adresse ex: 10 rue Voltaire";
    return false;
  } else {
    document.getElementById("addressErrorMsg").textContent = "";
    return true;
  }
});
// ville
city.addEventListener("input", (e) => {
  e.preventDefault();
  if (textReg.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").textContent =
      "Merci de saisir le nom de votre ville";
    return false;
  } else {
    document.getElementById("cityErrorMsg").textContent = "";
    return true;
  }
});

// adresse mail
email.addEventListener("input", (e) => {
  e.preventDefault();
  if (emailReg.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").textContent =
      "Merci de saisir une adresse mail valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").textContent = "";
    return true;
  }
});

//////////***********/ COMMANDE ******/////
function sendForm() {
  //sélection du bouton
  const btnOrder = document.getElementById("order");

  // écoute du click: les données du LS seront  mises à jour et envoyées à l'API

  btnOrder.addEventListener("click", function (e) {
    e.preventDefault();

    // varible champs vides
    const emptyForm =
      firstName.value === "" ||
      lastName.value === "" ||
      address.value === "" ||
      city.value === "" ||
      email.value === "";

    // variable champs faux

    const falseReg =
      textReg.test(firstName.value) == false ||
      textReg.test(lastName.value) == false ||
      addressReg.test(address.value) == false ||
      textReg.test(city.value) == false ||
      emailReg.test(email.value) == false;

    if (emptyForm || falseReg) {
      alert(
        "Tous les champs du formulaire doivent être remplis correctement pour passer commande"
      );
      return;
    } else {
      //création tableau des infos

      let productOrder = [];
      for (let i = 0; i < localStorageProduct.length; i++) {
        productOrder.push(localStorageProduct[i].idProduct);
      }
      console.log(productOrder);

      // création de l'objet pour la requête post
      const order = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: productOrder,
      };
      // mise en place des options de la requête
      let options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          localStorage.clear();
          document.location.href = "confirmation.html?orderId=" + data.orderId;
        })
        .catch((error) => {
          console.log(`message d'erreur ${error}`);
          alerte("Erreur dans le chargement de la page.");
        });
    }
  });
}
sendForm();
