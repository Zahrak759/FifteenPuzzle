/*Extra Feature: End-of_Game Notification */

var puzzlePiece;
var alerter;
var timer;
var spaceW;
var spaceH;

window.onload = function (){

//retrieve element within puzzleplace
var puzzlePlace = document.getElementById('puzzleplace');
	 = puzzlePlace.getElementsByTagName('div');

//applies features to each puzzle piece
for (var i=0; i<puzzlePiece.length; i++){
  puzzlePiece[i].className = 'puzzlepiece';
	puzzlePiece[i].style.left = (i%4*100)+'px';
	puzzlePiece[i].style.top = (parseInt(i/4)*100) + 'px';
	puzzlePiece[i].style.backgroundPosition= '-' + puzzlePiece[i].style.left + ' ' + '-' + puzzlePiece[i].style.top;
	puzzlePiece[i].onmouseover = function(){
			if (checkMove(parseInt(this.innerHTML))){
				this.style.border = "3px solid red";
				this.style.color = "#006600";
				this.style.textDecoration = "underline";
        this.style.backgroundImage="panther.png";
			}
		};
  puzzlePiece[i].onmouseout = function(){
		this.style.border = "2px solid black";
		this.style.color = "#000000";
		this.style.textDecoration = "none";
		};
	puzzlePiece[i].onclick = function(){
    if (checkMove(parseInt(this.innerHTML))){
				swap(this.innerHTML-1);
				if (finish()){
					win();
				}
				return;
			}
		};
	}

	var shuffle = document.getElementById('shufflebutton');
	spaceH = '300px';
	spaceW = '300px';
	shuffle.onclick = function(){
		for (var i=0; i<300; i++)
		{
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0){
			var temp = up(spaceH, spaceW);
			if (temp != -1){
				swap(temp);
				}
			}
			if (rand == 1){
			var temp = down(spaceH, spaceW);
			   if ( temp != -1){
					swap(temp);
				}
			}
			if (rand == 2){
				var temp = left(spaceH, spaceW);
				if (temp != -1){
					swap(temp);
	       }
			}
			if (rand == 3){
				var temp = right(spaceH, spaceW);
				if (temp != -1){
					swap(temp);
				}
			}
		}
	};
};

function checkMove(position){
	if (left(spaceH, spaceW) == (position-1)){
		return true;
	}
	if (down(spaceH, spaceW) == (position-1)){
		return true;
	}
  if (up(spaceH, spaceW) == (position-1)){
		return true;
	}
	if (right(spaceH, spaceW) == (position-1)){
		return true;
	}
}

function alerter(){
	alerter --;

	if (alerter == 0){
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundImage= "none";
		alert('Winner! ... Shuffle and Play Again');

		var para=document.getElementsByClassName('explanation');
	  para[0].style.visibility="visible";
		return;
	}
	else  (alerter % 2){
		var body = document.getElementsByTagName('body');
	  body[0].style.backgroundImage= "panther.png";
	}
    timer= setTimeout(alerter, 200);
  }

function win(){
	var body = document.getElementsByTagName('body');
  body[0].style.backgroundImage= "panther.png";
	alerter = 10;

	timer= setTimeout(alerter, 200);

	var para=document.getElementsByClassName('explanation');
	para[0].style.visibility="hidden";
}

function finish(){
	var flag = true;

	for (var i = 0; i < puzzlePiece.length; i++){
		var top = parseInt(puzzlePiece[i].style.top);
		var left = parseInt(puzzlePiece[i].style.left);

		if (left != (i%4*100) || top != parseInt(i/4)*100){
			flag = false;
			break;
		}
	}
	return flag;
}
function left(x, y){
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX > 0){
		for (var i = 0; i < puzzlePiece.length; i++){
			if (parseInt(puzzlePiece[i].style.left) + 100 == cordX && parseInt(puzzlePiece[i].style.top) == cordY){
				return i;
			}
		}
	}
	else{
    return -1;
	}
}
function right (x, y){
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX < 300){
		for (var i =0; i<puzzlePiece.length; i++){
			if (parseInt(puzzlePiece[i].style.left) - 100 == cordX && parseInt(puzzlePiece[i].style.top) == cordY){
				return i;
			}
		}
	}
	else{
		return -1;
	}
}
function up(x, y){
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordY > 0){
		for (var i=0; i<puzzlePiece.length; i++){
			if (parseInt(puzzlePiece[i].style.top) + 100 == cordY && parseInt(puzzlePiece[i].style.left) == cordX){
				return i;
			}
		}
	}
	else{
		return -1;
	}
}
function down (x, y){
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordY < 300){
		for (var i=0; i<puzzlePiece.length; i++){
			if (parseInt(puzzlePiece[i].style.top) - 100 == cordY && parseInt(puzzlePiece[i].style.left) == cordX){
				return i;
			}
		}
	}
	else{
		return -1;
	}
}
function swap (position){

	var temp = puzzlePiece[position].style.top;
	puzzlePiece[position].style.top = spaceW;
	spaceW = temp;
	temp = puzzlePiece[position].style.left;
	puzzlePiece[position].style.left = spaceH;
	spaceH = temp;
}
