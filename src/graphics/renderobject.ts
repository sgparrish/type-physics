import RenderLayer from "./renderlayer";

/** Represents a renderable object in the orthographic projection.
 * 
 * @export
 * @class RenderObject
 */
export default class RenderObject {
   public displayObject: PIXI.DisplayObject;
   public depth: number;
   public layer: RenderLayer;

   public constructor(displayObject: PIXI.DisplayObject, depth: number, layer: RenderLayer) {
      this.displayObject = displayObject;
      this.depth = depth;
      this.layer = layer;
   }

   public static compare(objectA: RenderObject, objectB: RenderObject):number {
      if (objectA.layer != objectB.layer) {
         return objectB.layer - objectA.layer;
      } else {
         return objectA.depth - objectB.depth;
      }
   }
}