document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.parallax-item');
    const containerHeight = document.querySelector('.parallax-container').offsetHeight;

    items.forEach(item => {
        const randomPosition = Math.random() * (containerHeight - window.innerHeight);
        item.style.top = `${randomPosition}px`;
    });
});