if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

let productArray = [];

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    var itemQuantity = productArray.length;

    console.log(productArray)
    console.log(itemQuantity)

    if (itemQuantity == 1) {
        alert("Purchasing 1 Item")
        let userName = prompt("Please Enter Your Name:");
        let userCity = prompt("Please Enter Your City: (Please Note That we do not ship outside Islamabad and Rawalpindi)");
        let userAddress = prompt("Please Enter Your Address:");
        let userEmail = prompt("Please Enter Your E-Mail (for order Tracking)")
        let user = {
            name: userName,
            city: userCity,
            address: userAddress,
            email : userEmail,
            products: productArray
        };
        console.log(user)
        function sendEmail(){
            Email.send({
                
              Host: "smtp.elasticemail.com", 
              Username: "wemmblemc@gmail.com",
              Password: "4DB6FD2EDCBB367E287BA5F0B732EE8D32F3",
              To: "zishucbi@gmail.com",
              From: "wemmblemc@gmail.com",
              Subject: 'New Order from ' + userName,
              Body: 'Name : ' + userName + '\n City : ' + userCity + '\n Address : ' + userAddress + '\n Products : ' + productArray + 'E-Mail : ' + userEmail,
    
            }).then((success) => {
                alert("Purchase completed")
            }).catch((error) => {
                alert("Error while Purchasing");
            })
        }
        sendEmail()
        
        //Emptying The Product Array On Purchase

        productArray.length = 0;

    } else if(itemQuantity > 1) {
        alert("Purchasing " + itemQuantity + " Items")
        
        let userName = prompt("Please Enter Your Name:");
        let userCity = prompt("Please Enter Your City: (Please Note That we do not ship outside Islamabad and Rawalpindi)");
        let userAddress = prompt("Please Enter Your Address:");
        let userEmail = prompt("Please Enter Your E-Mail (for order Tracking)")
        let user = {
            name: userName,
            city: userCity,
            address: userAddress,
            email : userEmail,
            products: productArray
        };
        console.log(user)
        function sendEmail(){
            Email.send({
                
              Host: "smtp.elasticemail.com", 
              Username: "wemmblemc@gmail.com",
              Password: "4DB6FD2EDCBB367E287BA5F0B732EE8D32F3",
              To: "zishucbi@gmail.com",
              From: "wemmblemc@gmail.com",
              Subject: 'New Order from ' + userName,
              Body: 'Name : ' + userName + '\n City : ' + userCity + '\n Address : ' + userAddress + '\n Products : ' + productArray + 'E-Mail : ' + userEmail,
    
            }).then((success) => {
                alert("Purchase completed")
            }).catch((error) => {
              alert("Error while Purchasing");
            })
        }
        sendEmail()

        //Emptying The Product Array on Purchase

        productArray.length = 0;

    } else if(itemQuantity == 0) {
        alert("The cart is empty")
        alert("Purchase Unsuccessful")
    } else{
        alert("Insufficient Elements Provided")
    }
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    productArray.pop()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
    productArray.push(title)
}
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            productArray.pop(title)
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var price = parseFloat(priceElement.innerText.replace('PKR. ', ''))
        total = total + (price)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'PKR.' + total
}