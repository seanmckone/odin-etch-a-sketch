dopaint = false;

const sketchGrid = document.querySelector('.sketchgrid');
sketchGrid.addEventListener('mousedown', ()=> {
    dopaint = true;
});
sketchGrid.addEventListener('mouseup', ()=> {
    dopaint = false;
});

sketchGrid.draggable = false;

let gridWidth = prompt('Grid Width?');

// Create grid of square divs
for(let i = 0; i < gridWidth**2; i++){
    const griddiv = document.createElement('div');
    griddiv.style.backgroundColor = 'white';
    griddiv.style.width = `${1000/gridWidth}px`
    griddiv.style.height = `${1000/gridWidth}px`
    // griddiv.style.borderLeft = '1px';
    // griddiv.style.borderRight = '0px';
    // griddiv.style.borderTop = '0px';
    // griddiv.style.borderBottom = '1px';
    // griddiv.style.borderStyle = 'solid';
    // griddiv.style.borderColor = 'red';
    griddiv.classList.add(`griddiv`);
    griddiv.addEventListener("mousedown", function(event){event.preventDefault()});
    griddiv.addEventListener('mouseover', ()=> {
        if(dopaint) {
            griddiv.style.backgroundColor = 'black';
        }
    });
    griddiv.addEventListener('click', ()=> {
        griddiv.style.backgroundColor = 'black';
    });
    sketchGrid.append(griddiv);
}


