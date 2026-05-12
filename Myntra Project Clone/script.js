let currentSlide = 0;
const slides = document.querySelectorAll('.banner_image');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Auto-slide every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Wishlist interaction
const wishlistBtn = document.getElementById('wishlist-btn');
wishlistBtn.addEventListener('click', () => {
    const icon = wishlistBtn.querySelector('.action_icon');
    icon.classList.toggle('favorited');
    
    if (icon.classList.contains('favorited')) {
        alert('Added to Wishlist!');
    } else {
        alert('Removed from Wishlist!');
    }
});

// Bag interaction
let bagCount = 0;
const bagBtn = document.getElementById('bag-btn');
const bagBadge = document.querySelector('.bag-item-count');

bagBtn.addEventListener('click', () => {
    bagCount++;
    bagBadge.innerText = bagCount;
    bagBadge.classList.add('show');
    alert('Item added to Bag! Total items: ' + bagCount);
});

// Profile interaction
const profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', () => {
    alert('Opening Your Profile...');
});
