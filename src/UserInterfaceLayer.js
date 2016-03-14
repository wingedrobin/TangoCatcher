"use strict" ;

var proj = gxd.proj || { } ;

proj.UserInterfaceLayer = cc.Layer.extend(
{
	_questionLabel	: null ,
	_answerLabel	: null ,
	_tipMenu		: null ,
	
	ctor : function( )
	{
		this._super( ) ;
		
		var ui = new cc.Sprite( res.Interface_png ) ;
		ui.setPosition( ui.width * 0.5 , ui.height * 0.5 ) ;
		this.addChild( ui ) ;
		
		this.setContentSize( ui.getContentSize( ) ) ;
		
		this._questionLabel = new cc.LabelTTF( ) ;
		this._questionLabel.setFontSize( 40 ) ;
		this._questionLabel.setFontFillColor( cc.color( 0 , 0 , 0 ) ) ;
		this._questionLabel.setPosition( 200 , 100 ) ;
		
		this._answerLabel = new cc.LabelTTF( ) ;
		this._answerLabel.setFontSize( 40 ) ;
		this._answerLabel.setFontFillColor( cc.color( 0 , 0 , 0 ) ) ;
		this._answerLabel.setPosition( 200 , 40 ) ;
		
		this.addChild( this._questionLabel ) ;
		this.addChild( this._answerLabel ) ;
	} ,
	
	setQuestion : function( question )
	{
		this._questionLabel.setString( question ) ;
	} ,
	
	setAnswer : function( answer )
	{
		this._answerLabel.setString( this._answerLabel.getString( ) + answer ) ;
	} ,
	
	setAmountOfQuesiton : function( amount )
	{
		
	} ,
	
	setAmountOfCorrection : function( )
	{
	} ,
	
	_tipMenuItemClickedCallback : function( )
	{
	}
} ) ;