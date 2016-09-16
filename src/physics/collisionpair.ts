import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import Collidable from "./collidable";

export default class CollisionPair {

   public valid: boolean;

   public collidableA: Collidable;
   public collidableB: Collidable;

   public collisionTime: number;
   public collisionNormal:Vec2;

   public constructor(collidableA: Collidable, collidableB: Collidable) {
      this.valid = true;
      this.collidableA = collidableA;
      this.collidableB = collidableB;
   }

   public contains(collidable: Collidable): boolean {
      return this.collidableA === collidable || this.collidableB === collidable;
   }

   public containsEither(pair: CollisionPair): boolean {
      return this.contains(pair.collidableA) || this.contains(pair.collidableB);
   }

   public aabbsOverlap(): boolean {
      return this.collidableA.aabb.overlaps(this.collidableB.aabb);
   }

   public getMinkowskiRectangle(): Rectangle {
      // Position of rect is b.position - a.position - a.dimension
      let position: Vec2 = this.collidableB.position.sub(this.collidableA.position).sub(this.collidableA.dimension);
      // Dimension of rect is a.dimension + b.dimension
      let dimension: Vec2 = this.collidableA.dimension.add(this.collidableB.dimension);
      return new Rectangle(position.x, position.y, dimension.x, dimension.y);
   }

   public getMinkowskiVelocity(delta: number, timeRemaining: number): Vec2 {
      // Velocity is a.velocity - b.velocity
      return this.collidableA.velocity.sub(this.collidableB.velocity).times(delta * timeRemaining);
   }

   public calculateCollisionTime(delta: number, timeRemaining: number): void {
      // Generate minkowski rectangle/velocity
      let rectangle: Rectangle = this.getMinkowskiRectangle();
      let velocity: Vec2 = this.getMinkowskiVelocity(delta, timeRemaining);
      let minTime: number = Number.MAX_VALUE;
      let time: number;
      let normal: Vec2 = new Vec2(0, 0);

      // Util Fuzzy math not necessary
      if (velocity.x != 0) {
         // Check Left edge
         time = rectangle.left / velocity.x;
         if (time >= 0 && time <= minTime) {
            minTime = time;
            normal = normal.add(new Vec2(-1, 0));
         }

         // Check Right edge
         time = rectangle.right / velocity.x;
         if (time >= 0 && time <= minTime) {
            minTime = time;
            normal = normal.add(new Vec2(1, 0));
         }
      }

      if (velocity.y != 0) {
         // Check Top edge
         time = rectangle.top / velocity.y;
         if (time >= 0 && time < minTime) {
            minTime = time;
            normal = normal.add(new Vec2(0, -1));
         }

         // Check Bottom edge
         time = rectangle.bottom / velocity.y;
         if (time >= 0 && time < minTime) {
            minTime = time;
            normal = normal.add(new Vec2(0, 1));
         }
      }

      this.collisionTime = minTime;
      this.collisionNormal = normal;
   }
   public reportCollision(): void {
      this.collidableA.collide(this.collisionTime, this.collisionNormal, this.collidableB);
      this.collidableB.collide(this.collisionTime, this.collisionNormal, this.collidableA);
   }
   public regenerateAABBs(delta: number, timeRemaining: number): void {
      this.collidableA.regenerateAABB(delta, timeRemaining, true);
      this.collidableB.regenerateAABB(delta, timeRemaining, true);
   }


   public static compare(pairA: CollisionPair, pairB: CollisionPair): number {
      return pairB.collisionTime - pairA.collisionTime;
   }
}