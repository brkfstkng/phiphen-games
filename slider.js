let activeIndex = 0;
const images = document.querySelectorAll('.slider-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const highlightRect = document.querySelector('.highlight-rect');
const thumbnailItems = document.querySelectorAll('.thumbnail-item');

function updateSlider() {
  // Update active classes
  images.forEach((img, index) => {
    img.classList.toggle('active', index === activeIndex);
  });
  thumbnailItems.forEach((item, index) => {
    item.classList.toggle('active', index === activeIndex);
  });

  // Move highlight rectangle
  const activeItem = thumbnailItems[activeIndex];
  const itemRect = activeItem.getBoundingClientRect();
  const containerRect = document.querySelector('.thumbnails-container').getBoundingClientRect();

  const state = Flip.getState(highlightRect);
  gsap.set(highlightRect, { 
    x: itemRect.left - containerRect.left,
    y: itemRect.top - containerRect.top
  });
  Flip.from(state, {
    duration: 0.5,
    ease: "power2.inOut"
  });

  // Animate the image transition
  gsap.to(images, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.inOut"
  });
  gsap.to(images[activeIndex], {
    opacity: 1,
    duration: 0.3,
    ease: "power2.inOut"
  });
}

// Auto cycle
const autoPlayInterval = setInterval(() => {
  activeIndex = (activeIndex + 1) % images.length;
  updateSlider();
}, 3000);

// Thumbnail click handling
thumbnailItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    clearInterval(autoPlayInterval); // Stop auto cycle on user interaction
    activeIndex = index;
    updateSlider();
  });
});

// Initial setup
updateSlider();
