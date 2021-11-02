
let addProductAlert = (document.querySelector(`#addProductAlert`) as HTMLElement);
let AddProductSuccesfulAlert = (document.querySelector(`#AddProductSuccesfulAlert`) as HTMLElement);
let removeProductALERT =(document.querySelector(`#removeProductALERT`) as HTMLElement);
let removeProductSuccesful = (document.querySelector(`#removeProductSuccesful`) as HTMLElement);
let insufficentStock = (document.querySelector(`#insufficentStock`) as HTMLElement);
let badAlert = (document.querySelector(`#BADALERT`) as HTMLElement);

badAlert.hidden = true;
insufficentStock.hidden = true;
removeProductSuccesful.hidden = true;
removeProductALERT.hidden = true;
AddProductSuccesfulAlert.hidden = true;
addProductAlert.hidden = true;


let Product: {
    Product: string;
    qty: number;
    price: number
}[] = [];

let emailArray: any = [];

const productselect = document.querySelector(`.form-select`) as HTMLFormElement;
const itemsrecieved = document.querySelector(`#itemsrecievedblock`) as HTMLDataElement;
const price = document.querySelector(`.price`) as HTMLDataElement;
const totalprice = document.querySelector(`.totalprice`);
const addBTN = document.querySelector(`#addBTN`);

productselect.addEventListener(`change`, randomPriceGen)
addBTN.addEventListener(`click`, AddFunction)

function randomPriceGen() {
    const priceGen: number[] = [50, 80, 70, 110, 80, 55, 45, 65];
    let output = Math.floor(Math.random() * priceGen.length)
    let ss = priceGen[output].toString()
    price.value = ss
}

function AddFunction() {
    if (productselect.value != productselect.options[0].value && itemsrecieved.value != '') {
        Product.push({
            Product: productselect.value,
            qty: +itemsrecieved.value,
            price: +price.value
        })
        price.value = '';
        itemsrecieved.value = '';
        productselect.value = productselect.options[0].value;
        stockCountt()
    }
}

// REMOVE {STOCK}

const removeMenu = document.querySelector(`#remove-form-select`) as HTMLFormElement;
const emailHandler = document.querySelector(`#exampleInputEmail1`) as HTMLFormElement;
const itemsBought = document.querySelector(`.itemsbought`) as HTMLFormElement;
const removeBTN = document.querySelector(`#removeBTN`);

removeBTN.addEventListener(`click`, RemoveFunction)
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


let count = 0
function ProductCount() {
    for (let i = 0; i < Product.length; i++) {
        if (Product[i].Product == removeMenu.value) {
            count += (Product[i].qty);

        }
    }
    return count;
}




function RemoveFunction() {
    let remaining = 0;
    if (removeMenu.value != removeMenu.options[0].value) {
        if (emailArray.includes(emailHandler.value) == false && emailHandler.value.match(mailformat)) {
            ProductCount();
            remaining = typeof remaining == "number" && remaining > 0 ? remaining : itemsBought.value;
            if (remaining <= count && remaining > 0) {
                emailArray.push(emailHandler.value);
                for (let i = 0; i < Product.length; i++) {
                    if (removeMenu.value == Product[i].Product) {
                        if (remaining > 0) {
                            Product[i].qty -= remaining;
                            stockCountt()
                            if (Product[i].qty <= 0) {
                                remaining = -(Product[i].qty);
                                Product.splice(i, (i + 1));
                                i -= 1;
                                count = 0;
                                stockCountt();
                            }
                        }
                        else {
                            insufficentStock.hidden = false;
                            setTimeout(() => {
                                insufficentStock.hidden = true;
                            }, 4000);
                            count = 0;
                        }
                    }
                }
            }
            else {
                insufficentStock.hidden = false;
                setTimeout(() => {
                    insufficentStock.hidden = true;
                }, 4000);
                count = 0;
                itemsBought.value = '';
            }
        }
        else {
            badAlert.hidden = false;
            setTimeout(() => {
                badAlert.hidden = true;
            }, 4000);
        }

    } else {
        removeProductALERT.hidden = false;
        setTimeout(() => {
            removeProductALERT.hidden = true;
        }, 4000);
    }
}



// Stock Levels Update/Display

let avgPriceP1 = document.querySelector(`#avgPriceP1`) as HTMLDataElement;
let avgPriceP2 = document.querySelector(`#avgPriceP2`) as HTMLDataElement;
let avgPriceP3 = document.querySelector(`#avgPriceP3`) as HTMLDataElement;

let stockCountP1 = document.querySelector(`#stockCountP1`) as HTMLDataElement;
let stockCountP2 = document.querySelector(`#stockCountP2`) as HTMLDataElement;
let stockCountP3 = document.querySelector(`#stockCountP3`) as HTMLDataElement;


function stockCountt() {
    let stockP1 = 0;
    let stockP2 = 0;
    let stockP3 = 0;

    let priceArrayP1 = [];
    let priceArrayP2 = [];
    let priceArrayP3 = [];

    let pricesumP1 = 0;
    let pricesumP2 = 0;
    let pricesumP3 = 0;




    for (let i = 0; i < Product.length; i++) {
        if (Product[i].Product == productselect.options[1].value) {
            stockP1 += (Product[i].qty);
            priceArrayP1.push(`${Product[i].price}`);
            pricesumP1 += (Product[i].price);
            stockCountP1.innerText = `Total Stock Count : ${stockP1}`;
            avgPriceP1.innerText = `Average Stock Price : ${pricesumP1 / priceArrayP1.length}`;
        }
        if (Product[i].Product == productselect.options[2].value) {
            stockP2 += (Product[i].qty);
            priceArrayP2.push(`${Product[i].price}`);
            pricesumP2 += (Product[i].price);
            stockCountP2.innerText = `Total Stock Count : ${stockP2}`;
            avgPriceP2.innerText = `Average Stock Price : ${pricesumP2 / priceArrayP2.length}`;
        }
        if (Product[i].Product == productselect.options[3].value) {
            stockP3 += (Product[i].qty);
            priceArrayP3.push(`${Product[i].price}`);
            pricesumP3 += (Product[i].price);
            stockCountP3.innerText = `Total Stock Count : ${stockP3}`;
            avgPriceP3.innerText = `Average Stock Price : ${pricesumP3 / priceArrayP3.length}`;
        }
    }
}

