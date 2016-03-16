"use strict" ;

var def = gxd.def || { } ;

def.APPLICATION_STATUS = new Enum(
{
	UNKNOW		: 0x00 ,
	START		: 0x01 ,
	RUNNING		: 0x02 ,	// running 一定 show, show 不一定 running
	RESTART		: 0x03 ,
	SHOW		: 0x04 ,
	HIDE		: 0x05 ,
	PAUSE		: 0x06 ,	// hide 一定 pause, pause 不一定 hide
	STOP		: 0x07 ,
	TERMINAL	: 0x08 ,
	UNDEFINED	: 0xFF
} ) ;

def.DIRECTION = new Enum(
{
	UNKNOW	: 0x00 ,
	UP		: 0x01 ,
	DOWN	: 0x02 ,
	LEFT	: 0x03 ,
	RIGHT	: 0x04
} ) ;

def.TOUCH_ACTION = new Enum(
{
	UNKNOW	: 0x00 ,
	UP		: 0x01 ,
	DOWN	: 0x02 ,
	MOVE	: 0x03 ,
	CANCEL	: 0x04
} ) ;

def.TOUCH_POSITION = new Enum(
{
	UNDEFINED	: 0x00 ,
	INSIDE		: 0x01 ,
	MOVE_IN		: 0x02 ,
	MOVE_OUT	: 0x03 ,
	OUTSIDE		: 0x04
} ) ;