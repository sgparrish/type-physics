import Vec2 from "./vec2";

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
      return this.left < other.right && this.right > other.left
         && this.top < other.bottom && this.bottom > other.top;
   }

   public merge(other: Rectangle): Rectangle {
      let minX = Math.min(this.left, other.left);
      let maxX = Math.max(this.right, other.right);
      let minY = Math.min(this.top, other.top);
      let maxY = Math.max(this.bottom, other.bottom);
      return new Rectangle(minX, minY, maxX - minX, maxY - minY);
   }
}