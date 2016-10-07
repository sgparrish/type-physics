export default class Point {
   public x: number;
   public y: number;

   public constructor(point: any) {
      if (point.x && typeof point.x === "number")
         this.x = point.x;
      if (point.y && typeof point.y === "number")
         this.y = point.y;
   }
}