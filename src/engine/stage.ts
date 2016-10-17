import Heap from "../datastructure/heap";
import Entity from "./entity";
import EntityList from "./entitylist";
import Vec2 from "../physics/Vec2";
import Collidable from "../physics/collidable";
import Tilemap from "../physics/tilemap";
import World from "../physics/world";

/** Represents a game world. Contains entities that provide Renderobjects.
 * 
 * @export
 * @class Stage
 */
export default class Stage {

   private debugPhysics: PIXI.Graphics;

   private player: Entity;

   private entities: EntityList;
   private physicsWorld: World;
   private displayRoot: PIXI.Container;

   public constructor(debugPhysics: boolean = false) {
      if (debugPhysics) {
         this.debugPhysics = new PIXI.Graphics();
      }
      this.entities = new EntityList();
      this.physicsWorld = new World();
      this.displayRoot = new PIXI.Container();
      this.displayRoot.scale.set(4, 4);
   }

   public add(entity: Entity, isPlayer = false) {
      if (isPlayer) {
         this.player = entity;
      }
      if (entity.body != null) {
         this.physicsWorld.add(entity.body);
      }
      this.entities.add(entity);
   }

   public addAll(entities: Entity[]) {
      for (let entity of entities) {
         this.add(entity);
      }
   }

   public update(delta: number) {
      this.physicsWorld.step(delta);

      this.entities.start();
      while (this.entities.hasNext()) {
         this.entities.next().update(delta);
      }
   }

   public render(interpPercent: number): void {
      // Clear existing graph
      this.displayRoot.removeChildren();

      // Update entity display objects
      this.entities.start();
      while (this.entities.hasNext()) {
         this.entities.next().render(interpPercent);
      }

      // Sort depth back to front
      this.entities.sort();
      // Fade out everything in front of player
      let reachedPlayer = false;
      this.entities.start();
      while (this.entities.hasNext()) {
         let entity = this.entities.next();
         if (entity === this.player) {
            reachedPlayer = true;
         }
         if (reachedPlayer) {
            // fade objects out
            entity.display.alpha = entity.minAlpha;
         } else {
            // make objects opaque
            entity.display.alpha = 1;
         }
         this.displayRoot.addChild(entity.display);
      }

      if (this.debugPhysics) {
         this.displayRoot.addChild(this.debugPhysics);
         this.debugPhysics.clear();
         this.debugPhysics.lineStyle(2, 0xff0000, 1);
         this.entities.start();
         while (this.entities.hasNext()) {
            let collidable = this.entities.next().body;
            if (collidable != null) {
               this.debugPhysics.beginFill(0x000000, 0);
               this.debugPhysics.drawRect(
                  collidable.bounds.x,
                  collidable.bounds.y,
                  collidable.bounds.width,
                  collidable.bounds.height
               );
               this.debugPhysics.endFill();
               if (collidable instanceof Tilemap) {
                  for (let tileY = 0; tileY < collidable.mapSize.y; tileY++) {
                     for (let tileX = 0; tileX < collidable.mapSize.x; tileX++) {
                        if (collidable.getTileAtLocalCoords(new Vec2(tileX, tileY))) {
                           this.debugPhysics.beginFill(0x000000, 0);
                           this.debugPhysics.drawRect(
                              tileX * collidable.tileSize.x,
                              tileY * collidable.tileSize.y,
                              collidable.tileSize.x,
                              collidable.tileSize.y
                           );
                           this.debugPhysics.endFill();
                        }
                     }
                  }
               }
            }
         }
      }
   }

   public getDisplayRoot(): PIXI.DisplayObject {
      return this.displayRoot;
   }
}