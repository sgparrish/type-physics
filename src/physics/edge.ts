import Vec2 from "./vec2";
import DirectionSet from "./directionset";
import Rectangle from "./rectangle";
import Collidable from "./collidable";

export default class Edge extends Collidable {

   public horizontal: boolean;

   public constructor(pos: Vec2, horizontal: boolean, length: number) {
      super();
      this.horizontal = horizontal;
      if (horizontal) {
         this.bounds = new Rectangle(pos.x, pos.y, length, 0);
      } else {
         this.bounds = new Rectangle(pos.x, pos.y, 0, length);
      }
   }

   public get position(): (Vec2) {
      return this.bounds.position;
   }
   public set position(pos: Vec2) {
      this.bounds = new Rectangle(
         pos.x,
         pos.y,
         this.bounds.width,
         this.bounds.height);
   }
}