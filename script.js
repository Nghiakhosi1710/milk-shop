let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.banner__item');
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? 'flex' : 'none';
    });
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

setInterval(() => {
    nextSlide();
}, 5000);

// Toggle (mở/đóng) sidebar khi click vào nút
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Hiệu ứng thêm sản phẩm vào giỏ hàng
function addToCartAnimation(imgElement) {
    const cartIcon = document.querySelector('.cart-box');
    if (!cartIcon) return;

    // Lấy vị trí ảnh sản phẩm và giỏ hàng
    const rect = imgElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Tạo bản sao của ảnh sản phẩm để bay vào giỏ
    const imgClone = imgElement.cloneNode(true);
    imgClone.classList.add('fly-to-cart');
    imgClone.style.top = rect.top + 'px';
    imgClone.style.left = rect.left + 'px';
    imgClone.style.width = rect.width + 'px';
    imgClone.style.height = rect.height + 'px';
    imgClone.style.position = 'fixed';
    imgClone.style.transition = 'transform 0.8s ease, opacity 0.8s';

    document.body.appendChild(imgClone);

    // Tính toán khoảng cách di chuyển đến giỏ hàng
    const translateX = cartRect.left + cartRect.width / 2 - (rect.left + rect.width / 2);
    const translateY = cartRect.top + cartRect.height / 2 - (rect.top + rect.height / 2);

    setTimeout(() => {
        imgClone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.2)`;
        imgClone.style.opacity = "0";
    }, 10);

    imgClone.addEventListener('transitionend', () => {
        imgClone.remove();
    });
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartQuantity() {
    const cartCount = document.querySelector('.cart-box');
    let count = parseInt(cartCount.getAttribute('data-count')) || 0;
    count++;
    cartCount.setAttribute('data-count', count);
}

// Khi trang tải xong, chạy các chức năng sau
document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentSlide);

    // Sticky header khi cuộn trang
    let stikyWrapper = document.querySelector('.sticky-wrapper');
    document.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            stikyWrapper.classList.add('is-sticky');
        } else {
            stikyWrapper.classList.remove('is-sticky');
        }
    });

    document.querySelector('#navbar-toggler').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('navbar').classList.toggle('show');
    });

    // Xử lý dropdown menu khi click
    let dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            let dropdown = this.nextElementSibling;
            dropdown.classList.toggle('show');
        });
    });

    // Ẩn dropdown khi click ra ngoài
    document.addEventListener('click', function (e) {
        dropdownToggles.forEach(function (dropdownToggle) {
            let dropdown = dropdownToggle.nextElementSibling;
            if (!dropdownToggle.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });

    // Nút quay lại đầu trang
    var backToTop = document.querySelector('.back-to-top button');
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hiển thị search box khi click vào biểu tượng tìm kiếm
    let searchToggle = document.querySelector('#search-toggle');
    searchToggle.addEventListener('click', function () {
        let searchBox = document.querySelector('#search-box');
        searchBox.classList.toggle('show');
    });

    // Ẩn search box khi click ra ngoài
    document.addEventListener('click', function (e) {
        let searchBox = document.querySelector('#search-box');
        if (!searchToggle.contains(e.target) && !searchBox.contains(e.target)) {
            searchBox.classList.remove('show');
        }
    });

    // Ẩm search box khi nhấn nút close 
    let closeSearch = document.querySelector('#close-search');
    closeSearch.addEventListener('click', function () {
        let searchBox = document.querySelector('#search-box');
        searchBox.classList.remove('show');
    });

    // Hiển thị mini cart khi click vào giỏ hàng
    document.querySelector('.cart-box').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('mini-cart').classList.add('active');
    });

    // Đóng mini cart khi click vào nút đóng
    document.getElementById('close-mini-cart').addEventListener('click', () => {
        document.getElementById('mini-cart').classList.remove('active');
    });

    // Thêm sản phẩm vào giỏ hàng khi click nút "Thêm vào giỏ"
    document.querySelectorAll('.product-card__add-to-bag').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const img = btn.closest('.product-card').querySelector('img');
            if (img) {
                addToCartAnimation(img);
                updateCartQuantity();
            }
        });
    });
});
