var canvas;
var ctx; // context for canvas

var mode = 0;
var maxMode = 4;

var subMode = 0;
var maxSubMode = 0;

var maxIncs = 100;
var i = 0;

var halfX, halfY;

var maxRGB = 105;
var curRGB = 0;

var colorR = 0;
var colorG = 0;
var colorB = 0;

var targetR = maxRGB;
var targetG = maxRGB;
var targetB = maxRGB;

var incR = 1;
var incG = 1;
var incB = 1;

function hitMinimize()
{
	trace( "Hit Minimize" );
	document.getElementById( "content" ).className = "min";
	document.getElementById( "trace" ).className = "notrace";
}

function hitMaximize()
{
	trace( "Hit Maximize" );
	document.getElementById( "content" ).className = "max";
	document.getElementById( "trace" ).className = "notrace";
}

function hitKill()
{
	trace( "Hit Kill" );
	document.getElementById( "content" ).className = "kill";
	document.getElementById( "trace" ).className = "window";
}


function resetEdges()
{
	canvas.width = ( window.innerWidth > screen.availWidth ) ? screen.availWidth : window.innerWidth;
	canvas.height = ( window.innerHeight > screen.availHeight ) ? screen.availHeight : window.innerHeight;

	/*
	viewport = document.querySelector("meta[name=viewport]");
	if( viewport )
	{
		viewport.setAttribute('content', 'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0');
	}
	else
	{
		trace( 'ERROR: no viewport found' )
	}
	*/

	halfX = canvas.width / 2;
	halfY = canvas.height / 2;

	trace( 'DEBUG: width='+canvas.width+'(innerWidth=' + window.innerWidth + ', availWidth=' + screen.availWidth + ')' )
	trace( 'DEBUG: height='+canvas.height+'(innerHeight=' + window.innerHeight + ', availHeight=' + screen.availHeight + ')' )
}


function clearScreen ( ctx, canvas )
{
	ctx.fillStyle = "rgba(0,0,0,0.0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}


var TRACE_MAX_LINES = 12;
var TRACE_begin = '<ul><li>';
var TRACE_middle = '</li><li>';
var TRACE_end = '</li></ul>';
var TRACE_lineList = [ "sammyoos :: swampy v0.008" ];

function trace(msg) 
{
	var output_window = document.getElementById("trace");

	if (TRACE_lineList.length > 0) {
		while (TRACE_lineList.length >= TRACE_MAX_LINES) { TRACE_lineList.shift(); }
		TRACE_lineList.push(msg);
	}
	else {
		TRACE_lineList = [ msg ];
	}

	output_window.innerHTML = TRACE_begin + TRACE_lineList.join(TRACE_middle) + TRACE_end;
}

function drawVerticalDividers()
{
	height = i * canvas.height / maxIncs;
	topY = height / 2;
	botY = ( canvas.height - topY );

	ctx.fillRect( halfX-1, 0, 3, topY );
	ctx.fillRect( halfX-1, botY, 3, topY );

}

function drawHorozontalDividers()
{
	width = i * canvas.width / maxIncs;
	x = ( canvas.width - width ) / 2;

	ctx.fillRect( x, halfY-1, width, 3 );

}

function drawQuarterCurtains()
{
	bitX = i * canvas.width / maxIncs / 2;
	bitY = i * canvas.height / maxIncs / 2;

	leftX = bitX;
	rightX = canvas.width - bitX;

	topY = halfY + bitY;
	bottomY = halfY - bitY;

	ctx.beginPath();
	ctx.moveTo( leftX, halfY );
	ctx.lineTo( halfX, topY );
	ctx.lineTo( rightX, halfY );
	ctx.lineTo( halfX, bottomY );
	ctx.lineTo( leftX, halfY );
	ctx.closePath();
	ctx.stroke();

}

function drawFootball()
{
	var x1, x2, y1, y2;

	switch( subMode ){
		case 0:
			x1 = i * canvas.width / maxIncs;
			y1 = 0;
			x2 = 0;
			y2 = canvas.height - i * canvas.height / maxIncs;
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
			y2 = canvas.height - i * canvas.height / maxIncs;
			break;
		default:
			// oh oh
			trace( "ERROR: hit default case in drawFootball" );
	}

	ctx.beginPath();
	ctx.moveTo( x1, y1 );
	ctx.lineTo( x2, y2 );
	ctx.closePath();
	ctx.stroke();

}

function pickNewColor()
{
	if( ++curRGB >= maxRGB )
	{
		curRGB = 0;

		colorR = targetR;
		colorG = targetG;
		colorB = targetB;

		targetR = (Math.random() * maxRGB / 2) + 5;
		targetG = (Math.random() * maxRGB / 2) + 5;
		targetB = (Math.random() * maxRGB / 2) + 5;

		incR = ( targetR - colorR ) / maxRGB;
		incG = ( targetG - colorG ) / maxRGB;
		incB = ( targetB - colorB ) / maxRGB;
	}

	return( "rgb(" + Math.round( colorR + curRGB * incR )
			+ ","  + Math.round( colorG + curRGB * incG )
			+ ","  + Math.round( colorB + curRGB * incB )
			+ ")"  );
}

function resetMode( m )
{
	switch( m ){
		case 0: // football mode
			maxSubMode = 4;
			break;
		case 1: // horizontal line mode
			maxSubMode = 1;
			break;
		case 2: // quarter curtians
			maxSubMode = 1;
			break;
		default:
			// oh oh
	}

}

function resetEdgess()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


function clearScreen()
{
	ctx.fillStyle = "rgba(0,0,0,0.8)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function updateLines()
{
	switch( mode ){
		case 0:
			drawFootball();
			break;
		case 1:
			drawHorozontalDividers();
			break;
		case 2:
			drawQuarterCurtains();
			break;
		case 3:
			drawVerticalDividers();
			break;
		default:
			// oh oh
	}

	ctx.strokeStyle = pickNewColor()
	
	if( ++i >= maxIncs )
	{
		i = 0; 
		if( ++subMode >= maxSubMode )
		{
			subMode = 0; 
			if( ++mode >= maxMode ) { mode = 0; }
			resetMode( mode );
		}
		trace( "Mode: " + mode + " - subMode : " + subMode )
	}

}


function main() 
{
  canvas = document.getElementById('swamp');
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
	ctx.globalCompositeOperation = "screen";
	ctx.globalCompositeOperation = "lighter";

	document.getElementById("ctrlMin" ).onclick  = hitMinimize;
	document.getElementById("ctrlMax" ).onclick  = hitMaximize;
	document.getElementById("ctrlKill").onclick  = hitKill;

	resetEdges();
	clearScreen();

	resetMode( mode );
	setInterval( updateLines, 30 );
  }
}

