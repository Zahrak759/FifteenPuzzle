

"use strict";

var gamePiece;
var notify;
var timer;
var spaceY;
var spaceX;

 window.onload = function (){

	var puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div');
	for (var i=0; i<gamePiece.length; i++){
		gamePiece[i].className = 'puzzlepiece';
		gamePiece[i].style.left = (i%4*100)+'px';
		gamePiece[i].style.top = (parseInt(i/4)*100) + 'px';
		gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top;
		gamePiece[i].onmouseover = function() {
			if (checkMove(parseInt(this.innerHTML))){
				this.style.border = "3px solid red";
				this.style.color = "#006600";
				this.style.textDecoration = "underline";
                this.style.backgroundImage="url('https://codd.cs.gsu.edu/~znajib1/WP/PW/Fifteen-Puzzle/panther.png')";
			}
		};
		gamePiece[i].onmouseout = function(){
			this.style.border = "2px solid black";
			this.style.color = "#000000";
			this.style.textDecoration = "none";
		};
		gamePiece[i].onclick = function(){
			if (checkMove(parseInt(this.innerHTML))){
				swap(this.innerHTML-1); //moves into an empty space if true


				if (finish()) //checks when the all the 15 pieces are in its right space

				{

					win(); //alerts the player that they have won the game

				}

				return;

			}

		};

	}


	var shuffle = document.getElementById('shufflebutton'); //initializes the shuffle button

	spaceX = '300px';
	spaceY = '300px';

	shuffle.onclick = function() //activates whenever the shuffle button is clicked

	{

		for (var i=0; i<300; i++)

		{

			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece

			if (rand == 0)

			{

				var temp = up(spaceX, spaceY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				var temp = down(spaceX, spaceY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}



			if (rand == 2)

			{

				var temp = left(spaceX, spaceY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}


			if (rand == 3)

			{

				var temp = right(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

		}

	};

};



function checkMove(position) // returns true whenever a piece can be moved into an empty space

{

	if (left(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (down(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (up(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (right(spaceX, spaceY) == (position-1))

	{

		return true;

	}

}


function Notify() //notifies the user

{

	notify --; //decrements the value of

	if (notify == 0) //if the value reaches the end then

	{

		var body = document.getElementsByTagName('body'); //retrieves body element in html

		body[0].style.backgroundImage= "none"; //reverts to original page background

		alert('You Won! Click Ok to Play Again'); //tells the user that they have won the game

		var para=document.getElementsByClassName('explanation');
	    para[0].style.visibility="visible"; //reverts visiblity to its original state

		return;

	}

	else  (notify % 2)

	{

		var body = document.getElementsByTagName('body');

	    body[0].style.backgroundImage= "url('https://codd.cs.gsu.edu/~znajib1/WP/PW/Fifteen-Puzzle/panther.png')";
	    //sets background pic to show user that they had completed the puzzle

	}

    timer= setTimeout(Notify, 200); //notifies the user for 2 secs
}



function win() //notifies user that they have won

{

	var body = document.getElementsByTagName('body');


	body[0].style.backgroundImage= "url('https://codd.cs.gsu.edu/~znajib1/WP/PW/Fifteen-Puzzle/panther.png')";

	notify = 10; //initializes notify variable

	timer= setTimeout(Notify, 200);

	var para=document.getElementsByClassName('explanation');
	para[0].style.visibility="hidden"; //hides text when user is being notified

}


function finish() //checks when the game reaches its end

{

	var flag = true;

	for (var i = 0; i < gamePiece.length; i++) //for each puzzle piece
	{

		var top = parseInt(gamePiece[i].style.top);

		var left = parseInt(gamePiece[i].style.left);


		if (left != (i%4*100) || top != parseInt(i/4)*100) //checks if each piece matches its left and top position

		{

			flag = false;

			break;

		}

	}

	return flag;

}



function left(x, y) //calculates how far to the left a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);



	if (cordX > 0)

	{

		for (var i = 0; i < gamePiece.length; i++)

		{

			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	}

}



function right (x, y) //calculates how far to the right a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordX < 300)

	{

		for (var i =0; i<gamePiece.length; i++){

			if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	}

}



function up(x, y) //calculates how far up a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY > 0)

	{

		for (var i=0; i<gamePiece.length; i++)

		{

			if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX)

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	}

}



function down (x, y) //calculates how far down a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY < 300)

	{

		for (var i=0; i<gamePiece.length; i++)

		{

			if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX)

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	}

}



function swap (position) //moves the puzzle piece by switching position with an empty space
{

	var temp = gamePiece[position].style.top;

	gamePiece[position].style.top = spaceY;

	spaceY = temp;

	temp = gamePiece[position].style.left;

	gamePiece[position].style.left = spaceX;

	spaceX = temp;

}
