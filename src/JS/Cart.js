// 🛒 Sample Food Menu (Array of Objects)
const menu = [
  { id: 1, name: "Chicken Karahi", price: 2300 },
  { id: 2, name: "Mutton Biryani", price: 4100 },
  { id: 3, name: "Chicken Biryani", price: 350 },
  { id: 4, name: "Beef Biryani", price: 400 },
  { id: 5, name: "Roti", price: 20 },
  { id: 6, name: "Naan", price: 40 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from storage

// 🔹 Display Menu Dynamically
const displayMenu = () => {
  const menuList = document.getElementById("menuList");
  if (!menuList) return;
  
  menuList.innerHTML = menu.map(item => `
      <div class="p-3 bg-green-100 rounded flex justify-between items-center transition duration-300 hover:bg-green-200">
          <span class="font-bold text-green-700">${item.name} - PKR ${item.price.toFixed(2)}</span>
          <button onclick="addToCart(${item.id})" class="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded transition duration-300">
              Add to Cart
          </button>
      </div>
  `).join("");
};

// 🔹 Show Notification
const showCartMessage = (itemName) => {
  const messageBox = document.getElementById("cartMessage");
  if (!messageBox) return;

  messageBox.classList.remove("hidden");
  messageBox.textContent = `✅ ${itemName} added to cart!`;
  setTimeout(() => messageBox.classList.add("hidden"), 2000);
};

// 🔹 Add Item to Cart
const addToCart = (id) => {
  let item = menu.find(food => food.id === id);
  if (!item) return;

  let existingItem = cart.find(food => food.id === id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  showCartMessage(item.name);
};
// 🔹 Update Cart UI
const updateCart = () => {
  const cartList = document.getElementById("cartList");
  const totalPriceEl = document.getElementById("totalPrice");
  
  if (!cartList || !totalPriceEl) return;

  cartList.innerHTML = cart.map(item => `
      <div class="p-3 bg-green-200 rounded flex justify-between items-center transition duration-300 hover:bg-green-300">
          <span class="text-green-700">${item.name} x${item.quantity} - PKR ${(item.price * item.quantity).toFixed(2)}</span>
          <div>
              <button onclick="removeFromCart(${item.id})" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition duration-300">-</button>
              <button onclick="addToCart(${item.id})" class="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded transition duration-300">+</button>
          </div>
      </div>
  `).join("");
  totalPriceEl.textContent = `PKR ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
};
// 🔹 Remove Item from Cart
const removeFromCart = (id) => {
  let item = cart.find(food => food.id === id);
  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter(food => food.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
};
// 🔹 Checkout
const checkout = () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  alert("Order placed successfully!");
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
};
window.onload = () => {
  displayMenu();
  updateCart();

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }
};
