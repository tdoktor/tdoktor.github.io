// Get elements
const thumbnails = document.querySelectorAll('.grid-item img');
const overlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const fullscreenText = document.getElementById('file-name');

// Array to store image sources for easy cycling
const imageSources = Array.from(thumbnails).map(img => img.src);
let currentIndex = -1;  // Keep track of the current image index

// When any thumbnail is clicked, open the fullscreen overlay
thumbnails.forEach((thumbnail, index) => {
    thumbnail.parentElement.parentElement.addEventListener('click', function() {
        currentIndex = index; // Set the current index to the clicked thumbnail
        fullscreenImage.src = imageSources[currentIndex];  // Set the src of the fullscreen image to the clicked thumbnail
        fullscreenText.innerHTML = thumbnail.parentElement.parentElement.querySelector('p').innerHTML;
        overlay.style.display = 'flex';       // Show the overlay
    });
});

// When pressing the Escape key, close the fullscreen overlay
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        overlay.style.display = 'none';  // Hide the overlay
    }
});

// Close the overlay when clicking outside the image (on the semi-transparent background)
overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
        overlay.style.display = 'none';  // Hide the overlay
    }
});

// Cycle images with Arrow keys
document.addEventListener('keydown', function(event) {
    if (overlay.style.display === 'flex') {  // Only respond if overlay is visible
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imageSources.length;  // Move to next image, wrap around
            fullscreenImage.src = imageSources[currentIndex];  // Update the image
            fullscreenText.innerHTML = thumbnails[currentIndex].parentElement.parentElement.querySelector('p').innerHTML;

        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;  // Move to previous image, wrap around
            fullscreenImage.src = imageSources[currentIndex];  // Update the image
            fullscreenText.innerHTML = thumbnails[currentIndex].parentElement.parentElement.querySelector('p').innerHTML;

        }
    }
});
