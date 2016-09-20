import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import CollisionListener from "./collisionlistener";

export default class Collidable {

   private _position: Vec2;
   private _velocity: Vec2;
   private _dimension: Vec2;

   public moveable: boolean;

   public regenPairs: boolean;
   public aabb: Rectangle;

   public listener: CollisionListener;

   public constructor(pos: Vec2, vel: Vec2, dim: Vec2) {
      this.moveable = true;

      this.regenPairs = false;
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
      this._position = vec.round(1);
   }
   public set velocity(vec: Vec2) {
      if (this.moveable) {
         this._velocity = vec.round();
      }
   }
   public set dimension(vec: Vec2) {
      this._dimension = vec.round(1);
   }

   public getRectangle(): Rectangle {
      return new Rectangle(this.position.x, this.position.y,
         this.dimension.x, this.dimension.y);
   }

   public getMovingRectangle(delta: number, timeRemaining: number): Rectangle {
      let current: Rectangle = this.getRectangle();
      let scaledVel: Vec2 = this.velocity.times(delta * timeRemaining);
      let future: Rectangle = current.add(scaledVel.x, scaledVel.y, 0, 0);
      return current.merge(future);
   }

   public regenerateAABB(delta: number, timeRemaining: number, updateRegenPairs: boolean): void {
      let newAABB = this.getMovingRectangle(delta, timeRemaining);
      if (this.aabb !== null && !this.aabb.contains(newAABB) && updateRegenPairs) {
         this.regenPairs = true;
      } else {
         this.regenPairs = false;
      }
      this.aabb = newAABB;
   }

   public simulate(delta: number, timeToSimulate: number): void {
      this.position = this.position.add(this.velocity.times(delta * timeToSimulate));
   }

   public collide(time: number, normal: Vec2, other: Collidable): void {
      if (this.listener) {
         this.listener.collision(time, normal, other);
      }
   }
}