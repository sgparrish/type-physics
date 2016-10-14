export default class Color {
   public r: number;
   public g: number;
   public b: number;

   public constructor(r: number, g: number, b: number) {
      this.r = r;
      this.g = g;
      this.b = b;
   }

   public equals(r: number, g: number, b: number): boolean {
      return this.r === r && this.g === g && this.b === b;
   }
}