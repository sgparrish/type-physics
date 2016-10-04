import Vec2 from "./vec2";
import Collidable from "./collidable";
import Quadtree from "./quadtree";

const DELTA_SCALE = 1000 / 6;

export default class World {

   public quadtree: Quadtree;

   public collidables: Collidable[];

   public constructor() {
      this.quadtree = new Quadtree();

      this.collidables = [];
   }

   public add(collidable: Collidable) {
      this.collidables.push(collidable);
   }

   public step(delta: number): void {
      let scaledDelta = Math.round(delta / DELTA_SCALE * 100) / 100;
   }
}