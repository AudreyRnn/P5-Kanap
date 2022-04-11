let params = new URLSearchParams(window.location.search);
let id = params.get("id");

console.log(id);

getProduct();

// récupération de données de l'api pour le canapé choisi
function getProduct() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (response) {
      return response.json();
    })

    .then(function (resultatApi) {
      product = resultatApi;
      console.table(product);
      if (product) {
        getPost(product);
      }
    })
    .catch((error) => {
      console.log("Erreur Api");
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
}
