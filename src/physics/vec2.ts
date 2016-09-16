import Utils from "../utils";

export default class Vec2 {

   private _x: number;
   private _y: number;

   public constructor(x: number, y: number) {
      this._x = x;
      this._y = y;
   }

   public get x(): number {
      return this._x;
   }
   public get y(): number {
      return this._y;
   }

   public length(): number {
      return Math.sqrt(this._x * this._x + this._y * this._y);
   }
   public length2(): number {
      return this._x * this._x + this._y * this._y;
   }
   public negate(): Vec2 {
      return new Vec2(-this._x, -this._y);
   }
   public normalize(): Vec2 {
      return this.divide(this.length());
   }

   public add(other: Vec2): Vec2 {
      return new Vec2(this._x + other._x, this._y + other._y);
   }
   public sub(other: Vec2): Vec2 {
      return new Vec2(this._x - other._x, this._y - other._y);
   }
   public times(scale: number): Vec2 {
      return new Vec2(this._x * scale, this._y * scale);
   }
   public divide(divisor: number): Vec2 {
      return new Vec2(this._x / divisor, this._y / divisor);
   }
   public dot(other: Vec2): number {
      return this._x * other._y + this._y * other._x;
   }
   public cross(other: Vec2): number {
      return this._x * other._y - this._y * other._x;
   }

   public round(places?: number): Vec2 {
      return new Vec2(
         Utils.round(this._x, places),
         Utils.round(this._y, places)
      );
   }
}