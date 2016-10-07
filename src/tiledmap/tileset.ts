import Terrain from "./terrain";

export default class Tileset {

   public name: string;

   public firstGid: number;
   public image: string;

   public tileWidth: number;
   public tileHeight: number;
   public imageWidth: number;
   public imageHeight: number;

   public margin: number;
   public spacing: number;

   public terrains: Terrain[];
   public tiles: any;
   public tileProperties: any;
   public properties: any;

   public constructor(tileset: any) {
      if (tileset.name && typeof tileset.name === "string")
         this.name = tileset.name;
      
      if (tileset.firstgid && typeof tileset.firstgid === "number")
         this.firstGid = tileset.firstgid;
      if (tileset.image && typeof tileset.image === "string")
         this.image = tileset.image;

      if (tileset.tilewidth && typeof tileset.tilewidth === "number")
         this.tileWidth = tileset.tilewidth;
      if (tileset.tileheight && typeof tileset.tileheight === "number")
         this.tileHeight = tileset.tileheight;
      if (tileset.imagewidth && typeof tileset.imagewidth === "number")
         this.imageWidth = tileset.imagewidth;
      if (tileset.imageheight && typeof tileset.imageheight === "number")
         this.imageHeight = tileset.imageheight;
      
      if (tileset.margin && typeof tileset.margin === "number")
         this.margin = tileset.margin;
      if (tileset.spacing && typeof tileset.spacing === "number")
         this.spacing = tileset.spacing;
      
      if (tileset.terrains && tileset.terrains instanceof Array) {
         this.terrains = [];
         for (let terrain of tileset.terrains) {
            this.terrains.push(new Terrain(terrain));
         }
      }
      if (tileset.tiles && tileset.tiles instanceof Object) {
         this.tiles = {};
         for (let tile of tileset.tiles) {
            this.tiles.push(tile);
         }
      }
      if (tileset.tileproperties && tileset.tileproperties instanceof Object) {
         this.tileProperties = {};
         for (let property in tileset.tileproperties) {
            this.tileProperties[property] = tileset.properties[property];
         }
      }
      if (tileset.properties && tileset.properties instanceof Object) {
         this.properties = {};
         for (let property in tileset.properties) {
            this.properties[property] = tileset.properties[property];
         }
      }
   }
}