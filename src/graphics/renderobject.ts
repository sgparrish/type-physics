export default class RenderObject {
   public displayObject: PIXI.DisplayObject;
   public depth: number;

   public constructor(displayObject: PIXI.DisplayObject, depth: number) {
      this.displayObject = displayObject;
      this.depth = depth;
   }
}