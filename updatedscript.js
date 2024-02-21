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
                                    tile.style.top = String(((y-z)*24.3)+"%");

                                    let tile2 = document.getElementById(String("pos-"+(y-z)+"-"+x));
                                    tile2.setAttribute("value",String(grid[y-z][x]));

                                    tile.addEventListener("transitionend", () => {
                                        tile.remove();
                                        tile2.firstChild.innerHTML = tile2.getAttribute("value");
                                        tile2.style.backgroundColor = style.getPropertyValue('--'+String(tile2.getAttribute("value"))+'color');
                                        if (tile2.getAttribute("value") > 4){tile2.firstChild.style.color = '#f9f6f2';}
                                    })

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
                            let tile = document.getElementById(String("pos-"+(y+z-1)+"-"+x));
                            tile.id = String("pos-"+(y+z)+"-"+x)
                            tile.style.top = String(((y+z)*24.3)+"%");
                            valid = true;

                        } else {if (grid[y+z][x] === grid[y+z-1][x]){
                            if (gridMerged[y+z][x] === 0){
                                if (gridMerged[y+z-1][x] === 0){
                                    grid[y+z][x] *= 2;
                                    grid[y+z-1][x] = 0;
                                    let tile = document.getElementById(String("pos-"+(y+z-1)+"-"+x));
                                    tile.style.top = String(((y+z)*24.3)+"%");

                                    let tile2 = document.getElementById(String("pos-"+(y+z)+"-"+x));
                                    tile2.setAttribute("value",String(grid[y+z][x]));

                                    tile.addEventListener("transitionend", () => {
                                        tile.remove();
                                        tile2.firstChild.innerHTML = tile2.getAttribute("value");
                                        tile2.style.backgroundColor = style.getPropertyValue('--'+String(tile2.getAttribute("value"))+'color');
                                        if (tile2.getAttribute("value") > 4){tile2.firstChild.style.color = '#f9f6f2';}
                                    })

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
                            let tile = document.getElementById(String("pos-"+y+"-"+(x-z+1)));
                            tile.id = String("pos-"+y+"-"+(x-z))
                            tile.style.left = String(((x-z)*24.3)+"%");
                            valid = true;

                        } else {if (grid[y][x-z] === grid[y][x-z+1]){
                            if (gridMerged[y][x-z] === 0){
                                if (gridMerged[y][x-z+1] === 0){
                                    grid[y][x-z] *= 2;
                                    grid[y][x-z+1] = 0;
                                    let tile = document.getElementById(String("pos-"+y+"-"+(x-z+1)));
                                    tile.style.left = String(((x-z)*24.3)+"%");

                                    let tile2 = document.getElementById(String("pos-"+y+"-"+(x-z)));
                                    tile2.setAttribute("value",String(grid[y][x-z]));

                                    tile.addEventListener("transitionend", () => {
                                        tile.remove();
                                        tile2.firstChild.innerHTML = tile2.getAttribute("value");
                                        tile2.style.backgroundColor = style.getPropertyValue('--'+String(tile2.getAttribute("value"))+'color');
                                        if (tile2.getAttribute("value") > 4){tile2.firstChild.style.color = '#f9f6f2';}
                                    })
                            
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
                       let tile = document.getElementById(String("pos-"+y+"-"+(x+z-1)));
                       tile.id = String("pos-"+y+"-"+(x+z))
                       tile.style.left = String(((x+z)*24.3)+"%");
                       valid = true;
  
                    } else { if(grid[y][x+z] === grid[y][x+z-1]){
                       if (gridMerged[y][x+z] === 0){
                          if (gridMerged[y][x+z-1] === 0){
                             grid[y][x+z] *= 2;
                             grid[y][x+z-1] = 0;
                             let tile = document.getElementById(String("pos-"+y+"-"+(x+z-1)));
                            tile.style.left = String(((x+z)*24.3)+"%")
                            let tile2 = document.getElementById(String("pos-"+y+"-"+(x+z)));
                            tile2.setAttribute("value",String(grid[y][x+z]))
                            tile.addEventListener("transitionend", () => {
                                tile.remove();
                                tile2.firstChild.innerHTML = tile2.getAttribute("value");
                                tile2.style.backgroundColor = style.getPropertyValue('--'+String(tile2.getAttribute("value"))+'color');
                                if (tile2.getAttribute("value") > 4){tile2.firstChild.style.color = '#f9f6f2';}
                            })
     
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
