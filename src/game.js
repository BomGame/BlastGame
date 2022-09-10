cnv.addEventListener('click', handlerClickCanvas);

//отслеживание мыши
cnv.addEventListener('mousemove', function (e) {
    globalX = e.pageX - e.target.offsetLeft,
    globalY = e.pageY - e.target.offsetTop;
    //console.log(x, y);
});
//----------------------



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

//анимация
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

//логика уровня
function gameLogic(e) 
{
  if(!unlimit)
    steps--;
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
}

//логика меню
function menuLogic(e) 
{
  if(e.clientX > 110 && e.clientY > 110 && e.clientX < 205 && e.clientY < 150)
  {
    steps=14;
    score=0;
    finish=60;
    flagMenu=false;
  }
  
  if(e.clientX > 210 && e.clientY > 110 && e.clientX < 315 && e.clientY < 150)
  {
    steps=19;
    score=0;
    finish=100;
    flagMenu=false;
  }
  
  if(e.clientX > 110 && e.clientY > 180 && e.clientX < 205 && e.clientY < 220)
  {
    steps=30;
    score=0;
    finish=160;
    flagMenu=false;
  }
  
  if(e.clientX > 210 && e.clientY > 180 && e.clientX < 315 && e.clientY < 220)
  {
    unlimit=true;
    steps=999;
    score=0;
    finish=0;
    flagMenu=false;
  }
}

function WinLogic(e) 
{
  array.splice(0,array.length);
  pole = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  if(e.clientX > 500 && e.clientY > 410 && e.clientX < 550 && e.clientY < 460)
  {
    flagMenu=true;
  }
}

function OverLogic(e) 
{
  array.splice(0,array.length);
  pole = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  if(e.clientX > 500 && e.clientY > 410 && e.clientX < 550 && e.clientY < 460)
  {
    flagMenu=true;
  }
}

//нажатие
function handlerClickCanvas(e) 
{
  if(flagMenu)
    menuLogic(e);
  else
  {
    if(unlimit || finish-score > 0)
      if(steps > 0)
        gameLogic(e);
    if(finish-score <= 0 && !unlimit)
        WinLogic(e); 
    if(steps == 0 && finish-score > 0)
        OverLogic(e);
  }
}
//---------

//randomPole();
pole = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0]
];

ctx.font = "48px serif";
ctx.fillText("Loading", cnv.width/2-100, cnv.height/2);

//загрузка текстур
var loading = 0;
wd.onload = bg.onload = candy.onload = buttons.onload = function () 
{
  loading++;                            
}
//----------------

//рисование сцены с игрой
function gameplay() 
{
  ctx.drawImage(bg, 0, 0, cnv.width, cnv.height);
  ctx.drawImage(wd, 3030, 940, 3980-3030, 1420-940, 10, 10, 470, 460);
  ctx.drawImage(wd, 3030, 940, 3980-3030, 1420-940, 450, 10, 180, 460);
  
  for(var i in array)
  {
    array[i].draw();
  }
  
  ctx.fillText("Scores:", 460, 70, 150);
  ctx.fillText(score, 460, 110, 150);
  
  ctx.fillText("Steps:", 460, 160, 150);
  ctx.fillText(steps, 460, 200, 150);
  
  ctx.fillText("Mission:", 460, 250, 150);
  ctx.fillText(finish, 460, 290, 150);
  
  anim();
}

function gameOver() 
{
  ctx.drawImage(bg, 0, 0, cnv.width, cnv.height);
  ctx.drawImage(wd, 970, 2050, 800, 600, 10, 10, 470, 460);
  ctx.fillText("Game over", 100, 60, 150);
  ctx.fillText("Your scores:", 100, 170, 300);
  ctx.fillText(score, 100, 210, 300);
  
  x=500;
  y=410;
  if(globalX > x && globalY > y && globalX < x+100 && globalY < y+40)
    ctx.drawImage(buttons, 3500, 1200, 180, 180, x, y, 50, 50);
  else
    ctx.drawImage(buttons, 3080, 1200, 180, 180, x, y, 50, 50);
}

function gameWin() 
{
  var x, y;

  ctx.drawImage(bg, 0, 0, cnv.width, cnv.height);
  ctx.drawImage(wd, 970, 2050, 800, 600, 10, 10, 470, 460);
  ctx.fillText("Winner!", 150, 60, 150);
  ctx.fillText("Your scores:", 100, 170, 300);
  ctx.fillText(score, 100, 210, 300);
  
  x=500;
  y=410;
  if(globalX > x && globalY > y && globalX < x+100 && globalY < y+40)
    ctx.drawImage(buttons, 3500, 1200, 180, 180, x, y, 50, 50);
  else
    ctx.drawImage(buttons, 3080, 1200, 180, 180, x, y, 50, 50);
}

function mainMenu() 
{
  var x, y;
  ctx.drawImage(bg, 0, 0, cnv.width, cnv.height);
  ctx.drawImage(wd, 570, 1115, 480, 650, 10, 10, 470, 460);
  
  //normal
  x=110;
  y=110;
  if(globalX > x && globalY > y && globalX < x+100 && globalY < y+40)
    ctx.drawImage(buttons, 1070, 430, 440, 190, x, y, 100, 50);
  else
    ctx.drawImage(buttons, 160, 430, 440, 190, x, y, 100, 50);
  ctx.fillText("Normal", x+10, y+35, 80);
  
  //hard
  x=210;
  y=110;
  if(globalX > x && globalY > y && globalX < x+100 && globalY < y+40)
    ctx.drawImage(buttons, 1070, 430, 440, 190, x, y, 100, 50);
  else
    ctx.drawImage(buttons, 160, 430, 440, 190, x, y, 100, 50);
  ctx.fillText("Hard", x+10, y+35, 80);
  
  //fear
  x=110;
  y=180;
  if(globalX > x && globalY > y && globalX < x+100 && globalY < y+40)
    ctx.drawImage(buttons, 1070, 430, 440, 190, x, y, 100, 50);
  else
    ctx.drawImage(buttons, 160, 430, 440, 190, x, y, 100, 50);
  ctx.fillText("Fear", x+10, y+35, 80);
  
  //unlimit
  x=210;
  y=180;
  if(globalX > x && globalY > y && globalX < x+100 && globalY < y+40)
    ctx.drawImage(buttons, 1070, 430, 440, 190, x, y, 100, 50);
  else
    ctx.drawImage(buttons, 160, 430, 440, 190, x, y, 100, 50);
  ctx.fillText("Unlimit", x+10, y+35, 80);
}

//основная функция
function game() 
{
  if (loading == 4)
  {
    if(flagMenu)
    {
      ctx.fillStyle="#ffffff";
      ctx.font = "40px serif";
      mainMenu();
    }
    else 
    {
      ctx.fillStyle="#555555";
      ctx.font = "48px serif";
      if(finish-score > 0 || unlimit)
        if(steps > 0)
          gameplay();
      
      if(steps == 0 && finish-score > 0)
        gameOver();
        
      if(finish-score <= 0 && !unlimit)
        gameWin(); 
    }
  }
  requestAnimationFrame(game);
}

game();
