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

   public abs(): (Vec2) {
      return new Vec2(Math.abs(this._x), Math.abs(this._y));
   }
   public length(): number {
      return Math.sqrt(this._x * this._x + this._y * this._y);
   }
   public length2(): number {
      return this._x * this._x + this._y * this._y;
   }
   public negate(): (Vec2) {
      return new Vec2(-this._x, -this._y);
   }
   public normalize(): (Vec2) {
      return this.divide(this.length());
   }

   public add(other: Vec2): (Vec2) {
      return new Vec2(this._x + other._x, this._y + other._y);
   }
   public sub(other: Vec2): (Vec2) {
      return new Vec2(this._x - other._x, this._y - other._y);
   }
   public times(scale: number): (Vec2) {
      return new Vec2(this._x * scale, this._y * scale);
   }
   public divide(divisor: number): (Vec2) {
      return new Vec2(this._x / divisor, this._y / divisor);
   }
   public dot(other: Vec2): number {
      return this._x * other._x + this._y * other._y;
   }
   public cross(other: Vec2): number {
      return this._x * other._y - this._y * other._x;
   }

   public round(places?: number): (Vec2) {
      return new Vec2(
         Utils.round(this._x, places),
         Utils.round(this._y, places)
      );
   }
   public clamp(maxLength: number): (Vec2) {
      let curLength = this.length();
      if (curLength > maxLength) {
         return this.times(maxLength / curLength);
      }
      return this;
   }
   public rotate90(clockwise: boolean = true): (Vec2) {
      if (clockwise) {
         return new Vec2(this._y, -this._x);
      } else {
         return new Vec2(-this._y, this._x);
      }
   }
   public reduce(other: Vec2): (Vec2) {
      let x: number;
      let y: number;
      other = other.abs();
      if (this._x > 0) {
         x = Math.max(this._x - other._x, 0);
      } else {
         x = Math.min(this._x + other._x, 0);
      }
      if (this._y > 0) {
         y = Math.max(this._y - other._y, 0);
      } else {
         y = Math.min(this._y + other._y, 0);
      }
      return new Vec2(x, y);
   }
}