import Vec2 from "./vec2";
import Collidable from "./collidable";
import CollisionPair from "./collisionpair";
import * as Collections from "typescript-collections";

const DELTA_SCALE = 1000 / 6;

export default class World {
   public collidables: Collidable[];
   public collisionPairs: Collections.PriorityQueue<CollisionPair>;
   public collisionPairMap: Collections.MultiDictionary<Collidable, CollisionPair>;

   public constructor() {
      this.collidables = [];
      this.collisionPairs = new Collections.PriorityQueue<CollisionPair>(CollisionPair.compare);
      this.collisionPairMap = new Collections.MultiDictionary<Collidable, CollisionPair>()
   }

   public step(delta: number): void {
      let scaledDelta = Math.round(delta / DELTA_SCALE * 100) / 100;
      this.generateAABBs(scaledDelta);
      this.generatePairs(scaledDelta);
      this.runCollision(scaledDelta);
      this.cleanUp();
   }

   private addPair(pair: CollisionPair): void {
      this.collisionPairs.enqueue(pair);
      this.collisionPairMap.setValue(pair.collidableA, pair);
      this.collisionPairMap.setValue(pair.collidableB, pair);
   }

   private getNextPair(): CollisionPair {
      let pair = this.collisionPairs.dequeue();
      this.collisionPairMap.remove(pair.collidableA, pair);
      this.collisionPairMap.remove(pair.collidableB, pair);
      return pair;
   }

   private removePair(pair: CollisionPair): void {
      pair.valid = false;
      this.collisionPairMap.remove(pair.collidableA, pair);
      this.collisionPairMap.remove(pair.collidableB, pair);
   }

   private generateAABBs(delta: number): void {
      for (let collidable of this.collidables) {
         collidable.regenerateAABB(delta, 1.0, false);
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
               this.addPair(pair);
            }
         }
      }
   }
   private runCollision(delta: number): void {
      let lastCollision: number = 0.0;
      let timeRemaining: number = 1.0;
      let pair: CollisionPair;
      while (!this.collisionPairs.isEmpty()) {
         pair = this.getNextPair();
         if (pair.valid && pair.collisionTime >= 0 && pair.collisionTime <= timeRemaining) {
            // Deactivate any aliases of this pair
            pair.valid = false;
            // Move up to collision
            this.simulateMovement(delta, pair.collisionTime - lastCollision);
            // Update time to reflect how far we have simulated
            lastCollision += pair.collisionTime;
            timeRemaining -= pair.collisionTime;
            // Report collision at this time
            pair.reportCollision();
            // Begin work for any future collisions
            pair.regenerateAABBs(delta, timeRemaining);
            this.cleanPairs(pair, delta, timeRemaining); // Remove any pairs that are no longer valid
            this.regenPairs(pair, delta, timeRemaining);
         }
      }
      this.simulateMovement(delta, timeRemaining);
   }
   private simulateMovement(delta: number, timeToSimulate: number): void {
      for (let collidable of this.collidables) {
         collidable.simulate(delta, timeToSimulate);
      }
   }
   private cleanPairs(donePair: CollisionPair, delta: number, timeRemaining: number) {
      let pairs = this.collisionPairMap.getValue(donePair.collidableA);
      for (let iPair of pairs) {
         if (iPair.containsEither(donePair)) {
            // If iPair has a regen pairs collidable, then remove (mark invalid)
            if ((iPair.contains(donePair.collidableA) && donePair.collidableA.regenPairs) ||
               (iPair.contains(donePair.collidableB) && donePair.collidableB.regenPairs)) {
               this.removePair(iPair);
            } else {
               // Don't remove, just re-calculate collision time and re-add to p-queue
               iPair.calculateCollisionTime(delta, timeRemaining);
               this.collisionPairs.add(iPair);
            }
         }
      }
      pairs = this.collisionPairMap.getValue(donePair.collidableB);
      for (let iPair of pairs) {
         if (iPair.containsEither(donePair)) {
            // If iPair has a regen pairs collidable, then remove (mark invalid)
            if ((iPair.contains(donePair.collidableA) && donePair.collidableA.regenPairs) ||
               (iPair.contains(donePair.collidableB) && donePair.collidableB.regenPairs)) {
               this.removePair(iPair);
            } else {
               // Don't remove, just re-calculate collision time and re-add to p-queue
               iPair.calculateCollisionTime(delta, timeRemaining);
               this.collisionPairs.add(iPair);
            }
         }
      }
   }
   private regenPairs(donePair: CollisionPair, delta: number, timeRemaining: number) {
      let pair: CollisionPair;
      for (let i: number = 0; i < this.collidables.length; i++) {
         if (donePair.collidableA.regenPairs) {
            pair = new CollisionPair(this.collidables[i], donePair.collidableA);
            if (pair.aabbsOverlap()) {
               pair.calculateCollisionTime(delta, 1.0);
               this.addPair(pair);
            }
         }
         if (donePair.collidableB.regenPairs) {
            pair = new CollisionPair(this.collidables[i], donePair.collidableB);
            if (pair.aabbsOverlap()) {
               pair.calculateCollisionTime(delta, 1.0);
               this.addPair(pair);
            }
         }
      }
   }

   private cleanUp(): void {
      this.collisionPairs.clear();
      this.collisionPairMap.clear();
   }
}