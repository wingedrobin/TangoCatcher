"use strict" ;

var assert	= chai.assert ;
var comp	= gxd.comp || { } ;
var proj	= gxd.proj || { } ;

proj.PhysicsLayer = cc.Layer.extend(
{
	_physicsSpace				: null ,
	_fallenPoints				: null ,
	_AmountOfAlphabetsOnView	: null ,
	_alphabetSprites			: null ,
	_unusedAlphabetSprites		: null ,
	
	_catcher					: null ,
	_keyboardEventReceiver		: null ,
	
	ctor : function( space )
	{
		this._super( ) ;
		
		this.reset( ) ;
		this._initFallenPoints( ) ;
		
		if( space )
			this.addPhysicsSpace( space ) ;
		
		this._keyboardEventReceiver = new comp.KeyboardEventReceiver( this ) ;
	} ,
	
	reset : function( )
	{
		this.free( ) ;
		
		this._AmountOfAlphabetsOnView = 0 ;
		
		this._alphabetSprites = [ ] ;
		// this._alphabetSprites.length = proj.config.MaxAmountOfAlphabetOnView ;
		
		this._unusedAlphabetSprites = [ ] ;
	} ,
	
	free : function( )
	{
		if( this._alphabetSprites )
		{
			for( var i = 0 ; i < this._alphabetSprites.length ; ++ i )
			{
				this._alphabetSprites[ i ].release( ) ;
				this._alphabetSprites[ i ] = null ;
			}
			
			this._alphabetSprites.length	= 0 ;
			this._alphabetSprites			= null ;
		}
		
		if( this._unusedAlphabetSprites )
		{
			for( var i = 0 ; i < this._unusedAlphabetSprites.length ; ++ i )
			{
				this._unusedAlphabetSprites[ i ].release( ) ;
				this._unusedAlphabetSprites[ i ] = null ;
			}
		}
		
		if( this._fallenPoints )
		{
			this._fallenPoints.length	= 0 ;
			this._fallenPoints			= null ;
		}
		
		this._physicsSpace = null ;
	} ,
	
	_initFallenPoints : function( )
	{
		var winSize			= cc.director.getWinSize( ) ;
		var alphabetAmount	= proj.config.MaxAmountOfAlphabetOnView ;
		
		assert.isAbove( alphabetAmount , 0 ) ;
		
		var widthOffset = winSize.width / alphabetAmount ;
		var center = widthOffset * 0.5 ;
		
		this._fallenPoints = [ ] ;
		this._fallenPoints.length = alphabetAmount ;
		
		for( var i = 0 ; i < alphabetAmount ; ++ i )
			this._fallenPoints[ i ] = cc.p( center + ( widthOffset * i ) , winSize.height - 100 ) ;
	} ,
	
	addPhysicsSpace : function( space )
	{
		if( !( space instanceof cp.Space ) )
			throw new Error( "Parameter space expect typeof cp.Space." ) ;
		
		this._physicsSpace = space ;
	} ,
	//////////////////////////////////////////////////////////////////////////////
	_debugNode : null ,
	setupDebugNode : function( )
	{
		this._debugNode = new cc.PhysicsDebugNode( this._physicsSpace ) ;
        this._debugNode.visible = true ;
        this.addChild( this._debugNode ) ;
	} ,
	//////////////////////////////////////////////////////////////////////////////
	/*
	_createAlphabetSprite : function( )
	{
		var index = Math.floor( Math.random( ) * 100 ) % 6 ;
		
		// var pos = cc.p( this._fallenPoints[ index ].x , this._fallenPoints[ index ].y ) ;
		var pos = cc.p( this._fallenPoints[ index ] ) ;
		// var pos = this._fallenPoints[ index ] ;
		
		var sprite = new cc.PhysicsSprite( cc.spriteFrameCache.getSpriteFrame( "i.png" ) ) ;
		
		// cp.Body( 物體質量( >0 , positive ) , 慣性值/力矩? )
		// cp.momentForBox( 物體質量 , 物寬 , 物高 )
		var body = new cp.Body( 1 , cp.momentForBox( 1 , 72 , 72 ) ) ;
		// body.setPos( pos ) ;	// 設置物體重心
		this._physicsSpace.addBody( body ) ;	// 把物體加到物理空間中
		
		var shape = new cp.BoxShape( body , 72 , 72 ) ;
		shape.setElasticity( 0.3 ) ;
		shape.setFriction( 0.5 ) ;
		shape.setCollisionType( COLLISION_TYPE_ALPHABET ) ;
		this._physicsSpace.addShape( shape ) ;
		
		sprite.setBody( body ) ;	// 設置 sprite 所關聯的 body
		sprite.setPosition( pos ) ;
		this.addChild( sprite ) ;
		this._alphabetSprites[ this._AmountOfAlphabetsOnView ] = sprite ;
		++ this._AmountOfAlphabetsOnView ;
		
		// var rand = util.randomBetween( 0.5 , 1.5 ) ;
		// this.scheduleOnce( this._createAlphabetSprite.bind( this ) , rand ) ;
	} ,
	*/
	
	_createCatcherSprite : function( )
	{
		this._catcher = new proj.BoxPhysicsSprite( cc.spriteFrameCache.getSpriteFrame( "bucket.png" ) , this._physicsSpace ) ;
		this._catcher.setPosition( cc.director.getWinSize( ).width * 0.5 ,
								   this._catcher.getContentSize( ).height * 0.5 ) ;
		this._catcher.setCollisionType( COLLISION_TYPE_CATCHER ) ;
		this.addChild( this._catcher ) ;
	} ,
	
	_createAlphabetSprite : function( )
	{
		var index	= Math.floor( Math.random( ) * 100 ) % 6 ;
		var pos		= cc.p( this._fallenPoints[ index ] ) ;
		
		var monji	= this.getParent( ).getAlphabet( ) ;
		cc.log( "monji=" + monji ) ;
		
		var spriteFrame	= cc.spriteFrameCache.getSpriteFrame( monji + ".png" ) ;
		var sprite = null ;
		
		if( this._unusedAlphabetSprites.length > 0 )
		{
			sprite = this._unusedAlphabetSprites.shift( ) ;
			sprite.reset( ) ;
			sprite.setSpriteFrame( spriteFrame ) ;
		}
		else
		{
			sprite = new proj.BoxPhysicsSprite( spriteFrame ,
												this._physicsSpace ) ;
			sprite.setCollisionType( COLLISION_TYPE_ALPHABET ) ;
			sprite.retain( ) ;
		}
		
		sprite.setName( monji ) ;
		sprite.setPosition( pos ) ;
		this._alphabetSprites.push( sprite ) ;
		this.addChild( sprite ) ;
	} ,
	
	onTouchBegan: function (touch, event) {  
		cc.log("onTouchBegan");  
		var target = event.getCurrentTarget();  
		// var location = touch.getLocation();  
		target._createAlphabetSprite();
		return false;  
	},
	
	update : function( dt )
	{
		// for( var i = 0 ; i < this._alphabetSprites.length ; ++ i )
		// {
			// if( this._alphabetSprites[ i ] )
				// cc.log( this._alphabetSprites[ i ].getBody( ).getPos( ) ) ;
		// }
	} ,
	
	_onKeyPressed : function( keyCode, event )
	{
		if( keyCode === cc.KEY.left )
		{
			var currentPos = this._catcher.getPosition( ) ;
			var newPos		= cc.p( currentPos.x - 10 , currentPos.y ) ;
			this._catcher.setPosition( newPos ) ;
		}
		else if( keyCode === cc.KEY.right )
		{
			var currentPos = this._catcher.getPosition( ) ;
			var newPos		= cc.p( currentPos.x + 10 , currentPos.y ) ;
			this._catcher.setPosition( newPos ) ;
		}
	} ,
	
	_removeAlphabetSprite : function( sprite )
	{
	cc.log( "_removeAlphabetSprite" ) ;
		// sprite.removeFromParent( ) ;
		this.removeChild( sprite , true ) ;
	} ,
	
	_onCollisionBegin : function( arbiter , space )
	{
		return true ;
	} ,
	
	_onCollisionPreSolve : function( arbiter , space )
	{
		// cc.log( "_onCollisionPreSolve" ) ;
		return true ;
	} ,
	
	_onCollisionPostSolve : function( arbiter , space )
	{
		cc.log( "_onCollisionPostSolve" ) ;
		
		var shapes = arbiter.getShapes( ) ;
		
		var shapeA = shapes[ 0 ] ;
		var shapeB = shapes[ 1 ] ;
		
		var bodyA = shapeA.getBody( ) ;
		var bodyB = shapeB.getBody( ) ;
		
		var collTypeA = shapeA.collision_type ;
        var collTypeB = shapeB.collision_type ;
		
		var equal = null ;
		
		for( var i = 0 ; i < this._alphabetSprites.length ; i ++ )
		{
			if( !this._alphabetSprites[ i ] )
			{
				// cc.log( "_alphabetSprites[ i ]=undefined") ;
				continue ;
			}
			
			if( collTypeB === COLLISION_TYPE_ALPHABET )
				equal = this._alphabetSprites[ i ].getBody( ) == bodyB ;
			else if( collTypeB === COLLISION_TYPE_CATCHER )
				equal = this._alphabetSprites[ i ].getBody( ) == bodyA ;
			
			if( equal )
			{
				cc.log( this._alphabetSprites[ i ].getName( ) ) ;
				cc.log( this.getParent( ).getCandidateMonji( ) ) ;
				if( this._alphabetSprites[ i ].getName( ) === this.getParent( ).getCandidateMonji( ) )
				{
					cc.log( "alphabet match" ) ;
					this.getParent( ).alphabetMatch( ) ;
				}
				else
					cc.log( "alphabet not match" ) ;
				
				// this._physicsSpace.addPostStepCallback( this._removeAlphabetSprite.bind( this , this._alphabetSprites[ i ] ) ) ;
				this._physicsSpace.addPostStepCallback( this.removeChild.bind( this , this._alphabetSprites[ i ] ) ) ;
				this._unusedAlphabetSprites.push( this._alphabetSprites[ i ] ) ;
				this._alphabetSprites.splice( i , 1 ) ;
			}
		}
	} ,
	
	_onCollisionSeparate : function( arbiter , space )
	{
		// cc.log( "_onCollisionSeparate" ) ;
	} ,
	
	onEnter : function( )
	{
		this._super( ) ;
		
		this._keyboardEventReceiver.attach( ) ;
		
		this._createCatcherSprite( ) ;
		
		// var block = new proj.PhysicsSpriteNode( cc.spriteFrameCache.getSpriteFrame( "o.png" ) , this._physicsSpace , cc.p( 300 , 300 ) ) ;
		// block.setPosition( 300 , 300 ) ;
		// this.addChild( block ) ;
		
		cc.eventManager.addListener({  
			event: cc.EventListener.TOUCH_ONE_BY_ONE,  
			onTouchBegan: this.onTouchBegan  
		}, this);
		
		this._physicsSpace.addCollisionHandler( COLLISION_TYPE_WALL ,
												COLLISION_TYPE_ALPHABET ,
												this._onCollisionBegin.bind( this ) ,
												this._onCollisionPreSolve.bind( this ) ,
												this._onCollisionPostSolve.bind( this ) ,
												this._onCollisionSeparate.bind( this ) ) ;
		
		this._physicsSpace.addCollisionHandler( COLLISION_TYPE_ALPHABET ,
												COLLISION_TYPE_CATCHER ,
												this._onCollisionBegin.bind( this ) ,
												this._onCollisionPreSolve.bind( this ) ,
												this._onCollisionPostSolve.bind( this ) ,
												this._onCollisionSeparate.bind( this ) ) ;
		
		// this.scheduleUpdate( ) ;
	} ,
	
	onEnterTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		this.schedule( this._createAlphabetSprite.bind( this ) , 1.5 , cc.REPEAT_FOREVER , 0.5 ) ;
		// this.scheduleOnce( this._createAlphabetSprite.bind( this ) , 3 ) ;
		// this._createAlphabetSprite( ) ;
		this.setupDebugNode( ) ;
		// var rand = Math.floor( Math.rand( ) * 10 ) % 6 ;
		
	} ,
	
	onExitTransitionDidStart : function( )
	{
		this._super( ) ;
		
		cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
	} ,
	
	onExit : function( )
	{
		this._super( ) ;
		this._keyboardEventReceiver.detach( ) ;
	}
} ) ;