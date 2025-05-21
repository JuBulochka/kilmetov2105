const products = [
    { id: 1, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 50.00, image: "./img/klipartz 3.png" },
    { id: 2, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 120.00, image: "./img/klipartz 3.png" },
    { id: 3, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 210.00, image: "./img/klipartz 3.png" },
    { id: 4, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 300.00, image: "./img/klipartz 3.png" },
    { id: 5, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 400.00, image: "./img/klipartz 3.png" },
    { id: 6, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 500.00, image: "./img/klipartz 3.png" },
    { id: 7, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 600.00, image: "./img/klipartz 3.png" },
    { id: 8, name: "EL003 Elleven Checkpoint-Friendly Compu-Backpack", price: 700.00, image: "./img/klipartz 3.png" },
];

    // Корзина
    let cart = [];

    // Элементы модального окна
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart');

// Отображение товаров в каталоге
const catalogElement = document.getElementById('catalog');

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
            <div class="product-card">
      <div class="img-section">
        <img src="./img/klipartz 3.png" alt="">
      </div>
      <div class="text-section">
        <h3 class="product-title">${product.name}</h3>
        <p class="desc">EL003 Elleven Checkpoint-Friendly Compu-Backpack</p>
        <ul class="colors">
          <li><img src="./img/Ellipse 2.png" alt=""></li>
          <li><img src="./img/Ellipse 3.png" alt=""></li>
          <li><img src="./img/Ellipse 4.png" alt=""></li>
        </ul>
      </div>
      <div class="price-buy-section">
        <p>From Price <br> ${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          <img src="./img/shopping-basket.png" alt="">
      </button>
      </div>
    </div>
    `;
    
    catalogElement.appendChild(productCard);
});

// Функция открытия корзины
function openCart() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Функция закрытия корзины
function closeCart() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Обработчики событий для модального окна
closeCartBtn.addEventListener('click', closeCart);
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

// Функция добавления товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Проверяем, есть ли товар уже в корзине
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        updateCart();
        openCart(); // Открываем корзину после добавления товара
    }
}

// Функция изменения количества товара
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        // Если количество стало 0 или меньше, удаляем товар из корзины
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCart();
    }
}

// Функция удаления товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Обновление корзины
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    
    // Очищаем корзину перед обновлением
    cartItemsElement.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        totalAmountElement.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="./img/klipartz 3.png" alt="">
                <div class="cart-item-name">${item.name}
                    <p class="col">Цвет<img src="./img/Ellipse 4.png" alt=""></p>
                </div>
            <div class="cart-item-controls">
                <p class="qa">Кол-во</p>
                <div class="quantity-control">
                    
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <input type="text" class="quantity-value" value="${item.quantity}" readonly>
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <p class="qab">min.</p>

            </div>
            <div class="cart-item-total">${itemTotal.toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})"><img src="./img/times-circle.png" alt=""></button>
        `;
        
        cartItemsElement.appendChild(itemElement);
    });
    
    totalAmountElement.textContent = total.toFixed(2);
}

// Оформление заказа
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    alert(`Заказ оформлен на сумму ${document.getElementById('total-amount').textContent}`);
    cart = [];
    updateCart();
});