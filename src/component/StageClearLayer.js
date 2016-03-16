"use strict" ;

var comp = gxd.comp || { } ;
var proj = gxd.proj || { } ;

proj.StageClearLayer = comp.TouchBlockedLayer.extend(
{
	_backButton : null ,
	
	ctor : function( color , width , height )
	{
		this._super( color , width , height ) ;
		
		this._backButton = new comp.Button( cc.spriteFrameCache.getSpriteFrame( "back_normal.png" ) ,
											cc.spriteFrameCache.getSpriteFrame( "back_selected.png" ) ,
											this._backCallback ,
											this ,
											true ) ;
		
		this._backButton.setPosition( width * 0.5 , height * 0.5 ) ;
		this.addChild( this._backButton ) ;
	} ,
	
	_backCallback : function( )
	{
		cc.director.runScene( new proj.MenuScene( ) ) ;
	}
} ) ;