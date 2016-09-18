import * as tsUnit from "./tsUnit";
import UtilsTest from "./utilstest";
import HeapTest from "./datastructure/heaptest";
import Vec2Test from "./physics/vec2test";
import RectangleTest from "./physics/rectangletest";
import CollisionPairTest from "./physics/collisionpairtest";

var test = new tsUnit.Test({
   "UtilsTest": UtilsTest,
   "HeapTest": HeapTest,
   "Vec2Test": Vec2Test,
   "RectangleTest": RectangleTest,
   "CollisionPairTest": CollisionPairTest
});
test.run();
test.showResults(document.body);