"use strict"

var assert	= chai.assert ;
var ext		= gxd.ext || { } ;

ext.Class = cc.Class.extend(
{
	
} ) ;

/**
 * @class
 * @extends cc.Node
 */
ext.Node = cc.Node.extend(
/** @lends gxd.ext.Node */
{
	_className			: "gxd.ext.Node" ,
	_name				: "" ,
	
	_breadcrumbsFlag	: false ,
	_boundaryMarkerFlag	: false ,

	ctor : function( )
	{
		this._super( ) ;
	} ,
	
	/**
	 * @function
	 * @param		{boolean}	enable
	 */
	setBreadcrumbsLog : function( enable )
	{
		this._breadcrumbsFlag = enable ;
	} ,
	
	/**
	 * @function
	 * @return		{boolean}
	 */
	isBreadcrumbsLog : function( )
	{
		return this._breadcrumbsFlag ;
	} ,
	
	/**
	 * @function
	 * @param		{boolean}	enable
	 */
	setMarkBoundary : function( enable )
	{
		this._boundaryMarkerFlag = enable ;
	} ,
	
	/**
	 * @function
	 * @return		{boolean}
	 */
	isMarkBoundary : function( )
	{
		return this._boundaryMarkerFlag ;
	} ,
	
	onEnter : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnter( )" ) ;
	} ,
	
	onEnterTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnterTransitionDidFinish( )" ) ;
		
		if( this._boundaryMarkerFlag )
		{
			var drawNode = new cc.DrawNode( ) ;
			drawNode.drawRect( cc.p( 0 , 0 ) ,
							   cc.p( this.width , this.height ) ,
							   null ,
							   2 ,
							   cc.color( 255 , 0 , 0 ) ) ;
			
			this.addChild( drawNode ) ;
		}
	} ,
	
	onExitTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExitTransitionDidFinish( )" ) ;
	} ,
	
	onExit : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExit( )" ) ;
	}
} ) ;

/**
 * @class
 * @extends cc.Scene
 */
ext.Scene = cc.Scene.extend(
/** @lends gxd.ext.Scene */
{
	_className			: "gxd.ext.Scene" ,
	_name				: "" ,
	
	_breadcrumbsFlag	: false ,
	
	ctor : function( )
	{
		this._super( ) ;
	} ,
	
	/**
	 * @function
	 * @param		{boolean}	enable
	 */
	setBreadcrumbsLog : function( enable )
	{
		this._breadcrumbsFlag = enable ;
	} ,
	
	/**
	 * @function
	 * @return		{boolean}
	 */
	isBreadcrumbsLog : function( )
	{
		return this._breadcrumbsFlag ;
	} ,
	
	onEnter : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnter( )" ) ;
	} ,
	
	onEnterTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnterTransitionDidFinish( )" ) ;
		
		if( this._boundaryMarkerFlag )
		{
			var drawNode = new cc.DrawNode( ) ;
			drawNode.drawRect( cc.p( 0 , 0 ) ,
							   cc.p( this.width , this.height ) ,
							   null ,
							   2 ,
							   cc.color( 255 , 0 , 0 ) ) ;
			
			this.addChild( drawNode ) ;
		}
	} ,
	
	onExitTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExitTransitionDidFinish( )" ) ;
	} ,
	
	onExit : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExit( )" ) ;
	}
} ) ;

/**
 * @class
 * @extends cc.Layer
 */
ext.Layer = cc.Layer.extend(
/** @lends gxd.ext.Layer */
{
	_className			: "gxd.ext.Layer" ,
	_name				: "" ,
	
	_breadcrumbsFlag	: false ,
	_boundaryMarkerFlag	: false ,

	ctor : function( )
	{
		this._super( ) ;
	} ,
	
	/**
	 * @function
	 * @param		{boolean}	enable
	 */
	setBreadcrumbsLog : function( enable )
	{
		this._breadcrumbsFlag = enable ;
	} ,
	
	/**
	 * @function
	 * @return		{boolean}
	 */
	isBreadcrumbsLog : function( )
	{
		return this._breadcrumbsFlag ;
	} ,
	
	/**
	 * @function
	 * @param		{boolean}	enable
	 */
	setMarkBoundary : function( enable )
	{
		this._boundaryMarkerFlag = enable ;
	} ,
	
	/**
	 * @function
	 * @return		{boolean}
	 */
	isMarkBoundary : function( )
	{
		return this._boundaryMarkerFlag ;
	} ,
	
	onEnter : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnter( )" ) ;
	} ,
	
	onEnterTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnterTransitionDidFinish( )" ) ;
		
		if( this._boundaryMarkerFlag )
		{
			var drawNode = new cc.DrawNode( ) ;
			drawNode.drawRect( cc.p( 0 , 0 ) ,
							   cc.p( this.width , this.height ) ,
							   null ,
							   2 ,
							   cc.color( 255 , 0 , 0 ) ) ;
			
			this.addChild( drawNode ) ;
		}
	} ,
	
	onExitTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExitTransitionDidFinish( )" ) ;
	} ,
	
	onExit : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExit( )" ) ;
	}
} ) ;

/**
 * @class
 * @extends cc.Sprite
 */
ext.Sprite = cc.Sprite.extend(
/** @lends gxd.ext.Sprite */
{
	_className			: "gxd.ext.Sprite" ,
	_name				: "" ,
	
	_breadcrumbsFlag	: false ,
	_boundaryMarkerFlag	: false ,

	ctor : function( fileName, rect, rotated )
	{
		this._super( fileName, rect, rotated ) ;
	} ,
	
	/**
	 * @function
	 * @param		{boolean}	enable
	 */
	setBreadcrumbsLog : function( enable )
	{
		this._breadcrumbsFlag = enable ;
	} ,
	
	/**
	 * @function
	 * @return		{boolean}
	 */
	isBreadcrumbsLog : function( )
	{
		return this._breadcrumbsFlag ;
	} ,
	
	/**
	 * @function
	 * @param		{boolean}	enable
	 */
	setMarkBoundary : function( enable )
	{
		this._boundaryMarkerFlag = enable ;
	} ,
	
	/**
	 * @function
	 * @return		{boolean}
	 */
	isMarkBoundary : function( )
	{
		return this._boundaryMarkerFlag ;
	} ,
	
	onEnter : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnter( )" ) ;
	} ,
	
	onEnterTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onEnterTransitionDidFinish( )" ) ;
		
		if( this._boundaryMarkerFlag )
		{
			var drawNode = new cc.DrawNode( ) ;
			drawNode.drawRect( cc.p( 0 , 0 ) ,
							   cc.p( this.width , this.height ) ,
							   null ,
							   2 ,
							   cc.color( 255 , 0 , 0 ) ) ;
			
			this.addChild( drawNode ) ;
		}
	} ,
	
	onExitTransitionDidFinish : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExitTransitionDidFinish( )" ) ;
	} ,
	
	onExit : function( )
	{
		this._super( ) ;
		
		// if( this._breadcrumbsFlag )
			// cc.log( this._className + ".onExit( )" ) ;
	}
} ) ;