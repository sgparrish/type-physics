import Entity from "./entity";
import Collidable from "../physics/collidable";
import World from "../physics/world";
import RenderObject from "../graphics/renderobject";
import DebugRenderer from "../graphics/debugrenderer";

export default class Stage implements Entity {

   private children: Entity[];
   private world: World;

   public constructor() {
      this.children = [];
      this.world = new World();
   }

   public add(child: Entity) {
      if (child instanceof Collidable) {
         this.world.add(child as any);
      }
      this.children.push(child);
   }

   public update(delta: number) {
      this.world.step(delta);
      for (let child of this.children) {
         child.update(delta);
      }
   }
   public preRender(interpPercent: number) {
      for (let child of this.children) {
         child.preRender(interpPercent);
      }
      for (let child of this.children) {

      }
      DebugRenderer.drawWorld(this.world);
   }
   public getRenderObjects(): RenderObject[] {
      return null;
   }
}