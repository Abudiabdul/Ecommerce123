let menuitems = document.getElementById("menuitems");
menuitems.style.maxHeight = "0px";

function menuToggle() {
    const titleElements = document.querySelectorAll('.title1');
    
    if (menuitems.style.maxHeight == "0px") {
        menuitems.style.maxHeight = "200px";
        
        titleElements.forEach(title => {
            title.style.marginTop = "170px";  
        });
    } else {
        menuitems.style.maxHeight = "0px";
        
        titleElements.forEach(title => {
            title.style.marginTop = "0px";  
        });
    }
}

// Cart functionality
let cart = [];

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    console.log(`Cart: ${totalItems} items, Total: $${totalPrice}`);
}

function addToCart(name, price, imageSrc) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, imageSrc });
    }
    updateCartDisplay();
    saveCartToLocalStorage();
    showAddedToCartFeedback(name, imageSrc);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function showAddedToCartFeedback(name, imageSrc) {
    const feedback = document.createElement('div');
    feedback.classList.add('added-to-cart-feedback');
    feedback.innerHTML = `
        <img src="${imageSrc}" alt="${name}" width="50">
        <p>${name} added to cart!</p>
    `;
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.classList.add('show');
    }, 100);

    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productLink = e.target.closest('.product-link');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const imageSrc = productLink.querySelector('img').src;
            addToCart(name, price, imageSrc);
        });
    });
});

// Authentication form toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleLink = document.getElementById('toggle-link');
    const formTitle = document.getElementById('form-title');
    const authForm = document.getElementById('auth-form');
    const nameField = document.getElementById('name');
    const confirmPasswordField = document.getElementById('confirm-password');
    const toggleText = document.getElementById('toggle-text');

    if (toggleLink) {
        toggleLink.addEventListener('click', function (e) {
            e.preventDefault();

            if (formTitle.innerText === 'Sign In') {
                formTitle.innerText = 'Register';
                nameField.classList.remove('hidden');
                confirmPasswordField.classList.remove('hidden');
                nameField.required = true;
                confirmPasswordField.required = true;
                toggleText.innerHTML = 'Already have an account? <a href="#" id="toggle-link">Sign In here</a>';
                document.querySelector('.btn').innerText = 'Register';
            } else {
                formTitle.innerText = 'Sign In';
                nameField.classList.add('hidden');
                confirmPasswordField.classList.add('hidden');
                nameField.required = false;
                confirmPasswordField.required = false;
                toggleText.innerHTML = "Don't have an account? <a href=\"#\" id=\"toggle-link\">Register here</a>";
                document.querySelector('.btn').innerText = 'Sign In';
            }
        });
    }
});
