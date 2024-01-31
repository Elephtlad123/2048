var grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],]

var root = document.documentElement;
var style = getComputedStyle(root);

function generateTile() {
   let x = Math.floor(Math.random() * 4);
   let y = Math.floor(Math.random() * 4);

   var rows = document.getElementsByClassName("grid-row");

   var tileParent = rows[y].getElementsByClassName("grid-cell")[x];

   if (tileParent.childNodes.length > 0) {
      generateTile()
   }
   else {
      var tile = document.createElement("div");
      tile.className = "tile";
      tile.id = "2";

      grid[y][x] = 2 
         
      var tileText = document.createElement("span");
      tileText.className = "tile-inner";
      tileText.innerHTML = tile.id;
         
      tile.appendChild(tileText);
         
      tileParent.appendChild(tile);
   }
}

generateTile()
generateTile()

console.log(grid)

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
 
      for (y=3; y > 0; y-=1){
         for (x=0; x < 4; x++){
          
            if (grid[y][x] != 0) {
               if (grid[y-1][x] === 0){
                  grid[y-1][x] = grid[y-1][x] + grid[y][x];
                  grid[y][x] = 0;
                  let tile = getTile(y,x);
                  getTile(y-1,x).appendChild(tile.firstChild);
                  valid = true;
                  
               } else { if (grid[y][x] === grid[y-1][x]){
                  grid[y-1][x] = grid[y-1][x] + grid[y][x];
                  grid[y][x] = 0;
                  let toptile = getTile(y-1,x);
                  let bottomtile = getTile(y,x);
                  toptile.firstChild.firstChild.innerHTML = grid[y-1][x];
                  toptile.firstChild.id = grid[y-1][x];
                  toptile.firstChild.style.backgroundColor = style.getPropertyValue('--'+String(toptile.firstChild.id)+'color');
                  if (grid[y-1][x] > 4){toptile.firstChild.firstChild.style.color = '#f9f6f2';}
                  bottomtile.firstChild.remove();
                  valid = true;
               }}
            }
         }
      }
      if (valid === true) {generateTile();}
   }


   else if (e.keyCode == '40') {
      // down arrow

      valid = false;
 
      for (y=0; y < 3; y++){
         for (x=0; x < 4; x++){
          
            if (grid[y][x] != 0) {
               if (grid[y+1][x] === 0){
                  grid[y+1][x] = grid[y][x];
                  grid[y][x] = 0;
                  let tile = getTile(y,x);
                  getTile(y+1,x).appendChild(tile.firstChild);
                  valid = true;
                  
               } else { if (grid[y][x] === grid[y+1][x]){
                  grid[y+1][x] = grid[y+1][x] + grid[y][x];
                  grid[y][x] = 0;
                  let bottomtile = getTile(y+1,x);
                  let toptile = getTile(y,x);
                  bottomtile.firstChild.firstChild.innerHTML = grid[y+1][x];
                  bottomtile.firstChild.id = grid[y+1][x];
                  bottomtile.firstChild.style.backgroundColor = style.getPropertyValue('--'+String(bottomtile.firstChild.id)+'color');
                  if (grid[y+1][x] > 4){bottomtile.firstChild.firstChild.style.color = '#f9f6f2';}
                  toptile.firstChild.remove();
                  valid = true;
               }}
            }
         }
      }
      if (valid === true) {generateTile();}
   }
   

   else if (e.keyCode == '37') {
      // left arrow

      valid = false;
 
      for (x=3; x > 0; x-=1){
         for (y=0; y < 4; y++) {
            
            if (grid[y][x] != 0) {
               if (grid[y][x-1] === 0){
                  grid[y][x-1] = grid[y][x-1] + grid[y][x];
                  grid[y][x] = 0;
                  let tile = getTile(y,x);
                  getTile(y,x-1).appendChild(tile.firstChild);
                  valid = true;
               } else { if(grid[y][x-1] === grid[y][x]){
                  grid[y][x-1] = grid[y][x-1] + grid[y][x];
                  grid[y][x] = 0;
                  let lefttile = getTile(y,x-1);
                  let righttile = getTile(y,x);
                  lefttile.firstChild.firstChild.innerHTML = grid[y][x-1];
                  lefttile.firstChild.id = grid[y][x-1];
                  lefttile.firstChild.style.backgroundColor = style.getPropertyValue('--'+String(lefttile.firstChild.id)+'color');
                  if (grid[y][x-1] > 4){lefttile.firstChild.firstChild.style.color = '#f9f6f2';}
                  righttile.firstChild.remove();
                  valid = true
               }}
            }
         }
      }
      if (valid === true) {generateTile();}
   }


   else if (e.keyCode == '39') {
      // right arrow
   }

}
