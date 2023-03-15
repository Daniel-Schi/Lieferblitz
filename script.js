let basketFood = [];
let basketPrice = [];
let basketAmount = [];


function render() {
    let content = document.getElementById('food-box');
    content.innerHTML = '';

    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        if (food.categoryName == 'category') {
            content.innerHTML += /*html*/`
                <div class="food-headline">
                    <img class="food-pic" src=${food.picture}></div>
                    <h3 id="${food.categories}">${food.categories}</h3>
                    <p class="description">${food.description}</p>
                `;
        } else {
            content.innerHTML += foodContentHTML(food);
        }
    }
}

function foodContentHTML(food) {
    return /*html*/`
        <div class="menu-box">
            <div class="menu-card">
                <div class="menu-title-head">
                    <p class="menu-title">${food.item}</p>
                    <div class="plus" onclick="addToBasktet('${food.amount}', '${food.item}', '${food.price}')">+</div>
                </div>
                <ul>
                    <li>${food.menuContent}</li>
                </ul>
                <p class="price">${food.price} €</p>
            </div>
        </div>
    `
}


function renderBasket() {
    let content = document.getElementById('basket');
    content.innerHTML = '';

    if (basketAmount == 0) {
        content.innerHTML += emptyBasketHtml();
    } else {
        for (let i = 0; i < basketFood.length; i++) {
            content.innerHTML += filledBasketHtml(i);
        }
        updateBasketPrice();
    }
}


function addToBasktet(amount, item, price) {
    let index = basketFood.indexOf(item);
    index.innerHTML = '';

    if (index == -1) {
        basketFood.push(item);
        basketPrice.push(price);
        basketAmount.push(amount);
    } else {
        basketAmount[index]++;
    }
    renderBasket();
}

function updateBasketPrice() {
    let content = document.getElementById('price-section');
    content.innerHTML = '';
    let sum = 0;

    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketPrice[i] * basketAmount[i];
    }

    let finalSum = sum + 5;
    let minPrice = 20 - sum;
    content.innerHTML += priceSectionHtml(minPrice, sum, finalSum);

    if(sum > 20) {
        document.getElementById('remove').classList.add('d-none');
    } else {
        document.getElementById('remove').classList.remove('d-none');
    }
    
}

function emptyBasketHtml(i) {
    return /*html*/`
        <div class="empty-basket">
                <h3>Wähle deine Gerichte</h3>
                <img class="basket-img" src="img/tasche.png">
                <span>
                    Der Warenkorb ist noch leer!</span>
                <br>
                <span> Füge leckere Gerichte aus der Speisekarte hinzu und gib deine Bestellung ab.</span>

            </div>
    `;
}

function filledBasketHtml(i) {
    let item = basketFood[i];
    let price = basketPrice[i] * basketAmount[i];
    let amount = basketAmount[i];
    return /*html*/`
        <div class="basket-menu">
            <div class="basket-menu-header">
                <p id="basket-amount">${amount}</p>
                <p id="basket-item">${item}</p>
                <div onclick="decreaseAmount()" class="quantity">-</div>
                <div onclick="increaseAmount()" class="quantity">+</div>
                <p id="basket-price">${price} €</p>
            </div>

        </div>
    `
}


function priceSectionHtml( minPrice, sum, finalSum) {
    return /*html*/`
        <div id="remove">
            <div class="">

            </div>    
        </div>
    `
}