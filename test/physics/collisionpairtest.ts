import * as tsUnit from "../tsUnit";
import Vec2 from "../../src/physics/vec2";
import Rectangle from "../../src/physics/rectangle";
import Collidable from "../../src/physics/collidable";
import CollisionPair from "../../src/physics/collisionpair";

var col1 = new Collidable(
   new Vec2(10, 10),
   new Vec2(1, 0),
   new Vec2(10, 10)
);
var col2 = new Collidable(
   new Vec2(20, 10),
   new Vec2(0, 0),
   new Vec2(10, 10)
);
var col3 = new Collidable(
   new Vec2(10, 10),
   new Vec2(3, 1),
   new Vec2(5, 5)
);
var pair12 = new CollisionPair(col1, col2);
var pair32 = new CollisionPair(col3, col2);

export default class CollisionPairTest extends tsUnit.TestClass {

   testAabbOverlap() {
      col1.aabb = col1.getMovingAABB(1, 1);
      col2.aabb = col2.getMovingAABB(1, 1);
      col3.aabb = col3.getMovingAABB(1, 1);

      this.isTrue(pair12.aabbsOverlap());
      this.isFalse(pair32.aabbsOverlap());
   }

   testMinkowski() {
      let rect12 = pair12.getMinkowskiRectangle();
      this.areIdentical(0, rect12.x);
      this.areIdentical(-10, rect12.y);
      this.areIdentical(20, rect12.width);
      this.areIdentical(20, rect12.height);

      let vel12 = pair12.getMinkowskiVelocity(1, 1);
      this.areIdentical(1, vel12.x);
      this.areIdentical(0, vel12.y);

      let rect32 = pair32.getMinkowskiRectangle();
      this.areIdentical(5, rect32.x);
      this.areIdentical(-5, rect32.y);
      this.areIdentical(15, rect32.width);
      this.areIdentical(15, rect32.height);

      let vel32 = pair32.getMinkowskiVelocity(1, 1);
      this.areIdentical(3, vel32.x);
      this.areIdentical(1, vel32.y);
   }

   testCollisionTime() {
      col3.simulate(1, 1);
      pair12.calculateCollisionTime(1, 1);
      pair32.calculateCollisionTime(1, 1);

      this.areIdentical(0, pair12.collisionTime);
      this.areIdentical(2/3, pair32.collisionTime);
   }

}