var grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],]

var Offsets = [2.5,27,51,75]

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
      let merged = false;

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
                     if (merged === false){
                        grid[y-z][x] *= 2;
                        grid[y-z+1][x] = 0;
                        let tileInner = getTile(y-z,x).firstChild;
                        tileInner.id = String(grid[y-z][x]);
                        tileInner.firstChild.innerHTML = String(tileInner.id);
                        tileInner.style.backgroundColor = style.getPropertyValue('--'+String(tileInner.id)+'color');
                        if (grid[y-z][x] > 4){tileInner.firstChild.style.color = '#f9f6f2';}
                        getTile(y-z+1,x).firstChild.remove();
                        valid = true;
                        merged = true;
                     }
                  }}
               }
            }
         }
      }
      if (valid){generateTile();}
   }


   else if (e.keyCode == '40') {
      // down arrow
   }
   

   else if (e.keyCode == '37') {
      // left arrow
   }


   else if (e.keyCode == '39') {
      // right arrow
   }

}
