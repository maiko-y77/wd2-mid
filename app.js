let carts = document.querySelectorAll('.add-cart');

let orders = [
    {
        name: 'Special Meal1',
        tag: "toa-heftiba-inDRPMBfX8M-unsplash",
        price: 30,
        inCart: 0,
    },
    {
        name: 'Special Meal2',
        tag: "davide-cantelli-jpkfc5_d-DI-unsplash",
        price: 30,
        inCart: 0,
    },
    {
        name: 'Special Meal3',
        tag: "eduardo-roda-lopes-mNefYU7uRbk-unsplash",
        price: 30,
        inCart: 0,
    },
    {
        name: 'Special Meal4',
        tag: "david-b-townsend-fV3zTanbO80-unsplash",
        price: 30,
        inCart: 0,
    },
    {
        name: 'Special Meal5',
        tag: "brenda-godinez-_Zn_7FzoL1w-unsplash",
        price: 30,
        inCart: 0,
    },
    {
        name: 'Special Meal6',
        tag: "anna-pelzer-IGfIGP5ONV0-unsplash",
        price: 30,
        inCart: 0,
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(orders[i]);
        totalCost(orders[i]);
    })
}

function onLoadCartNumbers() {
    let productsNumbers = localStorage.getItem('cartNumbers');

    if (productsNumbers) {
        document.querySelector('.cart span').textContent = productsNumbers;
    }
}

function cartNumbers(order) {
    let productsNumbers = localStorage.getItem('cartNumbers');
    productsNumbers = parseInt(productsNumbers);

    if (productsNumbers) {
        localStorage.setItem('cartNumbers', productsNumbers + 1);
        document.querySelector('.cart span').textContent = productsNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(order)
}

function setItems(order) {
    let cartItems = localStorage.getItem('ordersInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);

    if (cartItems != null) {

        if (cartItems[order.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [order.tag]: order
            }
        }
        cartItems[order.tag].inCart += 1;
    } else {
        order.inCart = 1;
        cartItems = {
            [order.tag]: order

        }
    }

    localStorage.setItem("ordersInCart", JSON.stringify(cartItems));
}

function totalCost(order) {
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + order.price);
    } else {
        localStorage.setItem("totalCost", order.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("ordersInCart");
    cartItems = JSON.parse(cartItems);
    let orderContainer = document.querySelector(".orders");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems)
    if (cartItems && orderContainer) {
        orderContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            orderContainer.innerHTML += `
            <div class="order">
                <i class="bi bi-x-circle"></i>
                <img src="./img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <i class="bi bi-caret-left-fill"></i>
                <span>${item.inCart}</span>
                <i class="bi bi-caret-right-fill"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });

        orderContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost}.00
            </h4>
        `;
    }
}

onLoadCartNumbers();
displayCart();