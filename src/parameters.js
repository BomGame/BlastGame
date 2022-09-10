var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");

var wd = new Image();
wd.src="assets/Window.png";
var bg = new Image();
bg.src = "assets/background.png";
var candy = new Image();
candy.src = "assets/assets_candy.png";
var buttons = new Image();
buttons.src = "assets/Button.png";
var score = 0;
var deadObjects = 0;
var steps = 51;
var finish = 100;
var globalX=0, globalY=0;
var flagMenu=true;
var unlimit=false;

var array = new Array();

var pole=[];


