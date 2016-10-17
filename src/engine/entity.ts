import Collidable from "../physics/collidable";

/** Represents a world object that exists on a Stage. Without a stage, an entity has no meaning
 * 
 * @export
 * @interface Entity
 */
abstract class Entity {

   private static nextId = 0;

   public constructor() {
      this._id = Entity.getNextId();
      this.minAlpha = 1;
   }

   private _id: number;

   public layer: number;
   public depth: number;
   public display: PIXI.DisplayObject;
   public minAlpha: number;

   public body: Collidable;

   abstract update(delta: number): void;
   abstract render(interpPercent: number): void;

   public get id(): number {
      return this._id;
   }

   public static compare(entityA: Entity, entityB: Entity): number {
      let depth = entityA.depth - entityB.depth;
      if (depth == 0) {
         return entityA.layer - entityB.layer;
      } else {
         return depth;
      }
   }

   private static getNextId(): number {
      this.nextId += 1;
      return this.nextId;
   }
}
export default Entity;