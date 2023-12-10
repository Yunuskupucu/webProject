"use strict";

let cartItems = [];
const cardContainer = document.getElementById("cardContainer");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const orderButton = document.getElementById("orderButton");
const buttonsShoping = document.getElementById("buttonsShoping");

function addToCartArray(item) {
  // Eğer ürün zaten sepette varsa miktarını artır
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Eğer ürün sepette yoksa, yeni bir cart item olarak ekle
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      imageSrc: item.imageSrc,
      quantity: 1, // Yeni eklenen ürünün varsayılan miktarı 1
    };
    cartItems.push(newItem);
  }

  updateCart(); // Sepeti güncelle
  location.reload(); // Sayfayı yenile
}

// Verileri localStorage'a kaydetme
function saveCartToLocalStorage() {
  console.log("Saving cart to local storage");
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// localStorage'dan verileri yükleme
function loadCartFromLocalStorage() {
  console.log("Loading cart from local storage");
  const storedCartItems = localStorage.getItem("cartItems");

  if (storedCartItems) {
    console.log("Stored cart items found");
    cartItems = JSON.parse(storedCartItems);
    updateCart();
  } else {
    console.log("No stored cart items found");
  }
}

// Sepete ürün eklemek için global kapsamda addToCart fonksiyonunu tanımla
function addToCart(productId, name, price, imageSrc) {
  const newItem = {
    id: productId,
    name: name,
    price: price,
    imageSrc: imageSrc,
  };
  addToCartArray(newItem);
  saveCartToLocalStorage(); // Sepet verilerini localStorage'a kaydet
}

// Sepetteki bir ürünü silme
function deleteCartItem(cartItemId) {
  // Sepetten item'ı kaldır
  cartItems = cartItems.filter((item) => item.id !== cartItemId);
  updateCart();
  saveCartToLocalStorage(); // Sepet verilerini localStorage'a kaydet
  location.reload(); // Sayfayı yenile
}

// Sepeti güncelleme fonksiyonu
function updateCart() {
  // Her bir ürün için HTML oluştur ve sepete ekle
  const cartItemsHTML = cartItems
    .map(
      (item) => `
    <div class="cart-item" id="${item.id}">
      <i class="fas fa-times" onclick="deleteCartItem('${item.id}')"></i>
      <img src="${item.imageSrc}" alt="">
      <div class="content">
        <h3>${item.name}</h3>
        <div class="price">${item.price}₺</div>
        <div class="quantity">Miktar: ${item.quantity}</div>
      </div>
    </div>
  `
    )
    .join("");

  // orderButton ve emptyCartMessage elemanlarını ekleyerek sırayı değiştir
  const orderButtonHTML = `
    <a href="#" class="btn" id="orderButton">Sipariş Oluştur</a>
  `;
  const emptyMessageHTML = `
  <div class="empty-cart-message" id="emptyCartMessage">
  Sepetinizde ürün bulunmamaktadır.
</div> `;

  // Eğer sepet boşsa, mesajı göster
  if (cartItems.length == 0) {
    cardContainer.innerHTML = cartItemsHTML + emptyMessageHTML;
  } else {
    cardContainer.innerHTML = cartItemsHTML + orderButtonHTML;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Sepetin görünürlük durumunu kontrol et
  if (
    cardContainer.style.display === "block" ||
    cardContainer.style.display === ""
  ) {
    cardContainer.style.display = "none";
    cardContainer.style.opacity = "0"; // Opacity'yi 0 olarak ayarlayarak başlangıç durumunu kontrol et
  }

  buttonsShoping.addEventListener("click", function () {
    console.log(cardContainer.style.display);

    // Görünürlük durumunu kontrol et
    if (
      cardContainer.style.display === "none" ||
      cardContainer.style.opacity === "0"
    ) {
      // Kart container'ı görünür hale getir
      cardContainer.style.display = "block";
      cardContainer.style.transition = "opacity 500ms";
      setTimeout(() => {
        cardContainer.style.opacity = "1";
      }, 0);
    } else {
      // Kart container'ı gizle
      cardContainer.style.opacity = "0";
      setTimeout(() => {
        cardContainer.style.display = "none";
      }, 500);
    }
  });

  // LocalStorage'dan sepet verilerini yükle
  loadCartFromLocalStorage();
});

/* ---------------------------------------------------------------------------------------------- */
// Footer'a anlık saat ve tarih bilgisi eklendi
function tarihSaat() {
  var date = new Date().toLocaleString("tr-TR");
  document.getElementById("zaman").innerHTML = date;
}

// Her 0,1 saniyede tarihSaat fonksiyonunu yeniden çalıştır
setInterval(tarihSaat, 100);

/* ---------------------------------------------------------------------------------------------- */
