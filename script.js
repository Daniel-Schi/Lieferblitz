let basketFood = [];
let basketPrice = [];
let basketAmount = [];

loadArrays();


function render() {
    let content = document.getElementById('food-box');
    content.innerHTML = '';

    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        if (food.categoryName == 'category') {
            content.innerHTML += /*html*/`
                <div class="food-headline">
                <h3 id="${food.categories}">${food.categories}</h3>
                <p class="description">${food.description}</p>
                <img class="food-pic" src=${food.picture}></div>`;                
        } else {
            content.innerHTML += foodContentHTML(food);
        }
    }
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
    saveArrays();
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

    if (sum > 20) {
        document.getElementById('remove').classList.add('d-none');
    } else {
        document.getElementById('remove').classList.remove('d-none');
    }
    basketResponsive(finalSum)
}


function decreaseAmount(i) {
    let content = document.getElementById('price-section');
    content.innerHTML = '';

    if(basketAmount[i] > 1) {
       basketAmount[i]--;
    } else {
        basketFood.splice(i, 1);
        basketPrice.splice(i, 1);
        basketAmount.splice(i, 1);
    }
    renderBasket();
    saveArrays();
}


function increaseAmount(i) {
    basketAmount[i]++;
    renderBasket();
    saveArrays();
}


function saveArrays() {
    let basketFoodAsText = JSON.stringify(basketFood);
    let basketPriceAsText = JSON.stringify(basketPrice);
    let basketAmountAsText = JSON.stringify(basketAmount);
    localStorage.setItem('basketFood', basketFoodAsText);
    localStorage.setItem('basketPrice', basketPriceAsText);
    localStorage.setItem('basketAmount', basketAmountAsText);
}


function loadArrays() {
    let basketFoodAsText = localStorage.getItem('basketFood');
    let basketPriceAsText = localStorage.getItem('basketPrice');
    let basketAmountAsText = localStorage.getItem('basketAmount');

    if (basketFoodAsText && basketPriceAsText && basketAmountAsText) {
        basketFood = JSON.parse(basketFoodAsText);
        basketPrice = JSON.parse(basketPriceAsText);
        basketAmount = JSON.parse(basketAmountAsText);
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
                <p class="price">${food.price.toFixed(2).replace('.', ',')} €</p>
            </div>
        </div>
    `
}


function emptyBasketHtml() {
    return /*html*/`
        <div class="empty-basket">
            <h3>Wähle deine Gerichte</h3>
            <img class="basket-img" src="img/tasche.png">
            <span>Der Warenkorb ist noch leer!</span>
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
            <div class="basket-menu-name"> ${amount}  ${item}</div> 
            <div class="quantity"> 
                <img onclick="increaseAmount(${i})" class="since" src="img/plus-rund.png"> 
                <img onclick="decreaseAmount(${i})" class="since" src="img/minus-rund.png">
            </div>
            <div class="sum" id="basket-price">${price.toFixed(2).replace('.', ',')} €</div>
        </div>
    `
}


function priceSectionHtml(minPrice, sum, finalSum) {
    return /*html*/`
        <div id="remove">
            <div class="required-rest-price">
                <div>Benötigter Betrag, um den Mindestbestellwert zu erreichen <b>${minPrice.toFixed(2).replace('.', ',')} €</b></div>
            </div>
            <div class="required-info-text">Leider kannst du noch nicht bestellen.
                Der Mindestbestellwert von 20,00 € ist noch nicht erreicht.
            </div>
        </div>
        <div class="costs">
            <div class="subtotal">
                <div>Zwischensumme:</div>
                <div>${sum.toFixed(2).replace(".", ",")} €</div>
            </div>
            <div class="delivery">
                <div>Lieferkosten:</div>
                <div>5 €</div>
            </div>
            <div class="total">
                <div>Gesamt:</div>
                <div>${finalSum.toFixed(2).replace(".", ",")} €</div>
            </div>
        </div>
        <button class="pay-btn">
            <div>Bezahlen</div>
            <div><b>${finalSum.toFixed(2).replace(".", ",")} €</b></div>
        </button>
    `;
}


function basketResponsive(finalSum) {
    let content = document.getElementById('btn-shoppingcard');
    content.innerHTML = /*html*/`
        <div class="bgr">
            <button onclick="openBasketResponsive()" id="btn-responsive" class="btn-responsive d-none">
                <div>Bezahlen</div>
                <div><b>${finalSum.toFixed(2).replace(".", ",")} €</b></div>
            </button>
        </div>
    `;
}


function openBasketResponsive() {
    document.getElementById('shoppingcardResponsive').classList.remove('d-none-restaurant');
    document.getElementById('restaurant-info').classList.add('d-none-restaurant');
}


function closeBasketResponsive() {
    document.getElementById('shoppingcardResponsive').classList.add('d-none-restaurant');
    document.getElementById('restaurant-info').classList.remove('d-none-restaurant');
}