import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import Body from "./body";
import CollisionListener from "./collisionlistener";

export default class Tilemap implements CollisionListener{

   public bounds: Rectangle;

   public mapSize: Vec2;
   public tileSize: Vec2;

   public collisionMap: boolean[];

   public constructor(pos: Vec2, mapSize: Vec2, tileSize: Vec2) {
      this.bounds = new Rectangle(pos.x, pos.y, mapSize.x * tileSize.x, mapSize.y * tileSize.y);
      this.mapSize = mapSize;
      this.tileSize = tileSize;

      this.collisionMap = [];
      let arraySize = mapSize.x * mapSize.y
      for (let index = 0; index < arraySize; index++) {
         this.collisionMap[index] = false;
      }
   }

   public worldCoordsToLocalCoords(position: Vec2): Vec2 {
      let x = Math.floor((position.x - this.bounds.x) / this.tileSize.x);
      let y = Math.floor((position.y - this.bounds.y) / this.tileSize.y);
      return new Vec2(x, y);
   }
   public localCoordsToIndex(position: Vec2): number {
      return position.x + (position.y * this.mapSize.x);
   }
   public worldCoordsToIndex(position: Vec2): number {
      return this.localCoordsToIndex(this.worldCoordsToLocalCoords(position));
   }
   public localCoordsToWorldCoords(position: Vec2): Vec2 {
      let x = (position.x * this.tileSize.x) + this.bounds.x;
      let y = (position.y * this.tileSize.y) + this.bounds.y;
      return new Vec2(x, y)
   }
   public indexToLocalCoords(index: number): Vec2 {
      let x = index % this.mapSize.x;
      let y = Math.floor(index / this.mapSize.x)
      return new Vec2(x, y)
   }
   public indexToWorldCoords(index: number): Vec2 {
      return this.localCoordsToWorldCoords(this.indexToLocalCoords(index));
   }

   public tileAtWorldCoords(position: Vec2): boolean {
      return this.collisionMap[this.worldCoordsToIndex(position)];
   }
   public tileAtLocalCoords(position: Vec2): boolean {
      return this.collisionMap[this.localCoordsToIndex(position)];
   }
   public tileAtIndex(index: number): boolean {
      return this.collisionMap[index];
   }

   public getBodiesInWorldRect(rect: Rectangle): Body[] {
      let min = this.worldCoordsToLocalCoords(rect.position);
      let max = this.worldCoordsToLocalCoords(rect.position.add(rect.dimension));
      let bodies: Body[] = [];

      for (let y = min.y; y <= max.y; y++) {
         for (let x = min.x; x <= max.x; x++) {
            let localCoords = new Vec2(x, y);
            let worldCoords = this.localCoordsToWorldCoords(localCoords);
            if (this.tileAtLocalCoords(localCoords)) {
               // Create body
               let body = new Body(worldCoords, new Vec2(0, 0), this.tileSize);
               body.moveable = false;

               // Set collision directions
               // Check Right
               let left = localCoords.add(new Vec2(-1, 0));
               let right = localCoords.add(new Vec2(1, 0));
               let top = localCoords.add(new Vec2(0, -1));
               let bottom = localCoords.add(new Vec2(0, 1));

               body.collideDirections.left = !this.tileAtLocalCoords(left);
               body.collideDirections.right = !this.tileAtLocalCoords(right);
               body.collideDirections.top = !this.tileAtLocalCoords(top);
               body.collideDirections.bottom = !this.tileAtLocalCoords(bottom);
               body.listener = this;
               bodies.push(body);
            }
         }
      }
      return bodies;
   }

   public getRectangles(): Rectangle[] {
      let rectangles: Rectangle[] = [];
      for (let y = 0; y < this.mapSize.y; y++) {
         for (let x = 0; x < this.mapSize.x; x++) {
            let localCoords = new Vec2(x, y);
            if (this.tileAtLocalCoords(localCoords)) {
               let worldCoords = this.localCoordsToWorldCoords(localCoords);
               rectangles.push(new Rectangle(worldCoords.x, worldCoords.y, this.tileSize.x, this.tileSize.y))
            }
         }
      }
      return rectangles;
   }

   public collision(normal: Vec2, other: Body): void {

   }
}