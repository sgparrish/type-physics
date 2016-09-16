import Vec2 from "./vec2";
import Rectangle from "./rectangle";

const PRECISION: number = 2;

export default class Collidable {

   private _position: Vec2;
   private _velocity: Vec2;
   private _dimension: Vec2;

   public moveable: boolean;

   public cleanAABB: boolean;
   public aabb: Rectangle;

   public constructor(pos: Vec2, vel: Vec2, dim: Vec2) {
      this.moveable = true;

      this.cleanAABB = false;
      this.aabb = null;

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

   public set position(vec: Vec2) {
      this._position = vec.round(PRECISION);
   }
   public set velocity(vec: Vec2) {
      if (this.moveable) {
         this._velocity = vec.round(PRECISION);
      }
   }
   public set dimension(vec: Vec2) {
      this._dimension = vec.round(PRECISION);
   }

   public getRectangle(): Rectangle {
      return new Rectangle(this.position.x, this.position.y,
         this.dimension.x, this.dimension.y);
   }

   public getMovingAABB(delta: number, timeRemaining: number): Rectangle {
      let current: Rectangle = this.getRectangle();
      let scaledVel: Vec2 = this.velocity.times(delta * timeRemaining);
      let future: Rectangle = current.add(scaledVel.x, scaledVel.y, 0, 0);
      return current.merge(future);
   }

   public simulate(delta: number, timeToSimulate: number): void {
      this.position = this.position.add(this.velocity.times(delta * timeToSimulate));
   }
}