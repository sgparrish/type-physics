import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import Body from "./body";
import Tilemap from "./tilemap";

const MAX_DELTA_ADJUST = 2;

export default class World {

   public bodies: Body[];
   public tilemaps: Tilemap[];

   public constructor() {
      this.bodies = [];
      this.tilemaps = [];
      let t = new Tilemap(
         new Vec2(64, 64),
         new Vec2(8, 8),
         new Vec2(64, 64)
      );
      t.collisionMap[0] = true;
      t.collisionMap[1] = true;
      t.collisionMap[2] = true;
      t.collisionMap[3] = true;
      t.collisionMap[8] = true;
      t.collisionMap[16] = true;
      this.tilemaps.push(t);
   }

   public add(collidable: Body) {
      this.bodies.push(collidable);
   }

   public step(delta: number): void {
      delta /= 1000;

      // Move everything
      this.simulate(delta);

      // Collide everything against each other
      for (let i = 0; i < this.bodies.length; i++) {
         for (let j = i + 1; j < this.bodies.length; j++) {
            this.collideBodies(delta, this.bodies[i], this.bodies[j]);
         }
      }

      // Collide all bodies against all tilemaps
      for (let body of this.bodies) {
         for (let tilemap of this.tilemaps) {
            this.collideTilemap(delta, body, tilemap);
         }
      }
   }

   private simulate(delta: number): void {
      for (let body of this.bodies) {
         body.simulate(delta);
      }
   }

   private collideTilemap(delta: number, body: Body, tilemap: Tilemap): void {
      let rect = body.getRectangle();
      // Is the body within the tilemap bounds?
      if (rect.overlaps(tilemap.bounds)) {
         // Possible collision
         let tileBodies = tilemap.getBodiesInWorldRect(rect);
         for (let tileBody of tileBodies) {
            this.collideBodies(delta, body, tileBody);
         }
      }
   }

   private collideBodies(delta: number, bodyA: Body, bodyB: Body): void {
      let rectA = bodyA.getRectangle();
      let rectB = bodyB.getRectangle();
      // Are A and B overlapping?
      if (rectA.overlaps(rectB)) {
         this.separateBodiesY(delta, bodyA, bodyB);

         rectA = bodyA.getRectangle();
         rectB = bodyB.getRectangle();
         if (rectA.overlaps(rectB)) {
            this.separateBodiesX(delta, bodyA, bodyB);
         }
      }
   }

   private separateBodiesX(delta: number, bodyA: Body, bodyB: Body): void {
      let rectA = bodyA.getRectangle();
      let rectB = bodyB.getRectangle();
      let overlap: number;
      let maxOverlap = Math.abs(bodyA.velocity.x * delta) + Math.abs(bodyB.velocity.x * delta) + MAX_DELTA_ADJUST;

      if (bodyA.velocity.x > bodyB.velocity.x && bodyA.collideDirections.right && bodyB.collideDirections.left) {
         // Collide bodyA's right side with bodyB's left
         overlap = rectA.right - rectB.left;
      } else if (bodyA.velocity.x < bodyB.velocity.x && bodyA.collideDirections.left && bodyB.collideDirections.right) {
         // Collide bodyA's left side with bodyB's right
         overlap = rectA.left - rectB.right;
      } else {
         return;
      }
      if (Math.abs(overlap) > maxOverlap + 1) {
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
      let rectA = bodyA.getRectangle();
      let rectB = bodyB.getRectangle();
      let overlap: number;
      let maxOverlap = Math.abs(bodyA.velocity.y * delta) + Math.abs(bodyB.velocity.y * delta) + MAX_DELTA_ADJUST;

      if (bodyA.velocity.y < bodyB.velocity.y && bodyA.collideDirections.top && bodyB.collideDirections.bottom) {
         // Collide bodyA's top side with bodyB's bottom
         overlap = rectA.top - rectB.bottom
      } else if (bodyA.velocity.y > bodyB.velocity.y && bodyA.collideDirections.bottom && bodyB.collideDirections.top) {
         // Collide bodyA's bottom side with bodyB's top
         overlap = rectA.bottom - rectB.top;
      } else {
         return;
      }
      if (Math.abs(overlap) > maxOverlap + 1) {
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

}