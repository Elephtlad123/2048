var tiles = document.getElementsByClassName("tile-inner");
for (var i = 0; i < tiles.length; i++) {
   let tile = tiles[i];
   tile.innerHTML = tile.parentElement.id;
}