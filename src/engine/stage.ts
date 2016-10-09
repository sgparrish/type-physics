import Heap from "../datastructure/heap";
import Entity from "./entity";
import Collidable from "../physics/collidable";
import World from "../physics/world";
import RenderObject from "../graphics/renderobject";

/** Represents a game world. Contains entities that provide Renderobjects.
 * 
 * @export
 * @class Stage
 */
export default class Stage {

   private debugPhysics: PIXI.Graphics;

   private entities: Entity[];
   private physicsWorld: World;
   private displayRoot: PIXI.Container;

   public constructor(debugPhysics: boolean = false) {
      if (debugPhysics) {
         this.debugPhysics = new PIXI.Graphics();
      }
      this.entities = [];
      this.physicsWorld = new World();
      this.displayRoot = new PIXI.Container();
   }

   public add(entity: Entity) {
      if (entity.getCollidable() != null) {
         this.physicsWorld.add(entity.getCollidable());
      }
      this.entities.push(entity);
   }

   public update(delta: number) {
      this.physicsWorld.step(delta);
      for (let entity of this.entities) {
         entity.update(delta);
      }
   }

   public render(interpPercent: number): void {
      // Create a render heap to sort render objects
      // - from lowest layer to highest layer
      // - then highest depth to lowest depth
      let renderHeap = new Heap<RenderObject>(RenderObject.compare);
      for (let entity of this.entities) {
         // Collect render object arrays from each entity
         let renderObjects = entity.render(interpPercent);
         if (renderObjects != null) {
            // Iterate each render object and add to heap
            for (let renderObject of renderObjects) {
               renderHeap.add(renderObject);
            }
         }
      }
      // Clear existing graph and rebuild
      this.displayRoot.removeChildren();
      while (renderHeap.getSize() != 0) {
         this.displayRoot.addChild(renderHeap.removeRoot().displayObject);
      }

      if (this.debugPhysics) {
         this.displayRoot.addChild(this.debugPhysics);
         this.debugPhysics.clear();
         this.debugPhysics.lineStyle(2, 0xff0000, 1);
         for (let entity of this.entities) {
            let collidable = entity.getCollidable()
            if (collidable != null) {
               this.debugPhysics.beginFill(0x000000, 0);
               this.debugPhysics.drawRect(
                  collidable.bounds.x,
                  collidable.bounds.y,
                  collidable.bounds.width,
                  collidable.bounds.height
               );
               this.debugPhysics.endFill();
            }
         }
      }
   }

   public getDisplayRoot(): PIXI.DisplayObject {
      return this.displayRoot;
   }
}