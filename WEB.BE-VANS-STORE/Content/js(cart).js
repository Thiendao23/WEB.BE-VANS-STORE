﻿const products = [
    {
        id: 1,
        name: 'VANS AUTHENTIC CLASSIC BLACK/WHITE',
        image: 'https://bizweb.dktcdn.net/thumb/large/100/140/774/products/vans-authentic-classic-black-vn000ee3blk-1.png?v=1625925617317',
        price: '1,450,000'
    }
];
let productInCart = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productInCart));
}

//Index page
function renderProducts() {
    let data = ``;
    products.map(value => {
        data += `
      <div class='col-3'>
        <div class='card'>
          <div class='card-body'>
            <button onclick='addToCart(${value.id})' class='btn btn-primary'>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    `;
    });
    document.getElementById('products').innerHTML = data;
}

function addToCart(id) {
    let checkProduct = productInCart.some(value => value.id === id);

    if (!checkProduct) {
        let product = products.find(value => value.id === id);
        productInCart.unshift({
            ...product,
            quantity: 1
        });
        saveToLocalStorage();
        calculatorTotal();
    } else {
        let product = productInCart.find(value => value.id === id);
        let getIndex = productInCart.findIndex(value => value.id === id);
        productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity
        };
        saveToLocalStorage();
    }
}

function calculatorTotal() {
    document.getElementById('total').innerHTML = productInCart.length;
}

function indexLoadPage() {
    renderProducts();
    calculatorTotal();
}

//Cart page
function renderProductsToTable() {
    let data = ``;
    productInCart.map((value, index) => {
        data += `
      <tr>
        <td>${value.name}</td>
        <td><img width='100' src='${value.image}' alt=''></td>
        <td>${value.price}</td>
        <td>
          <button onclick='plusQuantity(${index})' class='btn btn-secondary'>+</button>
          <span class='mx-2'>${value.quantity}</span>
          <button onclick='minusQuantity(${index}, ${value.quantity})' class='btn btn-secondary'>-</button>
        </td>
        <td>${(value.quantity * value.price.replace(/,/g, '')).toLocaleString()}</td>
        <td><button onclick='deleteProductInCart(${index})' class='btn btn-danger'>Delete</button></td>
      </tr>
    `;
    });
    document.getElementById('products-cart').innerHTML = data;
}

function plusQuantity(index) {
    productInCart[index] = {
        ...productInCart[index],
        quantity: ++productInCart[index].quantity
    };
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney()
}

function minusQuantity(index, quantity) {
    if (quantity > 1) {
        productInCart[index] = {
            ...productInCart[index],
            quantity: --productInCart[index].quantity
        };
        saveToLocalStorage();
        renderProductsToTable();
        totalMoney()
    } else {
        alert('Quantity min is 1');
    }
}

function deleteProductInCart(index) {
    productInCart.splice(index, 1);
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney()
}

function totalMoney() {
    if (productInCart !== 0) {
        let total = 0;
        for (let i = 0; i < productInCart.length; i++) {
            total += productInCart[i].quantity * productInCart[i].price.replace(/,/g, '');
        }
        document.getElementById("total-money").innerHTML = total.toLocaleString()
    }
}

function cartLoadPage() {
    renderProductsToTable();
    totalMoney();
}