import Layer from "./layer";
import Tileset from "./tileset";

export default class Map {

   public width: number;
   public height: number;
   public tileWidth: number;
   public tileHeight: number;

   public orientation: string;
   public backgroundColor: string;
   public renderOrder: string;
   public nextObjectId: number;

   public layers: Layer[];
   public tilesets: Tileset[];
   public properties: any;

   public constructor(map: any) {
      if (map.width && typeof map.width === "number")
         this.width = map.width;
      if (map.height && typeof map.height === "number")
         this.height = map.height;
      if (map.tilewidth && typeof map.tilewidth === "number")
         this.tileWidth = map.tilewidth;
      if (map.tileheight && typeof map.tileheight === "number")
         this.tileHeight = map.tileheight;

      if (map.orientation && typeof map.orientation === "string")
         this.orientation = map.orientation;
      if (map.backgroundcolor && typeof map.backgroundcolor === "string")
         this.backgroundColor = map.backgroundcolor;
      if (map.renderorder && typeof map.renderorder === "string")
         this.renderOrder = map.renderorder;
      if (map.nextobjectid && typeof map.nextobjectid === "number")
         this.nextObjectId = map.nextobjectid;

      if (map.layers && map.layers instanceof Array) {
         this.layers = [];
         for (let layer of map.layers) {
            this.layers.push(new Layer(layer));
         }
      }
      if (map.tilesets && map.tilesets instanceof Array) {
         this.tilesets = [];
         for (let tileset of map.tilesets) {
            this.tilesets.push(new Tileset(tileset));
         }
      }
      if (map.properties && map.properties instanceof Object) {
         this.properties = {};
         for (let property in map.properties) {
            this.properties[property] = map.properties[property];
         }
      }
   }
}