function loadAboutPage() {
  const content = document.getElementById('content');
  content.innerHTML = '';

  // Create about container
  const aboutContainer = document.createElement('div');
  aboutContainer.classList.add('about-container');

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = 'Our Story';
  aboutContainer.appendChild(heading);

  // Create restaurant image
  const restaurantImage = document.createElement('img');
  restaurantImage.src = require('../assets/restaurant-interior.jpg'); 
  restaurantImage.alt = 'Restaurant interior';
  restaurantImage.classList.add('about-image');
  aboutContainer.appendChild(restaurantImage);

  // Create history section
  const history = document.createElement('div');
  history.classList.add('history');
  history.innerHTML = `
    <h3>Since 1985</h3>
    <p>Founded by Chef Giovanni Rossi, our restaurant has been serving authentic Italian cuisine for over three decades. What began as a small family trattoria has grown into an award-winning dining establishment, while maintaining its warm, welcoming atmosphere.</p>
  `;

  // Create philosophy section
  const philosophy = document.createElement('div');
  philosophy.classList.add('philosophy');
  philosophy.innerHTML = `
    <h3>Our Philosophy</h3>
    <p>We believe in using only the freshest ingredients, sourced locally whenever possible. Every dish is prepared with passion and respect for traditional recipes, while incorporating modern culinary techniques.</p>
  `;

  // Create team section
  const team = document.createElement('div');
  team.classList.add('team');
  team.innerHTML = `
    <h3>Meet Our Team</h3>
    <div class="team-members">
      <div class="member">
        <h4>Chef Maria Bianchi</h4>
        <p>Head Chef</p>
      </div>
      <div class="member">
        <h4>Luigi Conti</h4>
        <p>Sommelier</p>
      </div>
      <div class="member">
        <h4>Sophia Romano</h4>
        <p>Pastry Chef</p>
      </div>
    </div>
  `;

  // Append all sections
  aboutContainer.append(history, philosophy, team);
  content.appendChild(aboutContainer);
}

export default loadAboutPage;