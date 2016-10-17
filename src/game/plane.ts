import Entity from "../engine/entity";

export default class Plane extends Entity {

   public minAlpha: number;

   public constructor(layer: number = 0, depth: number = 0, display: PIXI.DisplayObject = null) {
      super();
      this.layer = layer;
      this.depth = depth;
      this.display = display;
      this.minAlpha = 0.1;
   }

   public update(delta: number): void {
      // pass
   }

   public render(interpPercent: number): void {
      // pass
   }
}