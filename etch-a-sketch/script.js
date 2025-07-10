document.addEventListener('DOMContentLoaded', () =>{
    const container= document.getElementById('container');
    const resizeBtn = document.getElementById('resize-btn');
    
    // Initial grid setup
    createGrid(16);

    resizeBtn.addEventListener('click', ()=> {
        let gridSize = prompt('Enter number of squares per side (max 100):', 16);
        gridSize = parseInt(gridSize);


        if (isNaN(gridSize) || gridSize <= 0) {
            alert('Please enter a positive number');
            return;
        }
        
        if (gridSize > 100) {
            alert('Maximum size is 100');
            gridSize = 100;
        }
        
        createGrid(gridSize);
    });

    function createGrid(size){
        // Clear existing grid
        container.innerHTML = '';

        // Calculate square size
        const squareSize = 640 /size;

       //Create 16x16 grid
       for(let i = 0; i < (size * size); i++){
          const square = document.createElement('div');
          square.classList.add('grid-square');
          square.style.length = `${squareSize}px`;
          square.style.width = `${squareSize}px`;

          // Store Original Brightness
          square.dataset.brightness = 100;

        // Add hover effect with progressive darkening and random color
        square.addEventListener('mouseenter', (e) => {

              // Only set random color if it's the first interaction (brightness 100%)
            if(e.target.dataset.brightness == 100){
                const randomColor = getRandomColor();
                e.target.style.backgroundColor = randomColor;
                e.target.dataset.originalColor = randomColor;
            }
            // Darken by 10%
             let brightness = parseInt(e.target.dataset.brightness);
             if(brightness > 0) {
                brightness -= 10;
                e.target.dataset.brightness = brightness;
                e.target.style.filter = `brightness(${brightness}%)`;
             }

        }); 
        container.appendChild(square);
        }
    }


    function getRandomColor(){
        const randomR = Math.floor(Math.random()*256);
        const randomG = Math.floor(Math.random()*256);
        const randomB = Math.floor(Math.random()*256);
        return `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
});