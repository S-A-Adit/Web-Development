export function loadMenuPage() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  
  const menuTitle = document.createElement('h1');
  menuTitle.textContent = 'Our Menu';
  menuTitle.classList.add('menu-title');

  const menuItems = [
    { name: 'Margherita Pizza', price: '$12', desc: 'Classic tomato and mozzarella' },
    { name: 'Pasta Carbonara', price: '$14', desc: 'Creamy sauce with pancetta' },
    { name: 'Tiramisu', price: '$8', desc: 'Classic Italian dessert' }
  ];

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');

  menuItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('menu-item');
    
    itemElement.innerHTML = `
      <h3>${item.name} <span>${item.price}</span></h3>
      <p>${item.desc}</p>
    `;
    
    menuContainer.appendChild(itemElement);
  });

 content.append(menuTitle, menuContainer);
}
export default loadMenuPage;