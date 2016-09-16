import * as tsUnit from "../tsUnit";
import Vec2 from "../../src/physics/vec2";

var v1: Vec2 = new Vec2(1, 2);
var v2: Vec2 = new Vec2(3, 4);
var v3: Vec2 = new Vec2(5, 6);
var v4: Vec2 = new Vec2(1/3, 2/3);

export default class Vec2Test extends tsUnit.TestClass {
   
   testLength() {
      this.areIdentical(5, v1.length2());
      this.areIdentical(5, v2.length());
      this.areIdentical(61, v3.length2());
   }

   testNegate() {
      this.areIdentical(-1, v1.negate().x);
      this.areIdentical(-2, v1.negate().y);
   }

   testNormalize() {
      this.areIdentical(1, v2.normalize().length());
      this.areIdentical(1, v3.normalize().length());
   }

   testAdd() {
      this.areIdentical(4, v1.add(v2).x);
      this.areIdentical(6, v1.add(v2).y);
   }

   testSub() {
      this.areIdentical(4, v3.sub(v1).x);
      this.areIdentical(4, v3.sub(v1).y);
   }

   testTimes() {
      this.areIdentical(25, v3.times(5).x);
      this.areIdentical(30, v3.times(5).y);
   }

   testDivide() {
      this.areIdentical(1, v3.divide(5).x);
      this.areIdentical(2, v3.divide(3).y);
   }

   testDot() {
      this.areIdentical(10, v1.dot(v2));
      this.areIdentical(10, v2.dot(v1));
   }

   testCross() {
      this.areIdentical(-2, v2.cross(v3));
      this.areIdentical(2, v3.cross(v2));
      this.areIdentical(-4, v1.cross(v3));
      this.areIdentical(4, v3.cross(v1));
   }

   testRound() {
      this.areIdentical(0.33, v4.round(2).x);
      this.areIdentical(0.67, v4.round(2).y);
   }

}