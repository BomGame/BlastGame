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
    
    if(i-1>=0 && i+1<pole.length)
    {
      pole[i-1][j]=0;
      pole[i+1][j]=0;
    }
    
    if(j-1>=0 && j+1<pole[i].length)
    {
      pole[i][j+1]=0;
      pole[i][j-1]=0;
    }
    
    if(i-1>=0 && j-1>=0)
    {
      pole[i-1][j-1]=0;
    }
    
    if(i-1>=0 && j+1<pole[i].length)
    {      
      pole[i-1][j+1]=0;
    }
      
    if(i+1<pole.length && j-1>=0)
    {
      pole[i+1][j-1]=0;      
    }
      
    if(i+1<pole.length && j+1<pole[i].length)
    {
      pole[i+1][j+1]=0;
    }
  }
}
