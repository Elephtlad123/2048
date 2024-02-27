var grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],];

var score = 0;
var moves = 0;

var root = document.documentElement;
var style = getComputedStyle(root);

function generateTile(){
   let freeSpaces = [];

   for (y=0; y<4; y++){
      for (x=0; x<4; x++){
         if (grid[y][x] === 0){
            freeSpaces.push([x,y]);
         }
      }
   }

   let GenPos = Math.floor(Math.random() * freeSpaces.length);
   let Genx = (freeSpaces[GenPos])[0];
   let Geny = (freeSpaces[GenPos])[1];

   let rows = document.getElementsByClassName("grid-row");

   let tileParent = rows[Geny].getElementsByClassName("grid-cell")[Genx];

   let tile = document.createElement("div");
   tile.className = "tile";
   tile.id = "2";
   grid[Geny][Genx] = 2 
      
   let tileText = document.createElement("span");
   tileText.className = "tile-inner";
   tileText.innerHTML = tile.id;
      
   tile.appendChild(tileText);
      
   tileParent.appendChild(tile);
}

generateTile()
generateTile()

document.onkeydown = checkKey;

function getTile(y,x) {
   var rows = document.getElementsByClassName("grid-row");
   var row = rows[y];
   var cells = row.getElementsByClassName("grid-cell");
   var tile = cells[x];

   return tile;
}

function checkKey(e) {

   e = e || window.event;

   if (e.keyCode == '38') {
      // up arrow
      let valid = false;
      var gridMerged = [[0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],]; 

      for (x=0; x<4; x++){
         for (y=0; y<4; y++){

            if (grid[y][x] != 0){
               for (z=1; z<y+1; z++){

                  if (grid[y-z][x] === 0){
                     grid[y-z][x] = grid[y-z+1][x];
                     grid[y-z+1][x] = 0;
                     let tileInner = getTile(y-z+1,x).firstChild;
                     getTile(y-z,x).append(tileInner);
                     valid = true;
                     
                  } else { if(grid[y-z][x] === grid[y-z+1][x]){
                     if (gridMerged[y-z][x] === 0){
                        if (gridMerged[y-z+1][x] === 0){
                           grid[y-z][x] *= 2;
                           grid[y-z+1][x] = 0;
                           let tileInner = getTile(y-z,x).firstChild;
                           tileInner.id = String(grid[y-z][x]);
                           tileInner.firstChild.innerHTML = String(tileInner.id);
                           tileInner.style.backgroundColor = style.getPropertyValue('--'+String(tileInner.id)+'color');
                           if (grid[y-z][x] > 4){tileInner.firstChild.style.color = '#f9f6f2';}
                           getTile(y-z+1,x).firstChild.remove();
   
                           score += grid[y-z][x];
                           document.getElementById("score").innerHTML = String(score);
   
                           valid = true;
                           gridMerged[y-z][x] = 1;
                        }
                     }
                  }}
               }
            }
         }
      }
      if (valid){
         generateTile();
         moves++;
         document.getElementById("moves").innerHTML = String(moves);
      }
   }


   else if (e.keyCode == '40') {
      // down arrow
      let valid = false;
      var gridMerged = [[0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],]; 

      for (x=0; x<4; x++){
         for (y=3; y>=0; y--){

            if (grid[y][x] != 0){
               for (z=1; z<4-y;z++){

                  if (grid[y+z][x] == 0){
                     grid[y+z][x] = grid[y+z-1][x];
                     grid[y+z-1][x] = 0;
                     let tileInner = getTile(y+z-1,x).firstChild;
                     getTile(y+z,x).append(tileInner);
                     valid = true;

                  } else {if (grid[y+z][x] === grid[y+z-1][x]){
                     if (gridMerged[y+z][x] === 0){
                        if (gridMerged[y+z-1][x] === 0){
                           grid[y+z][x] *= 2;
                           grid[y+z-1][x] = 0;
                           let tileInner = getTile(y+z,x).firstChild;
                           tileInner.id = String(grid[y+z][x]);
                           tileInner.firstChild.innerHTML = String(tileInner.id);
                           tileInner.style.backgroundColor = style.getPropertyValue('--'+String(tileInner.id)+'color');
                           if (grid[y+z][x] > 4){tileInner.firstChild.style.color = '#f9f6f2';}
                           getTile(y+z-1,x).firstChild.remove();
   
                           score += grid[y+z][x];
                           document.getElementById("score").innerHTML = String(score);
   
                           valid = true;
                           gridMerged[y+z][x] = 1;
                        }
                     }
                  }} 
               }
            }
         }
      }
      if (valid){
         generateTile();
         moves++;
         document.getElementById("moves").innerHTML = String(moves);
      }
   }
   

   else if (e.keyCode == '37') {
      // left arrow
      let valid = false;
      var gridMerged = [[0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],];

      for (y=0; y<4; y++){
         for (x=0; x<4; x++){
            
            if (grid[y][x] != 0){
               for (z=1; z<x+1; z++){

                  if (grid[y][x-z] === 0){
                     grid[y][x-z] = grid[y][x-z+1];
                     grid[y][x-z+1] = 0;
                     let tileInner = getTile(y,x-z+1).firstChild;
                     getTile(y,x-z).append(tileInner);
                     valid = true;

                  } else {if (grid[y][x-z] === grid[y][x-z+1]){
                     if (gridMerged[y][x-z] === 0){
                        if (gridMerged[y][x-z+1] === 0){
                           grid[y][x-z] *= 2;
                           grid[y][x-z+1] = 0;
                           let tileInner = getTile(y,x-z).firstChild;
                           tileInner.id = grid[y][x-z];
                           tileInner.firstChild.innerHTML = String(tileInner.id);
                           tileInner.style.backgroundColor = style.getPropertyValue('--'+String(tileInner.id)+'color');
                           if (grid[y][x-z] > 4){tileInner.firstChild.style.color = '#f9f6f2';}
                           getTile(y,x-z+1).firstChild.remove();
   
                           score += grid[y][x-z];
                           document.getElementById("score").innerHTML = String(score);
   
                           valid = true;
                           gridMerged[y][x-z] = 1;
                        }
                     }
                  }}
               }
            }
         }
      }
      if (valid){
         generateTile();
         moves++;
         document.getElementById("moves").innerHTML = String(moves);
      }
   }


   else if (e.keyCode == '39') {
      // right arrow
      let valid = false;
      var gridMerged = [[0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],];

      for (y=0; y<4; y++){
         for (x=3; x>=0; x--){
            
            if (grid[y][x] != 0){
               for (z=1; z<4-x; z++){

                  if (grid[y][x+z] === 0){
                     grid[y][x+z] = grid[y][x+z-1];
                     grid[y][x+z-1] = 0;
                     let tileInner = getTile(y,x+z-1).firstChild;
                     getTile(y,x+z).append(tileInner);
                     valid = true;

                  } else { if(grid[y][x+z] === grid[y][x+z-1]){
                     if (gridMerged[y][x+z] === 0){
                        if (gridMerged[y][x+z-1] === 0){
                           grid[y][x+z] *= 2;
                           grid[y][x+z-1] = 0;
                           let tileInner = getTile(y,x+z).firstChild;
                           tileInner.id = String(grid[y][x+z]);
                           tileInner.firstChild.innerHTML = String(tileInner.id);
                           tileInner.style.backgroundColor = style.getPropertyValue('--'+String(tileInner.id)+'color');
                           if (grid[y][x+z] > 4){tileInner.firstChild.style.color = '#f9f6f2';}
                           getTile(y,x+z-1).firstChild.remove();
   
                           score += grid[y][x+z];
                           document.getElementById("score").innerHTML = String(score);
   
                           valid = true;
                           gridMerged[y][x+z] = 1;
                        }
                     }
                  }}
               }
            }
         }
      }
      if (valid){
         generateTile();
         moves++;
         document.getElementById("moves").innerHTML = String(moves);
      }
   }
}
