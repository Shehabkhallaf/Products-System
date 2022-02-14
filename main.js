var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productCountInput = document.getElementById("productCount");

var productsContainer = [];

if (localStorage.getItem("products") == null) {
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    count: productCountInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };

  productsContainer.push(product);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProducts();
}

function displayProducts() {
  var cartoona = ``;
  for (var i = 0; i < productsContainer.length; i++) {
    cartoona += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].count}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td> <button onclick="updateCount(${i} ,${1})" class="btn btn-info"><i class="fas fa-plus-circle"></i>            </button>  </td>
            <td> <button onclick="updateCount(${i} ,${-1})" class="btn btn-info"><i class="fas fa-minus-circle"></i>            </button>  </td>
            <td> <button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button>  </td>
          </tr>`;
  }
  document.getElementById("tableRow").innerHTML = cartoona;
}
function updateCount(index, x) {
  if (productsContainer[index].count == 0 && x == -1) {
    productsContainer[index].count = 0;
  } else {
    productsContainer[index].count =
      Number(productsContainer[index].count) + Number(x);
    displayProducts();
  }
}

function deleteProduct(productIndex) {
  productsContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProducts();
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
  productCountInput.value = "";
}

function searchProducts(term) {
  var searchProducts = [];
  for (var i = 0; i < productsContainer.lenght; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      searchProducts.push(productsContainer[i]);
    }
  }
  displayProducts(searchProducts);
}
