console.log("Color Game Script Connected");
console.log("=============================");

var numberOfSquares = 6;
var typeOfgameModes = ["Hard", "Easy"];
var gameMode = typeOfgameModes[0]; //default gameMode is Hard
var pickedColor = "rgb(255,255,255)";

var btnNewColors = document.querySelector("#btnNewColors");
var btnEasyMode = document.querySelector("#btnEasyMode");
var btnHardMode = document.querySelector("#btnHardMode");
var squares = document.querySelectorAll(".squares");
var displayPickedRGB = document.querySelector(".displayPickedRGB");
var displayHeader = document.querySelector("#displayHeader");
var gameStatus = document.querySelector("#gameStatus");


// Adding Event Listeners
btnNewColors.addEventListener("click",onClick_btnNewColors);
btnEasyMode.addEventListener("click",onClick_btnEasyMode);
btnHardMode.addEventListener("click",onClick_btnHardMode);

//Initialize squares
onClick_btnNewColors();

// on Square selection and related events
for(var j=0; j < squares.length; j++){
	squares[j].addEventListener("click", function(){
		var selectedColor = this.style.background;
		console.log("Selected Color : " + selectedColor);
		console.log("Picked Color : " + pickedColor);

		if (pickedColor==selectedColor) {
			console.log("===========Correct Selection==========");
			changeColorToPicked();
			gameStatus.textContent = "Winner";
			btnNewColors.textContent = "Play Again";
		}
		else{
			console.log("***********Wrong Selection**********");
			this.style.background = "#232323";
			gameStatus.textContent = "Try Again!"
		}

	});
}


function onClick_btnNewColors(){
	gameStatus.textContent = "";
	btnNewColors.textContent = "NEW COLORS";
	// Should create random colors based on easy and hard mode
	if(gameMode =="Hard"){
		console.log("Game Mode : Hard");
		randomColorsGenerator(6);
	}

	else {
		console.log("Game Mode : Easy");
		randomColorsGenerator(3);
	}

}

function onClick_btnEasyMode(){
	gameMode = typeOfgameModes[1]; //Easy Mode Selects
	btnEasyMode.classList.add("buttonSelected");
	btnHardMode.classList.remove("buttonSelected");
	resetSquares()

	//hide other 3 squares
	squares[3].style.display = "none";
	squares[4].style.display = "none";
	squares[5].style.display = "none";
}

function onClick_btnHardMode(){
	gameMode = typeOfgameModes[0]; //Hard Mode Selects
	btnEasyMode.classList.remove("buttonSelected");
	btnHardMode.classList.add("buttonSelected");
	resetSquares();

	//Unhide other 3 squares
	squares[3].style.display = "block";
	squares[4].style.display = "block";
	squares[5].style.display = "block";
	
}

function randomColorsGenerator(numOfColors){
	var rgb =[];
	var r;
	var g;
	var b;
	
	for(var i=0; i < numOfColors; i++){
		r = randomNumberGenerator();
		g = randomNumberGenerator();
		b = randomNumberGenerator();

		rgb[i] = "rgb("+ r + ", " +g + ", " + b +")";
		squares[i].style.background = rgb[i];
	}

	//Pick a random rgb
	var pickedSquare = Math.floor(Math.random()*numOfColors) +1;
	pickedColor = rgb[pickedSquare-1];
	console.log("Picked Square is: " +pickedSquare," Picked RGB: " + pickedColor);
	displayPickedRGB.textContent = pickedColor;


}

// Generates number between 0 and 255
function randomNumberGenerator(){
	var num = Math.floor(Math.random()*256);
	return num;
}


function resetSquares(){
	for(var i=0; i < 6; i++){
		squares[i].style.background = "red";
	}
	displayPickedRGB.textContent = "RGB(255,255,255)";
	displayHeader.style.background = "steelblue";
	gameStatus.textContent = "";
	onClick_btnNewColors();
}

function changeColorToPicked(){
	for(var i=0; i < 6; i++){
		squares[i].style.background = pickedColor;
	}
	displayHeader.style.background = pickedColor;
}
