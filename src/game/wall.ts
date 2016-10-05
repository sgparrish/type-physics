import Vec2 from "../physics/vec2";
import Body from "../physics/body";
import PhysicsEntity from "./physicsentity";

export default class Wall extends PhysicsEntity {

   public constructor(x: number, y: number, vertical: boolean = null) {
      super("Wall");
      this.position = new Vec2(x, y);
      this.dimension = new Vec2(100, 100);
      this.moveable = false;
      if (vertical) {
         this.collideDirections.left = false;
         this.collideDirections.right = false;
      } else if (vertical !== null) {
         this.collideDirections.top = false;
         this.collideDirections.bottom = false;
      }
   }

   public render(interpPercent: number): void {
   }
   public update(delta: number): void {
   }
   public collision(normal: Vec2, other: Body): void {
   }

}