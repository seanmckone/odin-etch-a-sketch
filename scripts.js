const body = document.querySelector('body');
const sketchGrid = document.querySelector('#sketchgrid');
const toolbar = document.querySelector('#toolbar');
const colorPicker = document.querySelector('.colorpicker');
const slider = document.querySelector('.slider');
const output = document.querySelector('.slidervalue');
const gridButton = document.querySelector('.gridbutton');
const resetButton = document.querySelector('.resetbutton');
const eraserButton = document.querySelector('.eraserbutton');

let dopaint = false;
let eraserDown = false;
let gridOn = false;
let paintColor = prevColor = colorPicker.value;
let boxDimension = 800;
sketchGrid.style.width = `${boxDimension}px`;
sketchGrid.style.height = `${boxDimension}px`;
toolbar.style.width = `${boxDimension}px`;

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

gridButton.addEventListener('mousedown', ()=> {
    if(!gridOn) {
        gridButton.style.backgroundColor = 'gray';
    } else {
        gridButton.style.backgroundColor = '#6890EE';
    }
    gridButton.style.paddingTop = '4px';
});

gridButton.addEventListener('mouseup', ()=> {
    gridButton.style.backgroundColor = 'lightblue';
    gridButton.style.paddingTop = '1px';
    gridOn = !gridOn;
    if(gridOn) {
        gridButton.style.backgroundColor = 'blue';
    } 
    else {
        gridButton.style.backgroundColor = '#4b4f58';
    }
    toggleGridVisible();
});

colorPicker.oninput = function() {
    paintColor = colorPicker.value;
    eraserDown = false;
    eraserButton.style.backgroundColor = '#4b4f58';
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

function toggleGridVisible() {
    if(gridOn) {
        for(let i = 0; i < gridWidth**2; i++){
            sketchGrid.children[i].style.borderLeft = '1px solid black';
            sketchGrid.children[i].style.borderTop = '1px solid black';
            if(i % gridWidth == gridWidth - 1) {
                sketchGrid.children[i].style.borderRight = '1px solid black';
            }
            if(i > gridWidth**2 - gridWidth - 1) {
                sketchGrid.children[i].style.borderBottom = '1px solid black';
            }
        }
    } else {
        for(let i = 0; i < gridWidth**2; i++){
            sketchGrid.children[i].style.borderLeft = '0px';
            sketchGrid.children[i].style.borderTop = '0px';
            if(i % gridWidth == gridWidth - 1) {
                sketchGrid.children[i].style.borderRight = '0px';
            }
            if(i > gridWidth**2 - gridWidth - 1) {
                sketchGrid.children[i].style.borderBottom = '0px';
            }
        }
    }
}

function newGrid() {
    while (sketchGrid.firstChild) {
        sketchGrid.removeChild(sketchGrid.firstChild);
    }
    for(let i = 0; i < gridWidth**2; i++){
        const griddiv = document.createElement('div');
        griddiv.style.backgroundColor = 'white';
        griddiv.style.width = `${boxDimension/gridWidth}px`
        griddiv.style.height = `${boxDimension/gridWidth}px`
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
    if(gridOn){
        toggleGridVisible();
    }
}

