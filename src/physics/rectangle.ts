import Vec2 from "./vec2";
import Utils from "../utils";

export default class Rectangle {
   private _position: Vec2;
   private _dimension: Vec2;

   public constructor(x: number, y: number, width: number, height: number) {
      this._position = new Vec2(x, y);
      this._dimension = new Vec2(width, height);
   }

   public get position(): Vec2 {
      return this._position;
   }
   public get dimension(): Vec2 {
      return this._dimension;
   }

   public get x(): number {
      return this._position.x;
   }
   public get y(): number {
      return this._position.y;
   }
   public get width(): number {
      return this._dimension.x;
   }
   public get height(): number {
      return this._dimension.y;
   }

   public get left(): number {
      return this._position.x;
   }
   public get right(): number {
      return this._position.x + this._dimension.x;
   }
   public get top(): number {
      return this._position.y;
   }
   public get bottom(): number {
      return this._position.y + this._dimension.y;
   }

   public add(x: number, y: number, width: number, height: number) {
      return new Rectangle(this.x + x, this.y + y, this.width + width, this.height + height);
   }

   public overlaps(other: Rectangle): boolean {
      return Utils.lt(this.left, other.right) &&  // this.left < other.right
         Utils.gt(this.right, other.left) &&  // this.right > other.left
         Utils.lt(this.top, other.bottom) &&  // this.top < other.bottom
         Utils.gt(this.bottom, other.top); // this.bottom > other.top
   }

   public contains(other: Rectangle): boolean {
      return Utils.lte(this.left, other.left) && // this.left < other.left
      Utils.gte(this.right, other.right) && // this.right > other.right
      Utils.lte(this.top, other.top) && // this.top > other.top
      Utils.gte(this.bottom, other.bottom); // this.bottom > other.bottom
   }

   public merge(other: Rectangle): Rectangle {
      let minX = Math.min(this.left, other.left);
      let maxX = Math.max(this.right, other.right);
      let minY = Math.min(this.top, other.top);
      let maxY = Math.max(this.bottom, other.bottom);
      return new Rectangle(minX, minY, maxX - minX, maxY - minY);
   }
}