"use strict";
// const listing = document.getElementsByClassName("listing");
// const btnAdd = document.getElementsByClassName("listing-btn");
// const btnCart = document.querySelector(".btn-cart");

const buttonsShoping = document.getElementById("buttonsShoping");
const cardContainer = document.getElementById("cardContainer");

if (
  cardContainer.style.display === "" ||
  cardContainer.style.display === "block"
) {
  cardContainer.style.display = "none";
  cardContainer.style.opacity = "0"; // Opacity'yi 0 olarak ayarlayarak başlangıç durumunu kontrol et
}

buttonsShoping.addEventListener("click", function () {
  console.log(cardContainer.style.display); // Sepet butounun çalışıp çalışmadığını konsolda kontrol et

  // Görünürlük durumunu kontrol et
  if (cardContainer.style.display === "none") {
    // Kart container'ı görünür hale getir
    cardContainer.style.display = "block";
    cardContainer.style.transition = "opacity 400ms";
    setTimeout(() => {
      cardContainer.style.opacity = "1"; // sepetin görünürlüğü ve gecikme süresi
    }, 0);
  } else {
    // Kart container'ı gizle
    cardContainer.style.opacity = "0";
    setTimeout(() => {
      cardContainer.style.display = "none";
    }, 300);
  }
});

function deleteCartItem(cartItemId) {
  // Kaldırılacak cart-item'ı belirle
  var cartItem = document.getElementById(cartItemId);

  // Eğer cart-item bulunursa kaldır
  if (cartItem) {
    cartItem.remove();

    // Sepette hiç ürün kalmadığını kontrol et
    var cartItems = document.getElementsByClassName("cart-item");
    if (cartItems.length === 0) {
      // Sepette hiç ürün kalmadıysa mesajı göster
      emptyCartMessage.style.display = "block";
    }
  }
}

// Sepeti temsil eden bir dizi
let cartItems = [];

function addToCart(productId, name, price, imageSrc) {
  const newItem = {
    id: productId,
    name: name,
    price: price,
    imageSrc: imageSrc,
  };

  // Yeni ürünü sepete ekleyen fonksiyonu çağır
  addToCartArray(newItem);

  // Sepetinizi güncelle
  updateCart();
}

function addToCartArray(item) {
  cartItems.push(item);
}

function updateCart() {
  const cartContainer = document.getElementById("cardContainer");
  const emptyCartMessage = document.getElementById("emptyCartMessage");

  // Eğer sepet boşsa, mesajı gizle
  if (cartItems.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }

  // Her bir ürün için HTML oluştur ve sepete ekle
  cartItems.forEach((item) => {
    const newItemHTML = `
            <div class="cart-item" id="${item.id}">
                <i class="fas fa-times" onclick="deleteCartItem('${item.id}')"></i>
                <img src="${item.imageSrc}" alt="">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">${item.price}₺</div>
                </div>
            </div>
        `;

    cartContainer.insertAdjacentHTML("beforeend", newItemHTML);
  });
}
/* ---------------------------------------------------------------------------------------------- */
// footer'a anlık saat ve tarih bilgisi eklendi
function tarihSaat() {
  var date = new Date().toLocaleString("tr-TR");
  document.getElementById("zaman").innerHTML = date;
}
// her 0,1 saniyede tarihSaat fonksiyonunu yeniden çalıştır
setInterval(tarihSaat, 100);

/* ---------------------------------------------------------------------------------------------- */
