const thumbnails = document.querySelectorAll('.grid-item img');
const overlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const fullscreenText = document.getElementById('file-name');

let currentIndex = -1;  // Track which image is open

// When a thumbnail is clicked fullscreen
thumbnails.forEach((thumbnail, index) => {
    thumbnail.closest('.grid-item').addEventListener('click', function () {
        currentIndex = index;
        fullscreenImage.src = thumbnail.dataset.full;  // Load full image
        fullscreenText.textContent = this.querySelector('p').textContent;
        overlay.style.display = 'flex';
    });
});

// Escape key closes overlay
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        overlay.style.display = 'none';
    }
});

// Click outside image closes overlay
overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});

// Arrow key navigation
document.addEventListener('keydown', function (event) {

    if (overlay.style.display !== 'flex') return;

    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % thumbnails.length;
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    } else {
        return;
    }

    // Get the new thumbnail and apply its FULL image
    const newThumb = thumbnails[currentIndex];
    fullscreenImage.src = newThumb.dataset.full;
    fullscreenText.textContent = newThumb.closest('.grid-item').querySelector('p').textContent;
});
