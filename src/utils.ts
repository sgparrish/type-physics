const MIN_NORMAL = 2.220446049250313e-16;
const DEFAULT_PRECISION = 2;
const DEFAULT_EPSILON = 0.000001;

export default class Utils {
   public static round(operand: number, places: number = DEFAULT_PRECISION): number {
      let factor = Math.pow(10, places);
      return Math.round(operand * factor) / factor;
   }

   public static eq(a: number, b: number, epsilon?: number): boolean {
      return this.nearlyEqual(a, b, epsilon);
   }
   public static ne(a: number, b: number, epsilon?: number): boolean {
      return !this.nearlyEqual(a, b, epsilon);
   }
   public static gt(a: number, b: number, epsilon?: number): boolean {
      return a > b && !this.nearlyEqual(a, b, epsilon);
   }
   public static lt(a: number, b: number, epsilon?: number): boolean {
      return a < b && !this.nearlyEqual(a, b, epsilon);
   }
   public static gte(a: number, b: number, epsilon?: number): boolean {
      return a > b || this.nearlyEqual(a, b, epsilon);
   }
   public static lte(a: number, b: number, epsilon?: number): boolean {
      return a < b || this.nearlyEqual(a, b, epsilon);
   }

   public static nearlyEqual(a: number, b: number, epsilon: number = DEFAULT_EPSILON): boolean {
      let absA = Math.abs(a);
      let absB = Math.abs(b);
      let diff = Math.abs(a - b);

      if (a == b) {
         return true;
      } else if (a == 0 || b == 0 || diff < MIN_NORMAL) {
         return diff < (epsilon * MIN_NORMAL);
      } else {
         return diff / (absA + absB) < epsilon;
      }
   }
}