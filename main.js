"use strict";

var current_Tile;
var Y;
var X;
var temp;
  
 window.onload = function ()
 {
	var puzzleArea = document.getElementById('Tiles_area');
	current_Tile = puzzleArea.getElementsByTagName('div');
	for (var i=0; i<current_Tile.length; i++){
	current_Tile[i].className = 'puzzlepiece';
	current_Tile[i].style.left = (i%4*100)+'px';
	current_Tile[i].style.top = (parseInt(i/4)*100) + 'px';
	current_Tile[i].style.backgroundPosition= '-' +  current_Tile[i].style.left + ' ' + '-' + current_Tile[i].style.top;
    current_Tile[i].style.backgroundImage="url('https://codd.cs.gsu.edu/~znajib1/WP/PW/Fifteen-Puzzle/panther.png')";
  current_Tile[i].onmouseover = function() 
  {
  this.style.backgroundImage="url('https://codd.cs.gsu.edu/~znajib1/WP/PW/Fifteen-Puzzle/panther.png')";
			if (checkMove(parseInt(this.innerHTML)))
      {
				this.style.border = "3px solid red";
				this.style.color = "#006600";
				this.style.textDecoration = "underline";
			}
		}
		current_Tile[i].onmouseout = function()
    {
			this.style.border = "2px solid black";
			this.style.color = "#000000";
			this.style.textDecoration = "none";
		}
		current_Tile[i].onclick = function()
    {
			if (checkMove(parseInt(this.innerHTML)))
      {
				swap(this.innerHTML-1); //moves into an empty space if true
				if (finish()) //checks when the all the 15 pieces are in its right space
				{
					win(); //alerts the player that they have won the game
				}
				return;
			}
		}
	}
	var shuffle = document.getElementById('shuffle'); //initializes the shuffle button
	X = '300px';
	Y = '300px';
	shuffle.onclick = function()
  //shuffle.onclick = var fiveMinutes = 60 * 5  display = document.querySelector('#time');startTimer(fiveMinutes, display);;
  //activates whenever the shuffle button is clicked
	{
		for (var i=0; i<300; i++)
		{
			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece
			if (rand == 0)
			{
				var temp = up(X, Y);
				if ( temp != -1)
				{
					swap(temp);
				}
			}
			if (rand == 1)
			{
				var temp = down(X, Y);
				if ( temp != -1)
				{
					swap(temp);
				}
			}
			if (rand == 2)
			{
				var temp = left(X, Y);
				if ( temp != -1)
				{
					swap(temp);
				}
			}
			if (rand == 3)
			{
				var temp = right(X, Y);
				if (temp != -1)
				{
					swap(temp);
				}
			}
		} 
	}
}
function checkMove(position) // returns true whenever a piece can be moved into an empty space
{
	if (left(X, Y) == (position-1))
	{
		return true;
	}
	if (down(X, Y) == (position-1))
	{
		return true;
	}
	if (up(X, Y) == (position-1))
	{
		return true;
	}
	if (right(X, Y) == (position-1))
	{
		return true;
	}
}
function Message() //notifies the user
{
		alert('You Won! Click Ok to Play Again'); //tells the user that they have won the game
}
function win() //notifies user that they have won
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundImage= "url('https://codd.cs.gsu.edu/~znajib1/WP/PW/Fifteen-Puzzle/panther.png')";
  if(alert('Alert For your User!')){}
  else    window.location.reload(); 
}
function finish() //checks when the game reaches its end
{
	var flag = true;
	for (var i = 0; i <  current_Tile.length; i++) //for each puzzle piece
	{
		var top = parseInt( current_Tile[i].style.top);
		var left = parseInt( current_Tile[i].style.left);
		if (left != (i%4*100) || top != parseInt(i/4)*100) //checks if each piece matches its left and top position
		{
			flag = false;
			break;
		}
	}
	return flag;
}
function right (x, y) //calculates how far to the right a puzzlepiece should position
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);
	if (cordX < 300)
	{
		for (var i =0; i< current_Tile.length; i++)
			{
			if (parseInt( current_Tile[i].style.left) - 100 == cordX && parseInt( current_Tile[i].style.top) == cordY)
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
function left(x, y) //calculates how far to the left a puzzlepiece should position
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);
	if (cordX > 0)
	{
		for (var i = 0; i <  current_Tile.length; i++)
		{
			if (parseInt( current_Tile[i].style.left) + 100 == cordX && parseInt( current_Tile[i].style.top) == cordY)
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
		for (var i=0; i< current_Tile.length; i++)
		{
			if (parseInt( current_Tile[i].style.top) - 100 == cordY && parseInt( current_Tile[i].style.left) == cordX)
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
		for (var i=0; i< current_Tile.length; i++)
		{
			if (parseInt( current_Tile[i].style.top) + 100 == cordY && parseInt( current_Tile[i].style.left) == cordX)
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
	temp =  current_Tile[position].style.top;
	 current_Tile[position].style.top = Y;
	Y = temp;
	temp =  current_Tile[position].style.left;
	 current_Tile[position].style.left = X;
	X = temp;
}

