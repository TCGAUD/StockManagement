
document.querySelector(`#BADALERT`).hidden = true
document.querySelector(`#addProductAlert`).hidden = true
document.querySelector(`#AddProductSuccesfulAlert`).hidden = true
document.querySelector(`#removeProductALERT`).hidden = true
document.querySelector(`#removeProductSuccesful`).hidden = true
document.querySelector(`#insufficentStock`).hidden = true




//{Products}

let Product = []

// Emails Stored


let emailArray = []

// {ADD STOCK}
const productselect = document.querySelector(`.form-select`)
const itemsrecieved = document.querySelector(`#itemsrecievedblock`)
const price = document.querySelector(`.price`)
const totalprice = document.querySelector(`.totalprice`)
const addBTN = document.querySelector(`#addBTN`)

productselect.addEventListener(`change`, randomPriceGen)
addBTN.addEventListener(`click`, AddFunction)

// PRICE VARIES. So made random Gen for price. For testing 
function randomPriceGen() {
    priceGen = [50, 80, 70, 110, 80, 55, 45, 65];
    output = Math.floor(Math.random() * priceGen.length)
    price.value = priceGen[output]

}

function AddFunction() {

    if (productselect.value != productselect[0].value && itemsrecieved.value != '') {
        Product.push({
            Product: productselect.value,
            qty: itemsrecieved.value,
            price: price.value
        })
        price.value = ''
        itemsrecieved.value = ''
        productselect.value = productselect.options[0].value
        stockCountt()
        document.querySelector(`#AddProductSuccesfulAlert`).hidden = false
        setTimeout(() => {
            document.querySelector(`#AddProductSuccesfulAlert`).hidden = true
        }, 5000);

    } else {
        document.querySelector(`#addProductAlert`).hidden = false
        setTimeout(() => {
            document.querySelector(`#addProductAlert`).hidden = true
        }, 5000);
    }



    



}

// END OF {ADD STOCK}

// REMOVE {STOCK}

const removeMenu = document.querySelector(`#remove-form-select`)
const emailHandler = document.querySelector(`#exampleInputEmail1`)
const itemsBought = document.querySelector(`.itemsbought`)
const removeBTN = document.querySelector(`#removeBTN`)

removeBTN.addEventListener(`click`, RemoveFunction)
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
async function RemoveFunction(remaining) {
    if (removeMenu.value != removeMenu.options[0].value) {
        if (emailArray.includes(emailHandler.value) == false && emailHandler.value.match(emailHandler)) {
            await ProductCount()
            remaining = typeof remaining == "number" ? remaining : itemsBought.value;
            if (remaining <= count && remaining > 0) {
                emailArray.push(emailHandler.value)
                for (let i = 0; i < Product.length; i++) {
                    if (removeMenu.value == Product[i].Product) {
                        if (remaining > 0) {
                            Product[i].qty -= remaining
                            stockCountt()
                            document.querySelector(`#removeProductSuccesful`).hidden = false
                            setTimeout(() => {
                                document.querySelector(`#removeProductSuccesful`).hidden = true
                            }, 4000);
                            if (Product[i].qty <= 0) {
                                remaining = -(Product[i].qty)
                                Product.splice(i, (i + 1))
                                i -= 1
                                count = 0
                                stockCountt()
                                
                                

                            }
                            
                        }
                        else {
                            document.querySelector(`#insufficentStock`).hidden = false
                        setTimeout(() => {
                            document.querySelector(`#insufficentStock`).hidden = true
                        }, 4000);
                            count = 0
                        }
                    }
                }
            }
            else {
                document.querySelector(`#insufficentStock`).hidden = false
            setTimeout(() => {
                document.querySelector(`#insufficentStock`).hidden = true
            }, 4000);
                count = 0
            }
        }
        else {
            document.querySelector(`#BADALERT`).hidden = false
            setTimeout(() => {
                document.querySelector(`#BADALERT`).hidden = true
            }, 4000);
        }

    }else {
        document.querySelector(`#removeProductALERT`).hidden = false
            setTimeout(() => {
                document.querySelector(`#removeProductALERT`).hidden = true
            }, 4000);
    }
}

// Count Stock for Selected Product. TO CHECK IF HAVE SUFFICIENT STOCK 
let count = 0
function ProductCount() {
    for (let i = 0; i < Product.length; i++) {
        if (Product[i].Product == removeMenu.value) {
            count += parseInt(Product[i].qty)

        }
    }
    return count
}

// Stock Levels Update/Display
avgP1 = 0
avgP2 = 0
avgP3 = 0

stockP1 = 0
stockP2 = 0
stockP3 = 0

avgPriceP1 = document.querySelector(`#avgPriceP1`)
avgPriceP2 = document.querySelector(`#avgPriceP2`)
avgPriceP3 = document.querySelector(`#avgPriceP3`)

stockCountP1 = document.querySelector(`#stockCountP1`)
stockCountP2 = document.querySelector(`#stockCountP2`)
stockCountP3 = document.querySelector(`#stockCountP3`)

function stockCountt() {
    stockP1 = 0
    stockP2 = 0
    stockP3 = 0

    priceArrayP1 = []
    priceArrayP2 = []
    priceArrayP3 = []

    pricesumP1 = 0
    pricesumP2 = 0
    pricesumP3 = 0





    for (let i = 0; i < Product.length; i++) {
        if (Product[i].Product == productselect[1].value) {
            stockP1 += parseInt(Product[i].qty)
            priceArrayP1.push(`${Product[i].price}`)
            pricesumP1 += parseInt(Product[i].price)
            stockCountP1.innerText = `Total Stock Count : ${stockP1}`
            avgPriceP1.innerText = `Average Stock Price : ${pricesumP1/priceArrayP1.length}`
        }
        if (Product[i].Product == productselect[2].value) {
            stockP2 += parseInt(Product[i].qty)
            priceArrayP2.push(`${Product[i].price}`)
            pricesumP2 += parseInt(Product[i].price)
            stockCountP2.innerText = `Total Stock Count : ${stockP2}`
            avgPriceP2.innerText = `Average Stock Price : ${pricesumP2/priceArrayP2.length}`
        }
        if (Product[i].Product == productselect[3].value) {
            stockP3 += parseInt(Product[i].qty)
            priceArrayP3.push(`${Product[i].price}`)
            pricesumP3 += parseInt(Product[i].price)
            stockCountP3.innerText = `Total Stock Count : ${stockP3}`
            avgPriceP3.innerText = `Average Stock Price : ${pricesumP3/priceArrayP3.length}`
        }
    }
}
