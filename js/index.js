// Helper function to check if an element is in the viewport-
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the intersection observer callback
function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        if (section.classList.contains("productive")) {
          const imgElement = section.querySelector(".productive-img");
          const contentElement = section.querySelector(".productive-content");
          
          imgElement.classList.add("slide-from-left");
          contentElement.classList.add("slide-from-right");
        } else {
          section.classList.add("animate");
          observer.unobserve(section);
        }
      
      }
    });
  }
  
function handleScroll() {
  const section = document.querySelector(".productive");
  if (isInViewport(section)) {
    section.querySelector(".productive-img").classList.add("slide-from-left");
    section
      .querySelector(".productive-content")
      .classList.add("slide-from-right");
    window.removeEventListener("scroll", handleScroll);
  }
}

// Create a new intersection observer
const observer = new IntersectionObserver(handleIntersection);
const section = document.querySelector(".productive");
observer.observe(section);

// Select all elements with the 'animated' or 'scroll-animation' classes
const animatedElements = document.querySelectorAll(
  ".animated, .scroll-animation"
);

// Observe each animated element
animatedElements.forEach((element) => {
  observer.observe(element);
});
// Check if elements are already in the viewport on page load
window.addEventListener("DOMContentLoaded", () => {
  animatedElements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add("animate");
    }
  });
});

// document.addEventListener('DOMContentLoaded', function () {
//     const hamburgerMenu = document.querySelector('.hamburger-menu');
//     const menuLinks = document.querySelector('.menu-links');
//     const menuIcon = document.querySelector('.menu-icon');
  
//     hamburgerMenu.addEventListener('click', function () {
//       this.classList.toggle('open');
//       menuLinks.classList.toggle('open');
//     });
//   });

// Check if elements are in the viewport on scroll
window.addEventListener("scroll", () => {
  animatedElements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add("animate");
    }
   
  });
});

window.addEventListener("scroll", handleScroll);
