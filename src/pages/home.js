function loadHomePage() {
  const content = document.getElementById('content');
  
  // Clear existing content
  content.innerHTML = '';
  
  // Create restaurant homepage elements
  const heading = document.createElement('h1');
  heading.textContent = 'Welcome to Delicious Bites!';
  heading.classList.add('home-heading'); // Added CSS class
  
  const image = document.createElement('img');
  image.src = require('../assets/restaurant.jpg'); 
  image.alt = 'Our restaurant';
  image.style.width = '500px';
  image.classList.add('restaurant-image'); 
  
  const description = document.createElement('p');
  description.textContent = 'Serving the finest cuisine since 1995. Our chefs use only the freshest ingredients to create memorable dining experiences.';
  description.classList.add('description');


  const container = document.createElement('div');
  container.classList.add('content-container');
  
  // Append elements to content div
  content.appendChild(heading);
  content.appendChild(description);
  content.appendChild(image);
  content.appendChild(container);
}
export default loadHomePage;