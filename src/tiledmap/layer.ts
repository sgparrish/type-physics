import MapObject from "./mapobject";

export default class Layer {

   public name: string;
   public type: string;

   public x: number;
   public y: number;
   public width: number;
   public height: number;

   public visible: boolean;
   public opacity: number;
   public drawOrder: string;

   public data: number[];
   public objects: any[];
   public properties: any;

   public constructor(layer: any) {
      if (layer.name && typeof layer.name === "string")
         this.name = layer.name;
      if (layer.type && typeof layer.type === "string")
         this.type = layer.type;

      if (layer.x && typeof layer.x === "number")
         this.x = layer.x;
      if (layer.y && typeof layer.y === "number")
         this.y = layer.y;
      if (layer.width && typeof layer.width === "number")
         this.width = layer.width;
      if (layer.height && typeof layer.height === "number")
         this.height = layer.height;

      if (layer.visible && typeof layer.visible === "boolean")
         this.visible = layer.visible;
      if (layer.opacity && typeof layer.opacity === "number")
         this.opacity = layer.opacity;
      if (layer.draworder && typeof layer.draworder === "string")
         this.drawOrder = layer.draworder;

      if (layer.data && layer.data instanceof Array) {
         this.data = [];
         for (let datum of layer.data) {
            if (typeof datum === "number") {
               this.data.push(datum);
            }
         }
      }
      if (layer.objects && layer.objects instanceof Array) {
         this.objects = [];
         for (let obj of layer.objects) {
            this.objects.push(new MapObject(obj));
         }
      }
      if (layer.properties && layer.properties instanceof Object) {
         this.properties = {};
         for (let property in layer.properties) {
            this.properties[property] = layer.properties[property];
         }
      }
   }
}