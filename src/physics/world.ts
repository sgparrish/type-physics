import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import DirectionSet from "./directionset";
import Collidable from "./collidable";
import Body from "./body";
import Edge from "./edge";
import Tilemap from "./tilemap";

const MAX_DELTA_ADJUST = 3;

export default class World {

   public collidables: Collidable[];

   public constructor() {
      this.collidables = [];
   }

   public add(collidable: Collidable) {
      this.collidables.push(collidable);
   }

   public step(delta: number): void {
      delta /= 1000;

      // Move everything
      this.simulate(delta);

      // Collide bodies against each other
      for (let a = 0; a < this.collidables.length; a++) {
         for (let b = a + 1; b < this.collidables.length; b++) {
            let collidableA = this.collidables[a];
            let collidableB = this.collidables[b];
            if (collidableA.enabled && collidableB.enabled) {
               this.collide(delta, collidableA, collidableB);
            }
         }
      }
   }

   private simulate(delta: number): void {
      for (let collidable of this.collidables) {
         if (collidable instanceof Body) {
            collidable.simulate(delta);
         }
      }
   }

   private collide(delta: number, collidableA: Collidable, collidableB: Collidable): void {
      if (collidableA instanceof Body && collidableB instanceof Body) {
         this.collideBodies(delta, collidableA, collidableB);
      } else if (collidableA instanceof Body && collidableB instanceof Edge) {
         this.collideEdge(delta, collidableA, collidableB);
      } else if (collidableA instanceof Edge && collidableB instanceof Body) {
         this.collideEdge(delta, collidableB, collidableA);
      } else if (collidableA instanceof Body && collidableB instanceof Tilemap) {
         this.collideTilemap(delta, collidableA, collidableB);
      } else if (collidableA instanceof Tilemap && collidableB instanceof Body) {
         this.collideTilemap(delta, collidableB, collidableA);
      }
   }

   private collideBodies(delta: number, bodyA: Body, bodyB: Body): void {
      // Are A and B overlapping?
      if (bodyA.bounds.overlaps(bodyB.bounds)) {
         // Solve collision in Y dimension
         this.separateBodiesY(delta, bodyA, bodyB);
         // Not solved? solve in X dimension
         if (bodyA.bounds.overlaps(bodyB.bounds)) {
            this.separateBodiesX(delta, bodyA, bodyB);
         }
      }
   }

   private collideEdge(delta: number, body: Body, edge: Edge): void {
      console.log('plz');
      if (body.bounds.overlaps(edge.bounds)) {
         this.separateBodyEdge(delta, body, edge);
      }
   }

   private collideTilemap(delta: number, body: Body, tilemap: Tilemap): void {
      // Is the body within the tilemap bounds?
      if (body.bounds.overlaps(tilemap.bounds)) {
         // Possible collision
         let tileBodies = tilemap.getBodiesInWorldRect(body.bounds);
         for (let tileBody of tileBodies) {
            this.collideBodies(delta, body, tileBody);
         }
      }
   }

   private separateBodiesX(delta: number, bodyA: Body, bodyB: Body): void {
      let overlap: number;
      let maxOverlap = Math.abs(bodyA.velocity.x * delta) + Math.abs(bodyB.velocity.x * delta) + MAX_DELTA_ADJUST;

      if (bodyA.velocity.x > bodyB.velocity.x && bodyA.collideDirections.right && bodyB.collideDirections.left) {
         // Collide bodyA's right side with bodyB's left
         overlap = bodyA.bounds.right - bodyB.bounds.left;
      } else if (bodyA.velocity.x < bodyB.velocity.x && bodyA.collideDirections.left && bodyB.collideDirections.right) {
         // Collide bodyA's left side with bodyB's right
         overlap = bodyA.bounds.left - bodyB.bounds.right;
      } else {
         return;
      }
      if (Math.abs(overlap) > maxOverlap) {
         return;
      }

      if (bodyA.moveable && bodyB.moveable) {
         // Move both bodies half
         bodyA.position = bodyA.position.sub(new Vec2(overlap * 0.5, 0));
         bodyB.position = bodyB.position.add(new Vec2(overlap * 0.5, 0));

         let avgVel = (bodyA.velocity.x + bodyB.velocity.x) * 0.5;

         bodyA.velocity = new Vec2(avgVel, bodyA.velocity.y);
         bodyB.velocity = new Vec2(avgVel, bodyB.velocity.y);
      } else if (bodyA.moveable) {
         // Just body A is movable
         bodyA.position = bodyA.position.sub(new Vec2(overlap, 0));
         bodyA.velocity = new Vec2(bodyB.velocity.x, bodyA.velocity.y);
      } else if (bodyB.moveable) {
         // Just body B is movable
         bodyB.position = bodyB.position.add(new Vec2(overlap, 0));
         bodyB.velocity = new Vec2(bodyA.velocity.x, bodyB.velocity.y);
      }
   }
   private separateBodiesY(delta: number, bodyA: Body, bodyB: Body): void {
      let overlap: number;
      let maxOverlap = Math.abs(bodyA.velocity.y * delta) + Math.abs(bodyB.velocity.y * delta) + MAX_DELTA_ADJUST;

      if (bodyA.velocity.y < bodyB.velocity.y && bodyA.collideDirections.top && bodyB.collideDirections.bottom) {
         // Collide bodyA's top side with bodyB's bottom
         overlap = bodyA.bounds.top - bodyB.bounds.bottom
      } else if (bodyA.velocity.y > bodyB.velocity.y && bodyA.collideDirections.bottom && bodyB.collideDirections.top) {
         // Collide bodyA's bottom side with bodyB's top
         overlap = bodyA.bounds.bottom - bodyB.bounds.top;
      } else {
         return;
      }
      if (Math.abs(overlap) > maxOverlap) {
         return;
      }

      if (bodyA.moveable && bodyB.moveable) {
         // Move both bodies half
         bodyA.position = bodyA.position.sub(new Vec2(0, overlap * 0.5));
         bodyB.position = bodyB.position.add(new Vec2(0, overlap * 0.5));

         let avgVel = (bodyA.velocity.y + bodyB.velocity.y) * 0.5;

         bodyA.velocity = new Vec2(bodyA.velocity.y, avgVel);
         bodyB.velocity = new Vec2(bodyB.velocity.y, avgVel);
      } else if (bodyA.moveable) {
         // Just body A is movable
         bodyA.position = bodyA.position.sub(new Vec2(0, overlap));
         bodyA.velocity = new Vec2(bodyA.velocity.x, bodyB.velocity.y);
      } else if (bodyB.moveable) {
         // Just body B is movable
         bodyB.position = bodyB.position.add(new Vec2(0, overlap));
         bodyB.velocity = new Vec2(bodyB.velocity.x, bodyA.velocity.y);
      }
   }

   private separateBodyEdge(delta: number, body: Body, edge: Edge): void {
      let overlap: number;
      let maxOverlap: number;
      if (edge.horizontal) {
         maxOverlap = Math.abs(body.velocity.y * delta) + MAX_DELTA_ADJUST;
         if (body.velocity.y < 0) {
            // collide body top with edge
            overlap = body.bounds.top - edge.position.x;
         } else if (body.velocity.y > 0) {
            // collide body bottom with edge
            overlap = body.bounds.bottom - edge.position.x;
         } else {
            return;
         }
         if (overlap > maxOverlap) {
            return;
         }
         body.position = body.position.sub(new Vec2(0, overlap));
         body.velocity = new Vec2(body.velocity.x, 0);
      } else {
         maxOverlap = Math.abs(body.velocity.x * delta) + MAX_DELTA_ADJUST;
         if (body.velocity.x < 0) {
            // collide body left with edge
            overlap = body.bounds.left - edge.position.y;
         } else if (body.velocity.x > 0) {
            // collide body right with edge
            overlap = body.bounds.right - edge.position.y;
         } else {
            return;
         }
         if (overlap > maxOverlap) {
            return;
         }
         body.position = body.position.sub(new Vec2(overlap, 0));
         body.velocity = new Vec2(0, body.velocity.y);
      }
   }
}