import Vec2 from "./vec2";
import Collidable from "./collidable";
import CollisionPair from "./collisionpair";
import * as Collections from "typescript-collections";

const DELTA_SCALE = 1000 / 6;

export default class World {
   public collidables: Collidable[];
   public collisionPairs: Collections.PriorityQueue<CollisionPair>;

   public constructor() {
      this.collidables = [];
      this.collisionPairs = new Collections.PriorityQueue<CollisionPair>(CollisionPair.compare);
   }

   public step(delta: number): void {
      let scaledDelta = Math.round(delta / DELTA_SCALE * 100) / 100;
      this.generateAABBs(scaledDelta);
      this.generatePairs(scaledDelta);
      this.runCollision(scaledDelta);
   }

   private generateAABBs(delta: number): void {
      for (let collidable of this.collidables) {
         collidable.aabb = collidable.getMovingAABB(delta, 1.0);
         collidable.cleanAABB = true;
      }
   }
   private generatePairs(delta: number): void {
      let pair: CollisionPair;
      // Iterate every pair of 2 collidables
      for (let i: number = 0; i < this.collidables.length; i++) {
         for (let j: number = i + 1; j < this.collidables.length; j++) {
            pair = new CollisionPair(this.collidables[i], this.collidables[j]);
            if (pair.aabbsOverlap()) {
               pair.calculateCollisionTime(delta, 1.0);
               this.collisionPairs.enqueue(pair);
            }
         }
      }
   }
   private runCollision(delta: number): void {
      let lastCollision: number = 0.0;
      let timeRemaining: number = 1.0;
      let pair: CollisionPair;
      while (!this.collisionPairs.isEmpty()) {
         console.log('asdf');
         pair = this.collisionPairs.dequeue();
         if (pair.collisionTime > 0 && pair.collisionTime <= timeRemaining) {
            this.simulateMovement(delta, pair.collisionTime - lastCollision);
            this.collide(pair, delta, lastCollision);
            lastCollision = pair.collisionTime;
            timeRemaining = 1.0 - pair.collisionTime;
         }
      }
      this.simulateMovement(delta, timeRemaining);
   }
   private simulateMovement(delta: number, timeToSimulate: number): void {
      for (let collidable of this.collidables) {
         collidable.simulate(delta, timeToSimulate);
      }
   }
   private collide(pair: CollisionPair, delta: number, lastCollision: number): void {
      pair.collidableA.velocity = new Vec2(0, 0);
      pair.collidableB.velocity = new Vec2(0, 0);
   }
}