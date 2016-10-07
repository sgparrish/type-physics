import Point from "./point";

export default class MapObject {

   public name: string;
   public type: string;
   public id: number;

   public x: number;
   public y: number;
   public width: number;
   public height: number;

   public gid: number;
   public visible: boolean;
   public rotation: number;

   public ellipse: boolean;
   public polygon: Point[];
   public polyline: Point[];

   public properties: any;

   public constructor(obj: any) {
      if (obj.name && typeof obj.name === "string")
         this.name = obj.name;
      if (obj.type && typeof obj.type === "string")
         this.type = obj.type;
      if (obj.id && typeof obj.id === "number")
         this.id = obj.id;

      if (obj.x && typeof obj.x === "number")
         this.x = obj.x;
      if (obj.y && typeof obj.y === "number")
         this.y = obj.y;
      if (obj.width && typeof obj.width === "number")
         this.width = obj.width;
      if (obj.height && typeof obj.height === "number")
         this.height = obj.height;

      if (obj.gid && typeof obj.gid === "number")
         this.gid = obj.gid;
      if (obj.visible && typeof obj.visible === "boolean")
         this.visible = obj.visible;
      if (obj.rotation && typeof obj.rotation === "number")
         this.rotation = obj.rotation;

      if (obj.ellipse && typeof obj.ellipse === "boolean") {
         this.ellipse = obj.ellipse;
      } else if (obj.polygon && obj.polygon instanceof Array) {
         this.polygon = [];
         for (let point of obj.polygon) {
            this.polygon.push(new Point(point));
         }
      } else if (obj.polyline && obj.polyline instanceof Array) {
         this.polyline = [];
         for (let point of obj.polyline) {
            this.polyline.push(new Point(point));
         }
      }

      if (obj.properties && obj.properties instanceof Object) {
         this.properties = {};
         for (let property in obj.properties) {
            this.properties[property] = obj.properties[property];
         }
      }
   }
}