import Vec2 from "./vec2";
import DirectionSet from "./directionset";
import Rectangle from "./rectangle";
import Collidable from "./collidable";

export default class Body extends Collidable {

   public moveable: boolean;

   public velocity: Vec2;

   public collideDirections: DirectionSet;

   public constructor(pos: Vec2, vel: Vec2, dim: Vec2) {
      super();

      this.moveable = true;
      this.bounds = new Rectangle(pos.x, pos.y, dim.x, dim.y);
      this.velocity = vel;
      this.collideDirections = new DirectionSet(true);
   }

   public simulate(delta: number): void {
      this.position = this.position.add(this.velocity.times(delta));
   }
}