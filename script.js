var addProductAlert = document.querySelector("#addProductAlert");
var AddProductSuccesfulAlert = document.querySelector("#AddProductSuccesfulAlert");
var removeProductALERT = document.querySelector("#removeProductALERT");
var removeProductSuccesful = document.querySelector("#removeProductSuccesful");
var insufficentStock = document.querySelector("#insufficentStock");
var badAlert = document.querySelector("#BADALERT");
badAlert.hidden = true;
insufficentStock.hidden = true;
removeProductSuccesful.hidden = true;
removeProductALERT.hidden = true;
AddProductSuccesfulAlert.hidden = true;
addProductAlert.hidden = true;
var Product = [];
var emailArray = [];
var productselect = document.querySelector(".form-select");
var itemsrecieved = document.querySelector("#itemsrecievedblock");
var price = document.querySelector(".price");
var totalprice = document.querySelector(".totalprice");
var addBTN = document.querySelector("#addBTN");
productselect.addEventListener("change", randomPriceGen);
addBTN.addEventListener("click", AddFunction);
function randomPriceGen() {
    var priceGen = [50, 80, 70, 110, 80, 55, 45, 65];
    var output = Math.floor(Math.random() * priceGen.length);
    var ss = priceGen[output].toString();
    price.value = ss;
}
function AddFunction() {
    if (productselect.value != productselect.options[0].value && itemsrecieved.value != '') {
        Product.push({
            Product: productselect.value,
            qty: +itemsrecieved.value,
            price: +price.value
        });
        price.value = '';
        itemsrecieved.value = '';
        productselect.value = productselect.options[0].value;
        stockCountt();
    }
}
// REMOVE {STOCK}
var removeMenu = document.querySelector("#remove-form-select");
var emailHandler = document.querySelector("#exampleInputEmail1");
var itemsBought = document.querySelector(".itemsbought");
var removeBTN = document.querySelector("#removeBTN");
removeBTN.addEventListener("click", RemoveFunction);
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var count = 0;
function ProductCount() {
    for (var i = 0; i < Product.length; i++) {
        if (Product[i].Product == removeMenu.value) {
            count += (Product[i].qty);
        }
    }
    return count;
}
function RemoveFunction() {
    var remaining = 0;
    if (removeMenu.value != removeMenu.options[0].value) {
        if (emailArray.includes(emailHandler.value) == false && emailHandler.value.match(mailformat)) {
            ProductCount();
            remaining = typeof remaining == "number" && remaining > 0 ? remaining : itemsBought.value;
            if (remaining <= count && remaining > 0) {
                emailArray.push(emailHandler.value);
                for (var i = 0; i < Product.length; i++) {
                    if (removeMenu.value == Product[i].Product) {
                        if (remaining > 0) {
                            Product[i].qty -= remaining;
                            stockCountt();
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
                            setTimeout(function () {
                                insufficentStock.hidden = true;
                            }, 4000);
                            count = 0;
                        }
                    }
                }
            }
            else {
                insufficentStock.hidden = false;
                setTimeout(function () {
                    insufficentStock.hidden = true;
                }, 4000);
                count = 0;
                itemsBought.value = '';
            }
        }
        else {
            badAlert.hidden = false;
            setTimeout(function () {
                badAlert.hidden = true;
            }, 4000);
        }
    }
    else {
        removeProductALERT.hidden = false;
        setTimeout(function () {
            removeProductALERT.hidden = true;
        }, 4000);
    }
}
// Stock Levels Update/Display
var avgPriceP1 = document.querySelector("#avgPriceP1");
var avgPriceP2 = document.querySelector("#avgPriceP2");
var avgPriceP3 = document.querySelector("#avgPriceP3");
var stockCountP1 = document.querySelector("#stockCountP1");
var stockCountP2 = document.querySelector("#stockCountP2");
var stockCountP3 = document.querySelector("#stockCountP3");
function stockCountt() {
    var stockP1 = 0;
    var stockP2 = 0;
    var stockP3 = 0;
    var priceArrayP1 = [];
    var priceArrayP2 = [];
    var priceArrayP3 = [];
    var pricesumP1 = 0;
    var pricesumP2 = 0;
    var pricesumP3 = 0;
    for (var i = 0; i < Product.length; i++) {
        if (Product[i].Product == productselect.options[1].value) {
            stockP1 += (Product[i].qty);
            priceArrayP1.push("" + Product[i].price);
            pricesumP1 += (Product[i].price);
            stockCountP1.innerText = "Total Stock Count : " + stockP1;
            avgPriceP1.innerText = "Average Stock Price : " + pricesumP1 / priceArrayP1.length;
        }
        if (Product[i].Product == productselect.options[2].value) {
            stockP2 += (Product[i].qty);
            priceArrayP2.push("" + Product[i].price);
            pricesumP2 += (Product[i].price);
            stockCountP2.innerText = "Total Stock Count : " + stockP2;
            avgPriceP2.innerText = "Average Stock Price : " + pricesumP2 / priceArrayP2.length;
        }
        if (Product[i].Product == productselect.options[3].value) {
            stockP3 += (Product[i].qty);
            priceArrayP3.push("" + Product[i].price);
            pricesumP3 += (Product[i].price);
            stockCountP3.innerText = "Total Stock Count : " + stockP3;
            avgPriceP3.innerText = "Average Stock Price : " + pricesumP3 / priceArrayP3.length;
        }
    }
}
