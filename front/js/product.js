let params = new URLSearchParams(location.search);
let id = params.get("id");

getProduct();

// récupération des données de l'api pour le canapé choisi
function getProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((resp) => resp.json())

    .then(function (resultatApi) {
      product = resultatApi;
      console.table(product);
      if (product) {
        getPost(product);
      }
    })
    .catch((error) => {
      console.log(`message d'erreur ${error}`);
      alerte("Erreur dans le chargement de la page.");
    });
}

// creation des éléments pour affichage des propriétés des produits
function getPost(product) {
  // l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  // nom du produit
  let productName = document.getElementById("title");
  productName.innerHTML = product.name;

  // le prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;

  // La description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = product.description;

  // les options de couleur
  for (let colors of product.colors) {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(product);
}

// selection des options couleurs et des quantités

const colorOption = document.querySelector("#colors");
const quantityOption = document.querySelector("#quantity");

// ajouter les produits
function addToCart(product) {
  // selectionner le bouton d'envoi au panier
  const btnAddToCart = document.querySelector("#addTocart");

  // écouter panier avec quantité entre 1 et 100 et couleur non nulle
  btnAddToCart.addEventListener("click", (event) => {
    if (
      quantityOption.value > 0 &&
      quantityOption.value <= 100 &&
      colorOption.value != null
    ) {
      // mettre les choix du visiteur dans des variables
      let colorChoice = colorOption.value;
      let quantityChoice = quantityOption.value;

      // récupérer les valeurs choisies

      let productOptions = {
        idProduct: id,
        colorProduct: colorChoice,
        quantityProduct: parseInt(quantityChoice),
      };

      // fenêtre pop up pour envoi vers panier
      const confirmationPopup = () => {
        if (
          window.confirm(`Vous avez placé  ${quantityChoice} ${product.name} ${colorChoice} dans votre panier.
Pour consulter votre panier, cliquez sur OK`)
        ) {
          window.location.href = "cart.html";
        }
      };
      //récupérer les données dans le LS, JSON.parse pour convertir données en JS

      let localStorageProduct = JSON.parse(localStorage.getItem("item"));

      // si le panier comprend déjà un article (parcourir le LS et si même id et couleur je remplace que la quantité )

      if (localStorageProduct) {
        let indexKanapExist = localStorageProduct.findIndex(
          (obj) =>
            obj.idProduct == product._id && obj.colorProduct == colorChoice
        );

        if (indexKanapExist == -1) {
          localStorageProduct.push(productOptions);
          localStorage.setItem("item", JSON.stringify(localStorageProduct));
          confirmationPopup();
        } else {
          localStorageProduct[indexKanapExist].quantityProduct =
            parseInt(localStorageProduct[indexKanapExist].quantityProduct) +
            parseInt(quantityChoice);
          localStorage.setItem("item", JSON.stringify(localStorageProduct));
          confirmationPopup();
        }
      }

      // importer dans localstorage si panier vide
      else {
        localStorageProduct = [];
        localStorageProduct.push(productOptions);
        localStorage.setItem("item", JSON.stringify(localStorageProduct));
        console.table(localStorageProduct);
        confirmationPopup();
      }
    } else {
      window.alert(
        " merci d'ajouter des articles pour continuer votre commande "
      );
    }
  });
}
