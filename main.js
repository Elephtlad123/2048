function main() {
   let x = Math.floor(Math.random() * 4);
   let y = Math.floor(Math.random() * 4);

   var rows = document.getElementsByClassName("grid-row");

   var tileParent = rows[y].getElementsByClassName("grid-cell")[x];

   if (tileParent.childNodes.length > 0) {
      main()
   }
   else {
      var tile = document.createElement("div");
      tile.className = "tile";
      tile.id = "2";
         
      var tileText = document.createElement("span");
      tileText.className = "tile-inner";
         
      tile.appendChild(tileText);
         
      tileParent.appendChild(tile);
   }
}

main()
main()

var tiles = document.getElementsByClassName("tile-inner");
for (var i = 0; i < tiles.length; i++) {
   let tile = tiles[i];
   tile.innerHTML = tile.parentElement.id;
}
