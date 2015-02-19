var canvas;
var ctx; // context for canvas

var mode = 0;
var maxMode = 1;

var maxIncs = 100;
var i = 0;

var footballMode = 0;
var maxFootballMode = 4;

function resetEdges()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


function clearScreen ( ctx, canvas )
{
	ctx.fillStyle = "rgba(0,0,0,0.8)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFootball()
{
    ctx.beginPath();
	ctx.moveTo( i * canvas.width / maxIncs, 0 );
	ctx.lineTo( 0, canvas.height - i * canvas.height / maxIncs );
    ctx.closePath();
	ctx.stroke();
}

function resetEdges()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


function clearScreen()
{
	ctx.fillStyle = "rgba(0,0,0,0.8)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function main() {
  canvas = document.getElementById('swamp');
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');

	resetEdges();
	clearScreen();

	setInterval( updateLines, 30 );
  }
}

function updateLines()
{
	switch( mode ){
		case 0:
			drawFootball();
			break;
		default:
			// oh oh
	}
	
	if( ++i >= maxIncs )
	{
		i = 0;
		++mode;

		if( mode >= maxMode )
		{
			mode = 0;
		}
	}

}
