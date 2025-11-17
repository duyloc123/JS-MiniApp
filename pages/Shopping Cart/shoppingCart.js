import {vietnamFoods} from "./data.js";

const listProduct = document.getElementById("listProduct");
const modal = document.getElementById("modalCart");
const btnCart = document.getElementById("btnCart");
const listCart = document.getElementById("listCart");
const cartTotal = document.getElementById("cartTotal");
const countLenght = document.getElementById("countProduct");
const checkout = document.getElementById("btnCheckout");
const noficationCheckout = document.getElementById("noficationCheckOut");
const nofication = document.querySelector(".nofication");


let data = vietnamFoods;
let cart = [];
let total = 0;
let count = 0;

function initShoppingCart() {
    cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    setCart(cart);
    renderData(data);
}

function renderData(dataSource) {
    dataSource.forEach(item => {
        const liElement = document.createElement("li");
        const imageElement = document.createElement("img");
        imageElement.src = `${item.image}`;
        imageElement.setAttribute("class","product__image");
        imageElement.alt = item.name;
        const productName = document.createElement("h3");
        productName.setAttribute("class","product__name");
        productName.innerHTML = item.name;
        const productPrice = document.createElement("p");
        productPrice.setAttribute("class","product__price");
        productPrice.innerHTML = `${item.price.toLocaleString('it-IT',{style: 'currency', currency: 'VND'})}`;
        const btnAddToCart = document.createElement("button");
        btnAddToCart.setAttribute("class","btn__addToCart");
        btnAddToCart.innerHTML = "Add To Cart";
        // Action Add to cart
        liElement.addEventListener('click',() => addCart(item.id));

        listProduct.appendChild(liElement);
        liElement.appendChild(imageElement);
        liElement.appendChild(productName);
        liElement.appendChild(productPrice);
        liElement.appendChild(btnAddToCart);
    })
    countLength();
}

btnCart.addEventListener("click",() => {
    if(modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        countLength();
    } else {
        modal.classList.add("hidden");
    }
})

function addCart(id) {
    const findIndex = data.findIndex(item => item.id === id);
    const newProduct = {
        id: data[findIndex].id,
        name: data[findIndex].name,
        price: data[findIndex].price,
        quanlity: 1,
    }
    const cartIndex = cart.findIndex(item => item.id === id);
    if(cartIndex !== -1) {
        cart[cartIndex].quanlity += 1;
    } else {
        cart.push(newProduct)
    }
    setCart(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    totalCart();
    countLength();
}

function deleteCart(id) {
    const findIndex = cart.findIndex(item => item.id === id);
    cart.splice(findIndex,1);
    setCart(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    totalCart();
    countLength();
}

function totalCart() {
    const sumCart = cart.reduce((acc, cur) => {
        return acc += cur.quanlity * cur.price;
    },0);
    total = sumCart.toLocaleString('it-IT',{style: 'currency', currency: 'VND'})
    cartTotal.innerHTML = `Total: ${total}`;
}

function countLength() {
    cart.length === 0 ? count = 0 : count = cart.length;
    countLenght.innerHTML = count;

    cart.length === 0 ? checkout.style.pointerEvents = "none": checkout.style.removeProperty("pointer-events");
}

function setCart(dataSource) {
    listCart.innerHTML = "";
    dataSource.forEach(item => {
        const liElement = document.createElement("li");
        liElement.addEventListener('click', () => {
            deleteCart(item.id);
        })
        liElement.style.padding = "5px 10px";
        const productName = document.createElement("p");
        productName.innerHTML = item.name;
        productName.style.width = "100px";
        const productQuanlity = document.createElement("p");
        productQuanlity.innerHTML = item.quanlity;
        const productPrice = document.createElement("p");
        productPrice.innerHTML = `${item.price.toLocaleString('it-IT',{style: 'currency', currency: 'VND'})}`;

        listCart.appendChild(liElement);
        liElement.appendChild(productName);
        liElement.appendChild(productQuanlity);
        liElement.appendChild(productPrice);
    });
}

checkout.addEventListener("click",() => {
    nofication.classList.add("active");
    noficationCheckout.classList.remove("hidden");
    setTimeout(() => {
        noficationCheckout.classList.add("hidden");
        nofication.classList.remove("active");
        total = 0;
        count = 0;
        cart = [];
        setCart(cart);
        totalCart();
        countLength()
        window.localStorage.removeItem("cart");
    },2000)
});

initShoppingCart();

