document.addEventListener("DOMContentLoaded", () => {
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let cartClose = document.querySelector("#cart-close");
    let buyNowButton = document.querySelector(".btn-buy");

    cartIcon.addEventListener("click", () => {
        cart.classList.add("active");
    });

    cartClose.addEventListener("click", () => {
        cart.classList.remove("active");
    });

    let addCartButtons = document.querySelectorAll(".add-cart");
    addCartButtons.forEach((btn) => {
        btn.addEventListener("click", addToCart);
    });

    function addToCart(event) {
        let button = event.target;
        let product = button.closest('.product-box'); // Ambil elemen product-box terdekat
        let title = product.querySelector(".product-title").innerText;
        let price = product.querySelector(".product-price").innerText;
        let productImg = product.querySelector(".product-img").getAttribute("src"); // Ambil atribut src dari gambar produk
    
        addProductToCart(title, price, productImg);
        updateTotal();
    }
    

    function addProductToCart(title, price, productImg) {
        let cartContent = document.querySelector(".cart-content");
        let cartItems = cartContent.getElementsByClassName("cart-item");

        for (let i = 0; i < cartItems.length; i++) {
            let cartItemTitle = cartItems[i].querySelector(".cart-product-title").innerText;
            if (cartItemTitle == title) {
                alert("Produk ini sudah ada di keranjang");
                return;
            }
        }

        let cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-item");

        let cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bx-trash-alt cart-remove'></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartContent.append(cartShopBox);

        cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
        cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
    }

    function removeCartItem(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updateTotal();
    }

    function quantityChanged(event) {
        let input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }

    function updateTotal() {
        let cartContent = document.querySelector(".cart-content");
        let cartBoxes = cartContent.getElementsByClassName("cart-item");
        let total = 0;

        for (let i = 0; i < cartBoxes.length; i++) {
            let cartBox = cartBoxes[i];
            let priceElement = cartBox.querySelector(".cart-price");
            let quantityElement = cartBox.querySelector(".cart-quantity");
            let price = parseFloat(priceElement.innerText.replace("Rp ", "").replace(".", ""));
            let quantity = quantityElement.value;
            total += price * quantity;
        }

        document.querySelector(".total-price").innerText = "Rp " + total.toLocaleString();
    }

    buyNowButton.addEventListener("click", () => {
        alert("Terima kasih telah membeli!");
        let cartContent = document.querySelector(".cart-content");
        cartContent.innerHTML = ""; // Clear cart items
        updateTotal();
    });
});
