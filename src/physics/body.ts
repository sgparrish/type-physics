import Vec2 from "./vec2";
import Direction from "./direction";
import Rectangle from "./rectangle";
import CollisionListener from "./collisionlistener";

export default class Body {

   public position: Vec2;
   public velocity: Vec2;
   public dimension: Vec2;

   public moveable: boolean;

   public collideDirections: Direction;

   public listener: CollisionListener;

   public constructor(pos: Vec2, vel: Vec2, dim: Vec2) {
      this.moveable = true;

      this.collideDirections = new Direction(true);

      this.position = pos;
      this.velocity = vel;
      this.dimension = dim;
   }

   public getRectangle(): Rectangle {
      return new Rectangle(this.position.x, this.position.y,
         this.dimension.x, this.dimension.y);
   }

   public simulate(delta: number): void {
      this.position = this.position.add(this.velocity.times(delta));
   }

   public collide(normal: Vec2, other: Body): void {
      if (this.listener) {
         this.listener.collision(normal, other);
      }
   }
}