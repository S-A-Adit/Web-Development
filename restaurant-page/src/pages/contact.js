function loadContactPage() {
  const content = document.getElementById('content');
  content.innerHTML = '';

  // Create contact container
  const contactContainer = document.createElement('div');
  contactContainer.classList.add('contact-container');

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = 'Contact Us';
  contactContainer.appendChild(heading);

  // Create contact info section
  const contactInfo = document.createElement('div');
  contactInfo.classList.add('contact-info');

  // Phone number
  const phone = document.createElement('p');
  phone.innerHTML = `<strong>Phone:</strong> <a href="tel:+1234567890">(123) 456-7890</a>`;
  
  // Email
  const email = document.createElement('p');
  email.innerHTML = `<strong>Email:</strong> <a href="mailto:info@restaurant.com">info@restaurant.com</a>`;
  
  // Address
  const address = document.createElement('p');
  address.innerHTML = `<strong>Address:</strong> 123 Food Street, Culinary City, CC 12345`;

  // Social media links
  const social = document.createElement('div');
  social.classList.add('social-links');
  social.innerHTML = `
    <strong>Follow us:</strong>
    <a href="https://facebook.com" target="_blank">Facebook</a>
    <a href="https://instagram.com" target="_blank">Instagram</a>
    <a href="https://twitter.com" target="_blank">Twitter</a>
  `;

  // Append all contact info
  contactInfo.append(phone, email, address, social);
  contactContainer.appendChild(contactInfo);

  // Create map placeholder
  const map = document.createElement('div');
  map.classList.add('map');
  map.innerHTML = `
    <iframe 
      src="https://maps.google.com/maps?q=restaurant&output=embed"
      frameborder="0"
      style="border:0"
      allowfullscreen
    ></iframe>
  `;

  contactContainer.appendChild(map);
  content.appendChild(contactContainer);
}

export default loadContactPage;