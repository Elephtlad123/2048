var grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],];

var score = 0;

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
 
    console.log(freeSpaces);
 
    let tileParent = document.getElementById("temp-grid");
 
    let tile = document.createElement("div");
    tile.className = "temp-tile";
    tile.setAttribute("value", 2);
    tile.id = String("pos-"+Geny+"-"+Genx);
    tile.style.left = String((Genx*24.3)+"%");
    tile.style.top = String((Geny*24.3)+"%");
    grid[Geny][Genx] = 2;

       
    let tileText = document.createElement("span");
    tileText.className = "tile-inner";
    tileText.innerHTML = tile.getAttribute("value");
       
    tile.appendChild(tileText);
       
    tileParent.appendChild(tile);
}

generateTile();
generateTile();

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
        //up
        
    }
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
                            let tile = document.getElementById(String("pos-"+(y-z+1)+"-"+x));
                            tile.id = String("pos-"+(y-z)+"-"+x)
                            tile.style.top = String(((y-z)*24.3)+"%");
                            valid = true;
                      
                        } else { if(grid[y-z][x] === grid[y-z+1][x]){
                            if (gridMerged[y-z][x] === 0){
                                if (gridMerged[y-z+1][x] === 0){
                                    grid[y-z][x] *= 2;
                                    grid[y-z+1][x] = 0;
                                    let tile = document.getElementById(String("pos-"+(y-z+1)+"-"+x));
                                    tile.id = String("pos-"+(y-z)+"-"+x);
                                    tile.style.top = String(((y-z)*24.3)+"%");
                                    let tile2 = document.getElementById(String("pos-"+(y-z)+"-"+x));
                                    tile.addEventListener("transitionend", (event, grid) => {
                                        tile.remove();
                                        tile2.firstChild.innerHTML = grid[y-z][x];
                                    })
                                    if (grid[y-z][x] > 4){tileInner.firstChild.style.color = '#f9f6f2';}

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
        if (valid){generateTile();}
        console.log(gridMerged);
    }
}