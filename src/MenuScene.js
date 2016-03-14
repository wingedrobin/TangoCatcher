"use strict" ;

var proj = gxd.proj || { } ;

proj.MenuScene = cc.Scene.extend(
{
	_backgroundLayer	: null ,
	_levelLayer			: null ,
	_monjiLayer			: null ,
	_layerMultiplex		: null ,
	
	ctor : function( )
	{
		this._super( ) ;
		
		this._backgroundLayer	= new proj.BackgroundLayer( res.background_png ) ;
		
		this._levelLayer		= new proj.LevelLayer( ) ;
		this._monjiLayer		= new proj.MonjiLayer( ) ;
		
		this._layerMultiplex	= new cc.LayerMultiplex( this._levelLayer , this._monjiLayer ) ;
		
		this.addChild( this._backgroundLayer ) ;
		this.addChild( this._layerMultiplex ) ;
	} ,
	
	layerSwitch( layerID )
	{
		this._layerMultiplex.switchTo( layerID ) ;
	} ,
	
	sceneChange : function( level )
	{
		var questionsFile = "res/level_" + level + ".json" ;
		
		cc.LoaderScene.preload( g_resources ,
								cc.loader.loadJson.bind( cc.loader ,
														 questionsFile ,
														 this._onQuestionsLoadedCallback.bind( this ) ) ,
								this ) ;
	} ,
	
	_onQuestionsLoadedCallback : function( error , json )
	{
		if( error )
			throw new Error( "Questions Jons load failed." ) ;
		
		cc.log( json ) ;
		proj.questions = json ;
		cc.spriteFrameCache.addSpriteFrames( res.MenuScene_plist , res.MenuScene_png ) ;
		cc.director.pushScene( new proj.MainScene( ) ) ;
	} ,
	
	onExit : function( )
	{
		this.removeAllChildren( ) ;
	}
} ) ;

proj.BackgroundLayer = cc.Layer.extend(
{
	_backgroundImage	: null ,
	
	ctor : function( image )
	{
		this._super( ) ;
		
		this._backgroundImage = new cc.Sprite( image ) ;
		this._backgroundImage.setPosition( cc.director.getWinSize( ).width * 0.5 ,
										   cc.director.getWinSize( ).height * 0.5 ) ;
		this.addChild( this._backgroundImage ) ;
	}
} ) ;

proj.LevelLayer = cc.Layer.extend(
{
	_levelZeroMenuItem	: null ,
	_levelOneMenuItem	: null ,
	_levelTweMenuItem	: null ,
	_levelThreeMenuItem	: null ,
	_levelFourMenuItem	: null ,
	_backMenuItem		: null ,
	
	ctor : function( )
	{
		this._super( ) ;
		
		this._levelZeroMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "level_0_normal.png" ) ,
														 cc.spriteFrameCache.getSpriteFrame( "level_0_selected.png" ) ,
														 this._levelZeroMenuItemClickedCallback ,
														 this ) ;
		
		this._levelOneMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "level_1_normal.png" ) ,
														cc.spriteFrameCache.getSpriteFrame( "level_1_selected.png" ) ,
														this._levelOneMenuItemClickedCallback ,
														this ) ;
		
		this._levelTweMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "level_2_normal.png" ) ,
														cc.spriteFrameCache.getSpriteFrame( "level_2_selected.png" ) ,
														this._levelTwoMenuItemClickedCallback ,
														this ) ;
		
		this._levelThreeMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "level_3_normal.png" ) ,
														  cc.spriteFrameCache.getSpriteFrame( "level_3_selected.png" ) ,
														  this._levelThreeMenuItemClickedCallback ,
														  this ) ;
		
		this._levelFourMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "level_4_normal.png" ) ,
														 cc.spriteFrameCache.getSpriteFrame( "level_4_selected.png" ) ,
														 this._levelFourMenuItemClickedCallback ,
														 this ) ;
		
		this._backMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "back_normal.png" ) ,
													cc.spriteFrameCache.getSpriteFrame( "back_selected.png" ) ,
													this._backMenuItemClickedCallback ,
													this ) ;
		
		this._menu = new cc.Menu( ) ;
		this._menu.addChild( this._levelZeroMenuItem ) ;
		this._menu.addChild( this._levelOneMenuItem ) ;
		this._menu.addChild( this._levelTweMenuItem ) ;
		this._menu.addChild( this._levelThreeMenuItem ) ;
		this._menu.addChild( this._levelFourMenuItem ) ;
		this._menu.addChild( this._backMenuItem ) ;
		this._menu.alignItemsVerticallyWithPadding( 30 ) ;
		this._menu.setPosition( cc.director.getWinSize( ).width * 0.5 , cc.director.getWinSize( ).height * 0.4 ) ;
		
		this.addChild( this._menu ) ;
	} ,
	
	_levelZeroMenuItemClickedCallback : function( )
	{
		cc.log( "0" ) ;
		// cc.director.getRunningScene( ).layerSwitch( 1 ) ;
		cc.director.getRunningScene( ).sceneChange( 0 ) ;
	} ,
	
	_levelOneMenuItemClickedCallback : function( )
	{
		cc.log( "1" ) ;
		cc.director.getRunningScene( ).layerSwitch( 1 ) ;
	} ,
	
	_levelTwoMenuItemClickedCallback : function( )
	{
		cc.log( "2" ) ;
		cc.director.getRunningScene( ).layerSwitch( 1 ) ;
	} ,
	
	_levelThreeMenuItemClickedCallback : function( )
	{
		cc.log( "3" ) ;
		cc.director.getRunningScene( ).layerSwitch( 1 ) ;
	} ,
	
	_levelFourMenuItemClickedCallback : function( )
	{
		cc.log( "4" ) ;
		cc.director.getRunningScene( ).layerSwitch( 1 ) ;
	} ,
	
	_backMenuItemClickedCallback : function( )
	{
		cc.log( "back" ) ;
		cc.director.end( ) ;
	}
} ) ;

proj.MonjiLayer = cc.Layer.extend(
{
	_hiraganaMenuItem	: null ,
	_katakanaMenuItem	: null ,
	_backMenuItem		: null ,
	_menu				: null ,
	
	ctor : function( )
	{
		this._super( ) ;
		
		this._hiraganaMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "hiragana_normal.png" ) ,
														cc.spriteFrameCache.getSpriteFrame( "hiragana_selected.png" ) ,
														this._hiraganaMenuItemClickedCallback ,
														this ) ;
		
		this._katakanaMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "katakana_normal.png" ) ,
														cc.spriteFrameCache.getSpriteFrame( "katakana_selected.png" ) ,
														this._katakanaMenuItemClickedCallback ,
														this ) ;
	
		this._backMenuItem = new cc.MenuItemImage( cc.spriteFrameCache.getSpriteFrame( "back_normal.png" ) ,
													cc.spriteFrameCache.getSpriteFrame( "back_selected.png" ) ,
													this._backMenuItemClickedCallback ,
													this ) ;
		
		this._menu = new cc.Menu( ) ;
		this._menu.addChild( this._hiraganaMenuItem ) ;
		this._menu.addChild( this._katakanaMenuItem ) ;
		this._menu.addChild( this._backMenuItem ) ;
		this._menu.alignItemsVerticallyWithPadding( 30 ) ;
		this._menu.setPosition( cc.director.getWinSize( ).width * 0.5 , cc.director.getWinSize( ).height * 0.4 ) ;
		
		this.addChild( this._menu ) ;
	} ,
	
	_hiraganaMenuItemClickedCallback : function( )
	{
		cc.log( "hiragana" ) ;
		cc.LoaderScene.preload( g_resources , function ( )
		{
			cc.spriteFrameCache.addSpriteFrames( res.MenuScene_plist , res.MenuScene_png ) ;
			cc.director.runScene( new proj.MainScene( ) ) ;
		} , this ) ;
	} ,
	
	_katakanaMenuItemClickedCallback : function( )
	{
		cc.log( "katakana" ) ;
		cc.LoaderScene.preload( g_resources , function ( )
		{
			cc.spriteFrameCache.addSpriteFrames( res.MenuScene_plist , res.MenuScene_png ) ;
			cc.director.runScene( new proj.MainScene( ) ) ;
		} , this ) ;
	} ,
	
	_backMenuItemClickedCallback : function( )
	{
		cc.log( "back" ) ;
		cc.director.getRunningScene( ).layerSwitch( 0 ) ;
	}
} ) ;