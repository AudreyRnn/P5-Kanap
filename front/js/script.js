// récupération des données depuis l'Api

fetch("http://localhost:3000/api/products")
  .then((resp) => resp.json())
  .then(function (products) {
    afficheProduct(products);
  });

// création des éléments pour affichage des différents produits
function afficheProduct(products) {
  var items = document.getElementById("items");

  products.forEach((product) => {
    // element a
    let productLink = document.createElement("a");
    document.querySelector(".items").appendChild(productLink);
    productLink.href = `./product.html?id=${product._id}`;

    // element article
    let productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    // element img
    let productImg = document.createElement("img");
    productArticle.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    // element h3
    let productName = document.createElement("h3");
    productName.innerText = product.name;
    productName.setAttribute("class", "productName");
    productArticle.appendChild(productName);

    // element p
    let productDescription = document.createElement("p");
    productDescription.innerText = product.description;
    productDescription.setAttribute("class", "productDescription");
    productArticle.appendChild(productDescription);
  });
}
