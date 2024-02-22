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

function runAnim(tile){
    let endx = tile.getAttribute("endx");
    let endy = tile.getAttribute("endy");   

    console.log(tile);

    tile.style.left = String(endx-gridOffsetLeft+"px");
    tile.style.bottom = String(gridOffsetBottom-endy+"px");
}


function createTileAnim(value, startx,endx,starty,endy){
    let tempGrid = document.getElementById("temp-grid")

    gridOffsets = tempGrid.getBoundingClientRect();
    gridOffsetLeft = gridOffsets.left;
    gridOffsetBottom = gridOffsets.bottom;

    console.log(gridOffsetBottom);

    let newTile = document.createElement("div");
    tempGrid.appendChild(newTile);
    newTile.setAttribute("Value",String(value));
    newTile.className = "temp-tile";
    //newTile.style.backgroundColor = style.getPropertyValue('--'+String(value)+'color');
    newTile.style.backgroundColor = "#000"
    newTile.style.left = String(startx-gridOffsetLeft+"px");
    newTile.style.bottom = String(gridOffsetBottom-starty+"px");
    newTile.setAttribute("endx", String(endx-gridOffsetLeft+"px"));
    newTile.setAttribute("endy", String(gridOffsetBottom-endy+"px"));

    let newTileInner = document.createElement("span");
    newTileInner.className = "tile-inner";
    newTileInner.innerHTML = String(value);
    newTile.appendChild(newTileInner);

    runAnim(newTile);
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
                    let tile = getTile(y,x);

                    let offsets = tile.getBoundingClientRect();
                    let leftOffset = offsets.left;
                    let bottomOffset = offsets.bottom;
                    let tileValue = grid[y][x];
                    let endLeftOffset = 0;
                    let endBottomOffset = 0;

                    for (z=1; z<y+1; z++){
 
                        if (grid[y-z][x] === 0){
                            grid[y-z][x] = grid[y-z+1][x];
                            grid[y-z+1][x] = 0;

                            let tileInner = getTile(y-z+1,x).firstChild;
                            getTile(y-z,x).appendChild(tileInner);

                            endLeftOffset = tileInner.parentElement.getBoundingClientRect().left;
                            endBottomOffset = tileInner.parentElement.getBoundingClientRect().bottom;

                            valid = true;
                      
                        } else { if(grid[y-z][x] === grid[y-z+1][x]){
                            if (gridMerged[y-z][x] === 0){
                                if (gridMerged[y-z+1][x] === 0){
                                    grid[y-z][x] *= 2;
                                    grid[y-z+1][x] = 0;

                                    score += grid[y-z][x];
                                    document.getElementById("score").innerHTML = String(score);

                                    valid = true;
                                    gridMerged[y-z][x] = 1;
                                }
                            }
                        }}
                    }
                    createTileAnim(tileValue,leftOffset,endLeftOffset,bottomOffset,endBottomOffset);
                }
            } 
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

                            valid = true;

                        } else {if (grid[y+z][x] === grid[y+z-1][x]){
                            if (gridMerged[y+z][x] === 0){
                                if (gridMerged[y+z-1][x] === 0){
                                    grid[y+z][x] *= 2;
                                    grid[y+z-1][x] = 0;

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
        if (valid){generateTile();}
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

                            valid = true;

                        } else {if (grid[y][x-z] === grid[y][x-z+1]){
                            if (gridMerged[y][x-z] === 0){
                                if (gridMerged[y][x-z+1] === 0){
                                    grid[y][x-z] *= 2;
                                    grid[y][x-z+1] = 0;
                                    
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
        if (valid){generateTile();}
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
                       
                       valid = true;
  
                    } else { if(grid[y][x+z] === grid[y][x+z-1]){
                        if (gridMerged[y][x+z] === 0){
                            if (gridMerged[y][x+z-1] === 0){
                                grid[y][x+z] *= 2;
                                grid[y][x+z-1] = 0;
                            
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
        if (valid){generateTile();}
     }
     console.log(score);
  }