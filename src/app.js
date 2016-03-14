"use strict" ;

var proj = gxd.proj || { } ;

var COLLISION_TYPE_WALL = 1 ;
var COLLISION_TYPE_ALPHABET = 2 ;
var COLLISION_TYPE_CATCHER = 3 ;

proj.MainScene = cc.Scene.extend(
{
	_physicsSpace	: null ,
	_mainLayer		: null ,
	_uiLayer		: null ,
	
	_questions		: null ,
	_hiraganaArray	: null ,
	_katakanaArray	: null ,
	
	_candidateWord	: null , // [ ]
	_targetAlphabetIndex	: null ,
	_occurrenceCountDown	: null ,
	
	ctor : function( )
	{
		this._super( ) ;
		
		cc.spriteFrameCache.addSpriteFrames( res.Hiragana_plist , res.Hiragana_png ) ;
		
		if( !proj.config )
			cc.loader.loadJson( "res/configuration.json" , this._onConfigJsonLoaded.bind( this ) ) ;
		
	} ,
	
	_onConfigJsonLoaded : function( error , json )
	{
		if( !error )
		{
			cc.log( json ) ;
			proj.config = json ;
			
			this._questions = [ ] ;
			
			this.initPhysics( ) ;
			
			this._pickQuestions( ) ;
			
			// this.scheduleUpdate( ) ;
			
			cc.loader.loadJson( "res/gojyuon.json" , this._onGojyuonJsonLoaded.bind( this ) ) ;
		}
	} ,
	
	_onGojyuonJsonLoaded : function( error , json )
	{
		if( error )
			throw new Error( "Gojyuon Json File load failed." ) ;
		
		proj.Hiragana = json.Hiragana ;
		this._hiraganaArray = Object.keys( proj.Hiragana ) ;
		proj.Katakana = json.Katakana ;
		this._katakanaArray = Object.keys( proj.Katakana ) ;
		
		this._candidateCountDown = Math.floor( util.randomBetween( 4 , 7 ) ) ;
		this._targetAlphabetIndex = 0 ;
		
		var bgLayer = new proj.BackgroundLayer( res.background1_png ) ;
		this.addChild( bgLayer ) ;
		
		this._mainLayer = new proj.PhysicsLayer( this._physicsSpace ) ;
		this.addChild( this._mainLayer ) ;
		
		this._uiLayer = new proj.UserInterfaceLayer( ) ;
		this._uiLayer.setPosition( 0 , 650 ) ;
		this.addChild( this._uiLayer ) ;
		
		this._uiLayer.setQuestion( this._questions[ 0 ].original ) ;
		this._uiLayer.setAnswer( this._questions[ 0 ].word ) ;
		
		this.scheduleUpdate( ) ;
	} ,
	
	initPhysics : function( )
	{
		var winSize = cc.director.getWinSize( ) ;
		
		// 建立一個物理空間
		this._physicsSpace = new cp.Space( ) ;
		
		// 設定物理空間重力，cp.v為二維向量
		this._physicsSpace.gravity = cp.v( 0 , -100 ) ;
		this._physicsSpace.sleepTimeThreshold = 0.5 ;     //休眠臨界時間
        this._physicsSpace.collisionSlop = 0.8 ;
		
		// 建立四條線段圖形來表示牆壁
		var wall = [ new cp.SegmentShape( this._physicsSpace.staticBody , cp.v( 0 , 0 ) , cp.v( winSize.width , 0 ) , 0 ) ,								// bottom.
					 new cp.SegmentShape( this._physicsSpace.staticBody , cp.v( winSize.width , 0 ) , cp.v( winSize.width , winSize.height ) , 0 ) ,	// right.
					 new cp.SegmentShape( this._physicsSpace.staticBody , cp.v( winSize.width , winSize.height ) , cp.v( 0 , winSize.height ) , 0 ) ,	// top.
					 new cp.SegmentShape( this._physicsSpace.staticBody , cp.v( 0 , winSize.height ) , cp.v( 0 , 0 ) , 0 ) ] ;				// left.
		
		// 將表示牆壁的四條線段加入物理空間內
		for( var i = 0 ; i < wall.length ; ++ i )
		{
			var shape = wall[ i ] ;
			shape.setElasticity( 1 ) ;	// 設定彈性係數
			shape.setFriction( 0.3 );		// 設定摩擦係數
			shape.setCollisionType( COLLISION_TYPE_WALL ) ;
			this._physicsSpace.addStaticShape( shape ) ;	// 將靜態物體與形狀關聯起來
		}
	} ,
	
	_pickQuestions : function( )
	{
		var questionIndices = [ ] ;
		
		for( var i = 0 ; i < proj.questions.length ; i ++ )
		{
			questionIndices.push( i ) ;
		}
		
		questionIndices = util.shuffle( questionIndices ) ;
		
		for( var i = 0 ; i < proj.config.QuestionsAmount.Level_0 ; ++ i )
		{
			this._questions.push( proj.questions[ questionIndices[ i ] ] ) ;
			cc.log( this._questions[ i ] ) ;
		}
	} ,
	
	_pickCandidateAlphabet : function( alphabet )
	{
		// var alphabetIndices = [ ] ;
		
		// for( var i = 0 ; i < proj.config.MaxAmountOfAlphabetOnView ; ++ i )
		// {
			
		// }
		
		
		
		// this._candidateAlphabet.
	} ,
	
	getCurrentQuestion : function( )
	{
		if( this._questions.length > 0 )
			return this._questions[ 0 ].original ;
	} ,
	
	getCurrentAnswer : function( )
	{
		return this._questions[ 0 ].word ;
	} ,
	
	getCurrentChineseTip : function( )
	{
		return this._questions[ 0 ].chinese ;
	} ,
	
	getAlphabet : function( )
	{
		-- this._candidateCountDown ;
		
		cc.log( this._candidateCountDown ) ;
		
		if( this._candidateCountDown === 0 )
		{
			this._candidateCountDown = Math.floor( util.randomBetween( 4 , 7 ) ) ;
			return this.getCandidateMonji( ) ;
		}
		else
			return this.getRandomMonji( ) ;
	} ,
	
	getCandidateMonji : function( )
	{
		cc.log( "getCandidateMonji" ) ;
		cc.log( this._questions[ 0 ] ) ;
		cc.log( this._targetAlphabetIndex ) ;
		cc.log( this._questions[ 0 ].word[ this._targetAlphabetIndex ] ) ;
		return proj.Hiragana[ this._questions[ 0 ].word[ this._targetAlphabetIndex ] ] ;
	} ,
	
	getRandomMonji : function( )
	{
		var index = Math.floor( Math.random( ) * 100 ) % this._hiraganaArray.length ;
		
		return proj.Hiragana[ this._hiraganaArray[ index ] ] ;
	} ,
	
	alphabetMatch : function( )
	{
		++ this._targetAlphabetIndex ;
		
		if( this._targetAlphabetIndex === this._questions[ 0 ].length )
			this._questions.shift( ) ;
	} ,
	
	update : function( dt )
	{
		// 表示自上一次循環過去的時間，它影響到物體本次循環將要移動的距離和旋轉的角度。
		// 我們不建議使用update 的dt參數作為timeStep，因為dt時間是上下浮動的，所以使用dt作為timeStep時間，
		// 物體的運動速度就不穩定。我們建議使用固定的timeStep時間。
		this._physicsSpace.step( 0.03 ) ;	// 更新物理引擎世界。
	} ,
	
	onEnter : function( )
	{
		this._super( ) ;
		
		// this.scheduleUpdate( ) ;
	} ,
	
	onEnterTransitionDidFinish : function( )
	{
		this._super( ) ;
	} ,
	
	onExitTransitionDidStart : function( )
	{
		this._super( ) ;
	} ,
	
	onExit : function( )
	{
		this._super( ) ;
	}
} ) ;