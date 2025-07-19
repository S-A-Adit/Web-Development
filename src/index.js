import  loadHomePage  from './pages/home.js';
import loadMenuPage from './pages/menu.js'
import loadContactPage from './pages/contact';
import loadAboutPage from './pages/about.js'; 
import './styles.css'



document.addEventListener('DOMContentLoaded', () => {
  loadHomePage(); // Load home page by default
  
  // Add event listeners to all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const tabName = e.target.dataset.tab;
      
      // You'll add other tab imports and conditions here later
      if (tabName === 'home') loadHomePage();
      if (tabName === 'menu') loadMenuPage();
      if(tabName === 'contact') loadContactPage();
      if(tabName === 'about') loadAboutPage();
    });
  });
});