// Select the hamburger button and the navigation menu
const hamburger = document.querySelector('.hamburger-menu');
const topUl = document.querySelector('.top-ul');

// Toggle the menu visibility on click
if (hamburger && topUl) {
  hamburger.addEventListener('click', () => {
    topUl.classList.toggle('active');
  });
}

// Toggle dropdown menu visibility
const dropdownLinks = document.querySelectorAll('.dropdown > a');
dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    const dropdownMenu = link.nextElementSibling;
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });
});
