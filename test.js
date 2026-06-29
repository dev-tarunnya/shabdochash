 
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'bn',
                includedLanguages: 'bn,en',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        }
   
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0000CD',
                        'primary-dark': '#000099',
                        secondary: '#8B2323',
                        button: '#FEE469',
                        'button-dark': '#E5CE50',
                        dark: '#1a1a2e',
                    },
                    fontFamily: {
                        sans: ['Noto Sans Bengali', 'Inter', 'sans-serif'],
                    }
                }
            }
        }

// ===== SLIDER =====
let currentSlide = 0;
const totalSlides = 3;
let slideInterval;

function goSlide(n) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sdot').forEach(d => { d.style.opacity = '0.5'; d.style.transform = 'scale(1)'; });
    currentSlide = n;
    document.querySelector(`.slide[data-slide="${n}"]`).classList.add('active');
    const dot = document.querySelector(`.sdot[data-dot="${n}"]`);
    if (dot) { dot.style.opacity = '1'; dot.style.transform = 'scale(1.3)'; }
    resetInterval();
}

function nextSlide() { goSlide((currentSlide + 1) % totalSlides); }
function prevSlide() { goSlide((currentSlide - 1 + totalSlides) % totalSlides); }
function resetInterval() { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 5000); }
slideInterval = setInterval(nextSlide, 5000);

// ===== CART =====
let cart = [];

function openCart() {
    document.getElementById('cart-overlay').classList.remove('hidden');
    document.getElementById('cart-sidebar').style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cart-sidebar').style.transform = 'translateX(100%)';
    document.getElementById('cart-overlay').classList.add('hidden');
    document.body.style.overflow = '';
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) { existing.qty++; } 
    else { cart.push({ name, price, qty: 1 }); }
    updateCartUI();
    showToast(`"${name}" কার্টে যোগ হয়েছে!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const emptyEl = document.getElementById('cart-empty');
    const itemsEl = document.getElementById('cart-items');
    const footerEl = document.getElementById('cart-footer');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

    if (totalQty > 0) {
        countEl.textContent = totalQty;
        countEl.classList.remove('hidden');
        emptyEl.classList.add('hidden');
        itemsEl.classList.remove('hidden');
        footerEl.classList.remove('hidden');
        subtotalEl.textContent = `৳${subtotal}`;
        itemsEl.innerHTML = cart.map((item, i) => `
            
        `).join('');
    } else {
        countEl.classList.add('hidden');
        emptyEl.classList.remove('hidden');
        itemsEl.classList.add('hidden');
        footerEl.classList.add('hidden');
    }
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCartUI();
}

// ===== TOAST =====
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast bg-primary text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 max-w-xs';
    toast.innerHTML = `<span class="iconify w-5 h-5 text-button flex-shrink-0" data-icon="lucide:check-circle"></span>${message}`;
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 3200);
}

// Close mobile menu on escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeCart();
        document.getElementById('mob-menu').classList.remove('active');
    }
});

