let params = new URLSearchParams(window.location.search);
let id = params.get("id");
console.log(id);

getProduct();

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

function getPost(product) {
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  let productName = document.getElementById("title");
  productName.innerHTML = product.name;

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;

  let productDescription = document.getElementById("description");
  productDescription.innerHTML = product.description;
}
