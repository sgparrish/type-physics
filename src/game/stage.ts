import Entity from "./entity";
import PhysicsEntity from "./physicsentity";
import World from "../physics/world";
import Renderer from "../graphics/renderer";

export default class Stage implements Entity {

   private children: Entity[];
   private world: World;
   
   public constructor() {

      this.children = [];
      this.world = new World();
   }

   public add(child: Entity, isPhysicsEntity: boolean = false) {
      if(isPhysicsEntity) {
         this.world.add(child as PhysicsEntity|PhysicsEntity);
      }
      this.children.push(child);
   }

   public render(interpPercent: number) {
      Renderer.drawWorld(this.world);
      for (let child of this.children) {
         child.render(interpPercent);
      }
   }
   public update(delta: number) {
      this.world.step(delta);
      for (let child of this.children) {
         child.update(delta);
      }
   }
}