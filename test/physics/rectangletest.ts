import * as tsUnit from "../tsUnit";
import Vec2 from "../../src/physics/vec2";
import Rectangle from "../../src/physics/rectangle";

var rect1 = new Rectangle(2, 1, 4, 7);
var rect2 = new Rectangle(3, 4, 4, 3);
var rect3 = new Rectangle(7, 1, 2, 3);

export default class RectangleTest extends tsUnit.TestClass {

   testDirections() {
      this.areIdentical(2, rect1.left);
      this.areIdentical(6, rect1.right);
      this.areIdentical(1, rect1.top);
      this.areIdentical(8, rect1.bottom);
   }

   testAdd() {
      let addRect = rect1.add(2, 2, 4, 2);
      this.areIdentical(4, addRect.x);
      this.areIdentical(3, addRect.y);
      this.areIdentical(8, addRect.width);
      this.areIdentical(9, addRect.height);
   }

   testOverlaps() {
      this.isTrue(rect1.overlaps(rect2));
      this.isTrue(rect2.overlaps(rect1));
      this.isFalse(rect1.overlaps(rect3));
      this.isFalse(rect3.overlaps(rect1));
      this.isFalse(rect2.overlaps(rect3));
      this.isFalse(rect3.overlaps(rect2));
   }

   testMerge() {
      let mergeRect = rect1.merge(rect2);
      this.areIdentical(2, mergeRect.x);
      this.areIdentical(1, mergeRect.y);
      this.areIdentical(5, mergeRect.width);
      this.areIdentical(7, mergeRect.height);
   }

}