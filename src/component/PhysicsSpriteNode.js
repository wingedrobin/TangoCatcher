"use strict" ;

var proj = gxd.proj || { } ;

proj.PhysicsSpriteNode = cc.PhysicsSprite.extend(
{
	_physicsSpace	: null ,
	_body			: null ,
	_shape			: null ,
	
	ctor : function( sprite , space )
	{
		if( !( sprite instanceof cc.SpriteFrame ) )
			throw new Error( "Parameter sprite expect type of cc.SpriteFrame." ) ;
		
		this._super( sprite ) ;
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
	
	initBody : function( mass , size )
	{
		this._body = new cp.Body( mass , cp.momentForBox( mass , size.width , size.height ) ) ;
		
		this.setBody( this._body ) ;
		
		// if( this._physicsSpace )
			// this._physicsSpace.addBody( this._body ) ;
	} ,
	
	getBody : function( )
	{
		return this._body ;
	} ,
	
	/**
	 * @override
	 */
	// initShape : function( size , elasticity , friction , collisionType ) { } ,
	
	getShape : function( )
	{
		return this._shape ;
	} ,
	
	setCollisionType : function( type )
	{
		this._shape.setCollisionType( type ) ;
	} ,
	
	setPosition : function( x , y )
	{
		this._super( x , y ) ;
		
		// x = cc.p
		if( !y )
		{
			this._body.setPos( x ) ;
		}
		// x , y = number ;
		else
		{
			this._body.setPos( cc.p( x , y ) ) ;
		}
	} ,
	
	onEnter : function( )
	{
		if( !this._body )
			throw new Error( "Body has not been initialized yet." ) ;
		
		if( !this._body )
			throw new Error( "Shape has not been initialized yet." ) ;
		
		this._physicsSpace.addBody( this._body ) ;
		this._physicsSpace.addShape( this._shape ) ;
	} ,
	
	onExit : function( )
	{
	cc.log( 11 ) ;
		this._physicsSpace.removeBody( this._body ) ;
		this._physicsSpace.removeShape( this._shape ) ;
	cc.log( 12 ) ;
	}
} ) ;

proj.BoxPhysicsSprite = proj.PhysicsSpriteNode.extend(
{
	ctor : function( sprite , space )
	{
		this._super( sprite , space ) ;
		
		var size = this.getContentSize( ) ;
		
		if( space )
		{
			this.addPhysicsSpace( space ) ;
			this.initBody( 1 , size ) ;
			this.initShape( size , 0.5 , 0.5 ) ;
		}
	} ,
	
	reset : function( )
	{
		this._body.setAngle( 0 ) ;
		this._body.setVel( cp.vzero ) ;
		this._body.resetForces( ) ;
		this._body.setAngVel( 0 ) ;
	} ,
	
	free : function( )
	{
		this._super( ) ;
	} ,
	
	initShape : function( size , elasticity , friction , collisionType )
	{
		if( !this._body )
			throw new Error( "Set physics body before shape." ) ;
		
		this._shape = new cp.BoxShape( this._body , size.width , size.height ) ;
		this._shape.setElasticity( elasticity ) ;
		this._shape.setFriction( friction ) ;
		// this._shape.setCollisionType( collisionType ) ;
		
		// if( this._physicsSpace )
			// this._physicsSpace.addShape( this._shape ) ;
	}
} ) ;