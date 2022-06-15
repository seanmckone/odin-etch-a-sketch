const body = document.querySelector('body');
const sketchGrid = document.querySelector('#sketchgrid');
const colorPicker = document.querySelector('.colorpicker');
const slider = document.querySelector('.slider');
const output = document.querySelector('.slidervalue');
const resetButton = document.querySelector('.resetbutton');
const eraserButton = document.querySelector('.eraserbutton');


let dopaint = false;
let eraserDown = false;
let paintColor = prevColor = colorPicker.value;

sketchGrid.draggable = false;
output.textContent = `${slider.value} x ${slider.value}`;

body.addEventListener('mousedown', ()=> {
    dopaint = true;
});
body.addEventListener('mouseup', ()=> {
    dopaint = false;
});


resetButton.addEventListener('mousedown', ()=> {
    resetButton.style.backgroundColor = 'gray';
    resetButton.style.paddingTop = '4px';
});

resetButton.addEventListener('mouseup', ()=> {
    resetButton.style.backgroundColor = '#4b4f58';
    resetButton.style.paddingTop = '1px';
    newGrid();
});

eraserButton.addEventListener('mousedown', ()=> {
    if(!eraserDown) {
        eraserButton.style.backgroundColor = 'gray';
    } else {
        eraserButton.style.backgroundColor = '#f55f5f';
    }
    eraserButton.style.paddingTop = '4px';
});

eraserButton.addEventListener('mouseup', ()=> {
    eraserButton.style.backgroundColor = '#4b4f58';
    eraserButton.style.paddingTop = '1px';
    eraserDown = !eraserDown;
    if(eraserDown) {
        prevColor = paintColor;
        paintColor = 'white';
        eraserButton.style.backgroundColor = 'red';
    } 
    else {
        paintColor = prevColor;
        eraserButton.style.backgroundColor = '#4b4f58';
    }
});

colorPicker.oninput = function() {
    paintColor = colorPicker.value;
}


gridWidth = 16;
newGrid();

slider.oninput = function() {
    output.textContent = `${slider.value} x ${slider.value}`;
}

slider.onchange = function() {
    gridWidth = slider.value;
    newGrid();
}

function newGrid() {
    while (sketchGrid.firstChild) {
        sketchGrid.removeChild(sketchGrid.firstChild);
    }
    for(let i = 0; i < gridWidth**2; i++){
        const griddiv = document.createElement('div');
        griddiv.style.backgroundColor = 'white';
        griddiv.style.width = `${700/gridWidth}px`
        griddiv.style.height = `${700/gridWidth}px`
        griddiv.classList.add(`griddiv`);
        griddiv.addEventListener("mousedown", function(event){event.preventDefault()});
        griddiv.addEventListener('mouseover', ()=> {
            if(dopaint) {
                griddiv.style.backgroundColor = paintColor;
            }
        });
        griddiv.addEventListener('mousedown', ()=> {
            griddiv.style.backgroundColor = paintColor;
        });
        sketchGrid.append(griddiv);
    }
}

