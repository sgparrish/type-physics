import Entity from "./entity";
import BaseEntity from "./baseentity";
import PhysicsEntity from "./physicsentity";
import World from "../physics/world";
import Renderer from "../graphics/renderer";

export default class Stage extends BaseEntity {

   private _children: Entity[];
   private _world: World;
   
   public constructor() {
      super("Stage");

      this._children = [];
      this._world = new World();
   }

   public add(child: Entity, isPhysicsEntity: boolean = false) {
      if(isPhysicsEntity) {
         this._world.add(child as PhysicsEntity);
      }
      this._children.push(child);
   }

   public render(interpPercent: number) {
      Renderer.drawWorld(this._world);
      for (let child of this._children) {
         child.render(interpPercent);
      }
   }
   public update(delta: number) {
      this._world.step(delta);
      for (let child of this._children) {
         child.update(delta);
      }
   }
}