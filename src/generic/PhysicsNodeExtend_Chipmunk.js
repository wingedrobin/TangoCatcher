"use strict" ;

var assert	= chai.assert ;
var comp	= gxd.comp || { } ;
var proj	= gxd.proj || { } ;

comp.ChipmunkPhysicsNode = cc.Node.extend(
{
	_initialized	: false ,
	_physicsSpace	: null ,
	_body			: null ,
	_shape			: null ,
	
	ctor : function( space )
	{
		this._super( ) ;
		
		if( space )
			this.addPhysicsSpace( space ) ;
	} ,
	
	reset : function( )
	{
	} ,
	
	free : function( )
	{
		if( this._body )
		{
			this._physicsSpace.removeBody( this._body ) ;
			this._body = null ;
		}
		
		if( this._shape )
		{
			this._physicsSpace.removeShape( this._shape ) ;
			this._shape = null ;
		}
		
		if( this._physicsSpace )
			this._physicsSpace = null ;
		
		this.removeAllChildren( ) ;
	} ,
	
	addPhysicsSpace : function( space )
	{
		if( !( space instanceof cp.Space ) )
			throw new Error( "Parameter space expect type of cp.Space." ) ;
		
		this._physicsSpace = space ;
	} ,
	
	/**
	 *
	 * @function
	 * @param	{number|cc.p}	x	Coordinate of x direction or a cc.p object.
	 * @param	{number}		y	Coordinate of y direction.
	 */
	setPosition : function( x , y )
	{
		this._super( x , y ) ;
		
		// if( !this._initialized )
		// {
			// x = cc.p
			if( !y )
			{
				if( x != this._body.getPos( ) )
				this._body.setPos( x ) ;
			}
			// x , y = number ;
			else
			{
				if( x != this._body.getPos( ).x || y != this._body.getPos( ).y )
				this._body.setPos( cc.p( x , y ) ) ;
			}
			
			// this._initialized = true ;
		// }
	}
} ) ;

comp.ChipmunkPhysicsScene = cc.Scene.extend(
{
} ) ;

comp.ChipmunkPhysicsLayer = cc.Layer.extend(
{
} ) ;

comp.PhysicsSpriteNode = comp.ChipmunkPhysicsNode.extend(
{
	_sprite	: null ,
	
	ctor : function( spriteFrame , space , position )
	{
		this._super( space ) ;
		this.setAnchorPoint( 0.5 , 0.5 ) ;
		this.initWithSpriteFrame( spriteFrame , position ) ;
	} ,
	
	reset : function( )
	{
		
	} ,
	
	free : function( )
	{
	} ,
	
	// undone
	initWithSprite : function( sprite )
	{
		if( !( sprite instanceof cc.Sprite ) )
			throw new Error( "Parameter spriteFrame expect type of cc.Sprite." ) ;
		
		this._sprite = sprite ;
	} ,
	
	// undone
	initWithFileName : function( fileName )
	{
		if( typeof fileName !== "string" )
			throw new Error( "Parameter fileName expect type of string." ) ;
		
		var spriteFrame = cc.spriteFrameCache.getSpriteFrame( fileName ) ;
		
		if( !spriteFrame )
			this._sprite = new cc.Sprite( fileName ) ;
		else
			this._sprite = new cc.Sprite( spriteFrame ) ;
	} ,
	
	initWithSpriteFrame : function( spriteFrame , position )
	{
		if( !( spriteFrame instanceof cc.SpriteFrame ) )
			throw new Error( "Parameter spriteFrame expect type of cc.SpriteFrame." ) ;
		
		this._sprite = new cc.Sprite( spriteFrame ) ;
		
		var spriteSize = this._sprite.getContentSize( ) ;
		
		this._body = new cp.Body( 1 , cp.momentForBox( 1 , spriteSize.width , spriteSize.height ) ) ;
		
		// this._body.setPos( position ) ;
		
		this._physicsSpace.addBody( this._body ) ;
		// this._sprite.setBody( this._body ) ;
		
		this._shape = new cp.BoxShape( this._body , spriteSize.width , spriteSize.height ) ;
		this._shape.setElasticity( 0.5 ) ;
		this._shape.setFriction( 0.5 ) ;
		this._shape.setCollisionType( COLLISION_TYPE_ALPHABET ) ;
		
		this._physicsSpace.addShape( this._shape ) ;
		
		this._sprite.setPosition( spriteSize.width * 0.5 , spriteSize.height * 0.5 ) ;
	
		this.setContentSize( spriteSize ) ;
		this.addChild( this._sprite ) ;
		
		// this.setPosition( position ) ;
	} ,
	
	_initBody : function( size )
	{
		assert.isNotNull( this._physicsSpace ) ;
		
		this._body = new cp.Body( 1 , cp.momentForBox( 1 , size.width , size.height ) ) ;
		this._body.setPos( ) ;
		
		this._physicsSpace.addBody( this._body ) ;
	} ,
	
	_initShape : function( size )
	{
		assert.isNotNull( this._physicsSpace ) ;
		assert.isNotNull( this._body ) ;
		
		this._shape = new cp.BoxShape( this._body , size.width , size.height ) ;
		this._shape.setElasticity( ) ;
		this._shape.setFriction( ) ;
		
		this._physicsSpace.addShape( this._shape ) ;
	} ,
	
	update : function( dt )
	{
		// var pos = this._body.getPos( ) ;
		// cc.log( pos ) ;
		// this.setPosition( pos ) ;
		
		if( !this._body.isSleeping( ) )
			this.setPosition( this._body.getPos( ) ) ;
		// else
			// this.setPosition( 300 , 700 ) ;
	} ,
	
	onEnter : function( )
	{
		this._super( ) ;
		this.scheduleUpdate( ) ;
	} ,
	
	onExit : function( )
	{
		this._super( ) ;
		this.unscheduleUpdate( ) ;
	}
} ) ;