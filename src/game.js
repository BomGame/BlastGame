var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");

cnv.addEventListener('click', handlerClickCanvas);

var wd = new Image();
wd.src="assets/Window.png";
var bg = new Image();
bg.src = "assets/background.png";
var candy = new Image();
candy.src = "assets/assets_candy.png";
var score = 0;
var deadObjects = 0;

var array = new Array();

let pole=[];

class Candy 
{
  constructor(picX, picY, color, x, y) 
  {
    this.picX = picX;
    this.picY = picY;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dis = 0;
  }
  picCords()
  {
    console.log(this.picX, this.picY);
  }
  cords(x, y)
  {
    this.x=x;
    this.y=y;
  }
  X()
  {
    return this.x;
  }
  Y()
  {
    return this.y;
  }
  getDisplacement()
  {
    return this.dis;
  }
  setDisplacement(x)
  {
    this.dis+=x;
  }
  Color()
  {
    return this.color;
  }
  draw()
  {
    ctx.drawImage(candy, this.picX, this.picY, 100, 100, 30+30*this.x, 30+30*this.y+this.dis, 37, 37);
  }
  delit(i, j, c)
  {
    delet(i, j, c);
  }
}

class Bomb extends Candy
{
  delit(i, j, c)
  {
    pole[i][j]=0;
    
    if(i-1>=0 && j-1>0)
    {
      pole[i-1][j]=0;
      pole[i-1][j-1]=0;
      pole[i][j-1]=0;
    }
    
    if(i-1>0 && j+1<pole[i].length)
    {
      pole[i][j+1]=0;
      pole[i-1][j+1]=0;
    }
      
    if(i+1<pole.length && j-1>0)
    {
      pole[i+1][j-1]=0;
      pole[i+1][j]=0;
    }
      
    if(i+1<pole.length && j+1<pole[i].length)
    {
      pole[i+1][j+1]=0;
    }
  }
}

//заполнение поля
function randomPole() 
{
  for (var i=0; i<14; i++)
  {
    pole[i]=new Array();
    for (var j=0; j<13; j++)
    {
      pole[i][j]=parseInt(Math.random()*10%5+1, 10);
    }
  }
}
//-----------------

//тестовая анимация
function anim() 
{
  for(var l in array)
  {
    var temp=0;
    if(array[l].Y() < 13)
    {
      temp = array[l].Y();
      temp++;
      //console.log(temp);
      if(pole[temp][array[l].X()] == 0)
      {
        //console.log('test');
        array[l].setDisplacement(5);
        if(array[l].getDisplacement()>30)
        {
          array[l].setDisplacement(-1*array[l].getDisplacement());
          array[l].cords(array[l].X(), temp);
          pole[temp][array[l].X()]=pole[temp-1][array[l].X()];
          pole[temp-1][array[l].X()]=0;
        }
      }
    }
  }
  for(var i=0; i<13; i++)
  {
    if(pole[0][i]==0)
    {
      pole[0][i]=parseInt(Math.random()*10%5+1, 10);
      array.push(new Candy(100*(pole[0][i]-1),0, pole[0][i], i, 0));
    }
  }  
}
//-----------------

//удаление объектов
function deleteObject(y, x)
{
  for(var i in array)
  {
    if(x == array[i].X() && y == array[i].Y())
    {
      array.splice(i,1);
      deadObjects++;
      break;
    }
  }
}

function delet(i, j, c) 
{
  //console.log(pole);
  if(i-1>=0 && pole[i-1][j] == c)
  {
    pole[i][j]=0;
    pole[i-1][j]=0;
    delet(i-1, j, c);
    
  }
  if(i+1<=13 && pole[i+1][j] == c)
  {
    pole[i][j]=0;
    pole[i+1][j]=0;
    delet(i+1, j, c);
  }
  if(j-1>=0 && pole[i][j-1] == c)
  {
    pole[i][j]=0;
    pole[i][j-1]=0;
    delet(i, j-1, c);
  }
  if(j+1<=12 && pole[i][j+1] == c)
  {
    pole[i][j]=0;
    pole[i][j+1]=0;
    delet(i, j+1, c);
  }
}

function testMatrix()
{
  for(var i=0; i<pole.length; i++)
    for(var j=0; j<pole[i].length; j++)
    {
      if(pole[i][j]==0) deleteObject(i,j);
    }
}
//---------------------

//нажатие
function handlerClickCanvas(e) 
{
  var X=-1, Y=-1;
  //сравнение кооржинат
  for(var i=0; i<14; i++)
  {
    if(e.clientX-40 > 0+30*i && e.clientX-40 < 30+30*i)
      X=i;
    if(e.clientY-40 > 0+30*i && e.clientY-40 < 30+30*i)
      Y=i;
  }
  //вызов удаления
  var flag=true;
  for(var i in array)
  {
    if(X == array[i].X() && Y == array[i].Y())
    {
      if(pole[Y][X]>5)flag=false;
      array[i].delit(Y, X, pole[Y][X]);
    }
  }
  testMatrix();  
  //спецобъекты
  if(deadObjects>6 && flag)
  {
    pole[Y][X]=6;
    array.push(new Bomb(200,400, 6, X, Y))
  }
  //очки
  score+=deadObjects;
  deadObjects=0; 
  console.log(score);
}
//---------

randomPole();
/*pole = [
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3],
  [1,2,3,4,5,1,2,3,4,5,1,2,3]
];*/

ctx.fillStyle="#555555";
ctx.font = "48px serif";
ctx.fillText("Loading", cnv.width/2-100, cnv.height/2);


var loading = 0;
wd.onload = bg.onload = candy.onload = function () 
{
  loading++;                            
}

//-------------------------------------

for (var i in pole)
{
  for (var j in pole[i])
  {
    switch (pole[i][j]) 
    {
      case 1: 
        array.push(new Candy(0,0, 1, j, i));
        break;
      case 2:
        array.push(new Candy(100, 0, 2, j, i));
        break;
      case 3:
        array.push(new Candy(200, 0, 3, j, i));
        break;
      case 4:
        array.push(new Candy(300, 0, 4, j, i));
        break;
      case 5:
        array.push(new Candy(400, 0, 5, j, i));
        break;
    }
  }
}

function game() 
{
  if (loading == 3)
  {
    ctx.drawImage(bg, 0, 0, cnv.width, cnv.height);
    ctx.drawImage(wd, 3030, 940, 3980-3030, 1420-940, 10, 10, 470, 460);
    ctx.drawImage(wd, 3030, 940, 3980-3030, 1420-940, 450, 10, 180, 460);
    
    
    for(var i in array)
    {
      array[i].draw();
    }
    
    anim();
  }
  requestAnimationFrame(game);
}

game();
