// lib/mapUtils.ts

/**
 * Converts latitude, longitude, and zoom level to Slippy Map tile coordinates (x, y).
 * Formula from: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_(JavaScript/ActionScript,_etc.)
 */
export function worldCoordToTileCoord(lat: number, lon: number, zoom: number): { x: number; y: number } {
    const latRad = lat * Math.PI / 180;
    const n = Math.pow(2, zoom);
    const xTile = Math.floor(((lon + 180) / 360) * n);
    const yTile = Math.floor(
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
    );
    // Add basic validation
    if (isNaN(xTile) || isNaN(yTile) || !isFinite(xTile) || !isFinite(yTile)) {
        console.error("Tile coordinate calculation resulted in NaN/Infinity for:", {lat, lon, zoom});
        // Return a default or throw an error, depending on desired handling
        return { x: 0, y: 0 }; // Or throw new Error("Invalid tile calculation");
    }
    return { x: xTile, y: yTile };
  }
  
  /**
   * Optional: Converts tile coordinates back to the Lat/Lon of the tile's top-left corner.
   * Useful for debugging or positioning things relative to tiles.
   */
  export function tileCoordToWorldCoord(x: number, y: number, zoom: number): { lat: number; lon: number } {
      const n = Math.pow(2, zoom);
      const lonDeg = (x / n) * 360 - 180;
      const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n)));
      const latDeg = latRad * 180 / Math.PI;
       // Add basic validation
      if (isNaN(latDeg) || isNaN(lonDeg) || !isFinite(latDeg) || !isFinite(lonDeg)) {
        console.error("World coordinate calculation resulted in NaN/Infinity for:", {x, y, zoom});
        return { lat: 0, lon: 0 }; // Or throw new Error("Invalid world calculation");
      }
      return { lat: latDeg, lon: lonDeg };
  }