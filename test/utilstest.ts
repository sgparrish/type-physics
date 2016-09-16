import * as tsUnit from "./tsUnit";
import Utils from "../src/utils";

export default class UtilsTest extends tsUnit.TestClass {

   testRound() {
      this.areIdentical(0.333, Utils.round(1 / 3, 3));
      this.areIdentical(0.6667, Utils.round(2 / 3, 4));
      this.areIdentical(268.33, Utils.round(100 + 168.33));
   }

   testNearlyEqual() {
      this.isTrue(Utils.nearlyEqual(268.33, 100 + 168.33));
   }

}