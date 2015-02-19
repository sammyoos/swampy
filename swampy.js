var canvas;
var ctx; // context for canvas

var mode = 0;
var maxMode = 1;

var subMode = 0;
var maxSubMode = 0;

var maxIncs = 100;
var i = 0;


function resetEdges()
{
	canvas.width = ( window.innerWidth > screen.availWidth ) ? screen.availWidth : window.innerWidth;
	canvas.height = ( window.innerHeight > screen.availHeight ) ? screen.availHeight : window.innerHeight;
}


function clearScreen ( ctx, canvas )
{
	ctx.fillStyle = "rgba(0,0,0,0.8)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFootball()
{
	var x1, x2, y1, y2;

	switch( subMode ){
		case 0:
			x1 = i * canvas.width / maxIncs;
			y1 = 0;
			x2 = 0;
			y2 = canvas.height - i * canvas.height / maxIncs
			break;
		case 1:
			x1 = canvas.width-1;
			y1 = i * canvas.height / maxIncs;
			x2 = i * canvas.width / maxIncs;
			y2 = 0;
			break;
		case 2:
			x1 = canvas.width-1;
			y1 = i * canvas.height / maxIncs;
			x2 = canvas.width - i * canvas.width / maxIncs;
			y2 = canvas.height-1;
			break;
		case 3:
			x1 = canvas.width - i * canvas.width / maxIncs;
			y1 = canvas.height-1;
			x2 = 0;
			y2 = canvas.height - i * canvas.height / maxIncs
			break;
		default:
			// oh oh
	}

	ctx.beginPath();
	ctx.moveTo( x1, y1 );
	ctx.lineTo( x2, y2 );
	ctx.closePath();
	ctx.stroke();

}

function resetMode( m )
{
	switch( m ){
		case 0: // football mode
			maxSubMode = 4;
			break;
		default:
			// oh oh
	}

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


function main() 
{
  canvas = document.getElementById('swamp');
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');

	resetEdges();
	clearScreen();

	resetMode( 0 );
	setInterval( updateLines, 30 );
  }
}

function updateLines()
{
	if( mode > maxMode )
	{
		return; 
	}

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

		if( ++subMode >= maxSubMode )
		{
			subMode = 0;

			if( ++mode >= maxMode )
			{
				// mode = 0;
			}
			resetMode( mode );
		}
		console.log( "Mode: " + mode + " - subMode : " + subMode )
	}

}
