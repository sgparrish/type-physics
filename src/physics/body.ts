import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import CollisionListener from "./collisionlistener";

export default class Body {

   private _position: Vec2;
   private _velocity: Vec2;
   private _dimension: Vec2;

   public moveable: boolean;
   public listener: CollisionListener;

   public constructor(pos: Vec2, vel: Vec2, dim: Vec2) {
      this.moveable = true;
      
      this.position = pos;
      this.velocity = vel;
      this.dimension = dim;
   }

   public get position(): Vec2 {
      return this._position;
   }
   public get velocity(): Vec2 {
      return this._velocity;
   }
   public get dimension(): Vec2 {
      return this._dimension;
   }

   public set position(pos: Vec2) {
      this._position = pos;
   }
   public set velocity(vel: Vec2) {
      this._velocity = vel;
   }
   public set dimension(dim: Vec2) {
      this._dimension = dim;
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