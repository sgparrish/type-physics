import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import Body from "./body";
import Quadtree from "./quadtree";

export default class World {

   public bounds: Rectangle;
   public quadtree: Quadtree;
   public bodies: Body[];

   public constructor() {
      this.bounds = new Rectangle(0, 0, 700, 700);
      this.quadtree = new Quadtree(this.bounds);
      this.bodies = [];
   }

   public add(collidable: Body) {
      this.bodies.push(collidable);
   }

   public step(delta: number): void {

      // Move everything
      this.simulate(delta / 1000);

      // Regenerate quadtree
      this.quadtree.clear();
      for (let body of this.bodies) {
         this.quadtree.insert(body);
      }
      // Get sets and turn them into pairs
      let pairs = this.getPairsFromSets(this.quadtree.getSets());

      for (let pair of pairs) {
         this.collide(pair[0], pair[1]);
      }
   }

   private simulate(delta: number): void {
      for (let body of this.bodies) {
         body.simulate(delta);
      }
   }

   private getPairsFromSets(sets: Body[][]) {
      let pairs: [Body, Body][] = [];
      for (let set of sets) {
         for (let i = 0; i < set.length; i++) {
            for (let j = i; j < set.length; j++) {
               if (set[i] !== set[j]) {
                  pairs.push([set[i], set[j]]);
               }
            }
         }
      }
      return pairs;
   }

   private collide(bodyA: Body, bodyB: Body): void {
      let rectA = bodyA.getRectangle();
      let rectB = bodyB.getRectangle();
      // Are A and B overlapping?
      if (rectA.overlaps(rectB)) {
         // Get minimum penetration vector
         let minP = Number.MAX_VALUE;
         let minV: Vec2;

         let pL = rectA.left - rectB.right;
         if (Math.abs(pL) < Math.abs(minP)) {
            minP = pL;
            minV = new Vec2(pL, 0);
         }
         let pR = rectA.right - rectB.left;
         if (Math.abs(pR) < Math.abs(minP)) {
            minP = pR;
            minV = new Vec2(pR, 0);
         }
         let pT = rectA.top - rectB.bottom;
         if (Math.abs(pT) < Math.abs(minP)) {
            minP = pT;
            minV = new Vec2(0, pT);
         }
         let pB = rectA.bottom - rectB.top;
         if (Math.abs(pB) < Math.abs(minP)) {
            minP = pB;
            minV = new Vec2(0, pB);
         }

         // Response
         if (bodyA.moveable && !bodyB.moveable) {
            bodyA.position = bodyA.position.sub(minV);
         } else if (!bodyA.moveable && bodyB.moveable) {
            bodyB.position = bodyB.position.add(minV);
         } else if (bodyA.moveable && bodyB.moveable) {
            bodyA.position = bodyA.position.sub(minV.divide(2));
            bodyB.position = bodyB.position.add(minV.divide(2));
         }

         bodyA.collide(minV.normalize(), bodyB);
         bodyB.collide(minV.normalize().negate(), bodyA);

      }
   }

}