/**
 *
 */
 
"use strict"

var assert	= chai.assert ;
var dev		= gxd.dev || { } ;

/**
 * Log output target.
 * @constant 
 * @type		{number}
 */
dev.LOG_OUTPUT_TARGET =
{
	NONE		: 0x00 ,
	CONSOLE		: 0x01 ,
	SCREEN		: 0x02 ,
	TEXT_FILE	: 0x11 ,
	ALL_ENABLE	: 0xFF
} ;

dev.LogOutputTarget = dev.LOG_OUTPUT_TARGET.ALL_ENABLE ;

// singleton
dev.LogScreen =
{
} ;

/**
 * @function
 * @memberof	gxd.dev
 * @param		{object}	message
 */
dev.print = function( message )
{
	var timeString = "[" + ( new Date( ) ).toFormat( "hh:mm:ss.S" ) + "] " ;
	
	message = timeString + message ;
	
	if( dev.LogOutputTarget & dev.LOG_OUTPUT_TARGET.CONSOLE )
		cc.log( message ) ;
	
	// if( LogOutputTarget & LOG_OUTPUT_TARGET.SCREEN )
		// 
} ;

/**
 * @function
 * @memberof	gxd.dev
 * @param		{object}	target
 */
dev.dump = function( target )
{
	for( var key in target )
	{
		if( dev.LogOutputTarget & dev.LOG_OUTPUT_TARGET )
			cc.log( target.key ) ;
		
		// if(( LogOutputTarget & LOG_OUTPUT_TARGET )
			// 
	}
} ;

// INFO (green)
// dev.logi = function( message ) { } ;

// VERBOSE (black)
// dev.logv = function( message ) { } ;

// DEBUG (blue)
// dev.logd = function( message ) { } ;

// WARN (orange)
// dev.logw = function( message ) { } ;

// ERROR (red)
// dev.loge = function( message ) { } ;

Object.defineProperty( dev , "__LINE__" ,
{
	/**
	 * @return	{string}
	 */
	get : function( )
	{
		var stacks	= new Error( ).stack.split( "\n" ) ;
		var lines	= stacks[ 1 ].split( ":" ) ;
		
		return lines[ lines.length - 2 ] ;
	}
} ) ;

Object.defineProperty( dev , "__FILE__" ,
{
	get : function( )
	{
		return new Error( ).stack.split( "\n" )[ 1 ].split( "@" )[ 1 ].split( ":" ).slice( 0 , -1 ).join( ":" ) ;
	}
} ) ;