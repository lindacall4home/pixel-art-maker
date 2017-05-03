var chosenColor = 'white';
var drawing = false;

var createButton = function(text, eventHandler){
  var button = document.createElement('button');
  button.innerText = text;
  button.style.width = '100px';
  button.style.height = '30px';
  button.style.margin = '10px';
  button.style.border = 'solid 2px black';
  button.style.borderRadius = '10%';
  button.style.backgroundColor = '#efefd7';

  button.addEventListener('click', eventHandler);

  return saveButton;
};

var savePicture = function(){
  var canvas = document.getElementById('canvas');
  console.log(canvas);
  console.log(JSON.stringify(canvas));
};

var createContainer = function(width, height){
  var container = document.createElement('section');
  container.style.width = width + 'px';
  container.style.height = height + 'px';
  container.style.border = '5px solid black';
  container.style.margin = '7px 12% 10px 12%';
  container.style.display = 'inline-block';

  return container;
};

var createOuterContainer = function(){
  var container = document.createElement('section');
  container.style.width = '80%';
  container.style.height = '80%';
  container.style.border = '2px solid black';
  container.style.margin = '8%';
  container.style.display = 'inline-block';
  container.style.backgroundColor = '#FFFFE0';

  return container;
};

var createWidgetHead = function(text){
    var head = document.createElement('h1');
    head.innerText = text;
    head.style.fontSize = '36px';
    head.style.textAlign = 'center';
    return head;
};

var createCanvasGrid = function(gridRows, gridCols, cellSize, canvas){

  for (var row = 1; row <= gridRows; row++){
    for (var col = 1; col <= gridCols; col++){
      var cell = document.createElement('div');
      var width =
      cell.style.width = cellSize + 'px';
      cell.style.paddingBottom = cellSize - 2 + 'px';
      cell.style.float = 'left';
      cell.style.backgroundColor = 'white';
      cell.style.border = 'solid 1px black';
      cell.style.boxSizing = 'border-box';
      canvas.appendChild(cell);
    }
  }
};

var addColorToPalette = function(color, palette){

  var colorDiv = document.createElement('div');
  colorDiv.className = 'selector';
  colorDiv.style.width = '40px';
  colorDiv.style.paddingBottom = '40px';
  colorDiv.style.float = 'left';
  colorDiv.style.backgroundColor = color;
  colorDiv.style.borderRadius = '50%';
  colorDiv.style.boxSizing = 'border-box';
  colorDiv.style.margin = '10px';
  colorDiv.style.border = 'solid 1px gray';

  palette.appendChild(colorDiv);

  return colorDiv;
};

var addColorPickerToPalette = function(palette){

  var colorPicker = document.createElement('input');

  colorPicker.type = 'color';
  colorPicker.style.width = '120px';
  colorPicker.style.paddingBottom = '25px';
  colorPicker.style.float = 'left';
  colorPicker.style.backgroundColor = 'white';
  colorPicker.style.borderRadius = '10%';
  colorPicker.style.boxSizing = 'border-box';
  colorPicker.style.margin = '10px';
  colorPicker.style.border = 'solid 1px black';
  colorPicker.id = 'colorPicker';
  colorPicker.style.fontSize = '14px';
  colorPicker.style.textAlign = 'center';
  //colorPicker.placeholder = 'any color code';
  colorPicker.style.lineHeight = '20px';

  colorPicker.addEventListener('change', setChosenColor);

  palette.appendChild(colorPicker);

};

var setChosenColor = function(){
  var colorPicker = document.getElementById('colorPicker');

  if(event.target === colorPicker){
    chosenColor = event.target.value;
    colorPicker.style.border = 'solid 3px black';
  }
  else {
    chosenColor = event.target.style.backgroundColor;
    colorPicker.style.border = 'solid 1px gray';

  }

  colorPicker.style.backgroundColor = chosenColor;

  var colorSelectors = document.body.getElementsByClassName('selector');
  for(var i = 0; i < colorSelectors.length; i++){
      if(colorSelectors[i].style.backgroundColor === chosenColor){
        colorSelectors[i].style.border = 'solid 3px black';
      }
      else{
        colorSelectors[i].style.border = 'solid 1px gray';

      }
  }

//  console.log(chosenColor);
};

var setCellColor = function(){
  event.target.style.backgroundColor = chosenColor;
};

var startDrawing = function(){
  drawing = true;

};

var stopDrawing = function(){
  drawing = false;

};

var draw = function(){
  if(drawing){
    setCellColor();
  }
};

var createCanvas = function(gridRows, gridCols, cellSize){

  var canvas = createContainer(gridRows * cellSize, gridCols * cellSize);
  canvas.id = 'canvas';
  createCanvasGrid(gridRows, gridCols, cellSize, canvas);

  canvas.addEventListener('click', setCellColor);
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseover', draw);

  return canvas;
};

var createColorPalette = function(width, height){
  var colorPalette = document.createElement('section');

  colorPalette.style.display = 'inline-block';
  colorPalette.style.margin = '0 100px';
  colorPalette.style.textAlign = 'center';

  addColorToPalette('red', colorPalette);
  addColorToPalette('orange', colorPalette);
  addColorToPalette('yellow', colorPalette);
  addColorToPalette('green', colorPalette);
  addColorToPalette('blue', colorPalette);
  addColorToPalette('indigo', colorPalette);
  addColorToPalette('violet', colorPalette);
  addColorToPalette('white', colorPalette);

  addColorPickerToPalette(colorPalette);

  colorPalette.addEventListener('click', setChosenColor);

  return colorPalette;
};

var createMenuButtons = function(){

  var buttonContainer = document.createElement('section');

  var newButton = createButton('New', newPicture);
  buttonContainer.appendChild(newButton);

  var openButton = createButton('Open', openPicture);
  buttonContainer.appendChild(openButton);

  var saveButton = createButton('Save', savePicture);
  buttonContainer.appendChild(saveButton);
};

var createPixelMaker = function(gridRows, gridCols, cellSize){

  var outerContainer = createOuterContainer();
  document.body.appendChild(outerContainer);

  var heading = createWidgetHead('Pixel Art Maker');
  outerContainer.appendChild(heading);

  var canvas = createCanvas(gridRows, gridCols, cellSize);
  outerContainer.appendChild(canvas);

  var colorPalette = createColorPalette(gridRows * cellSize, '30px');
  outerContainer.appendChild(colorPalette);

  var menu = createMenuButtons();
  outerContainer.appendChild(menu);

};

createPixelMaker(40, 20, 20);
