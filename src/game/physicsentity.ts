import Entity from "./entity";
import Vec2 from "../physics/vec2";
import Body from "../physics/body";
import Collision from "../physics/collision";
import CollisionListener from "../physics/collisionlistener";
import RenderObject from "../graphics/renderobject";

abstract class PhysicsEntity extends Body implements Entity, CollisionListener {

   public constructor() {
      super(new Vec2(0, 0), new Vec2(0, 0), new Vec2(0, 0));
      this.listener = this;
   }

   public abstract update(delta: number): void;
   public abstract render(interpPercent: number): RenderObject[];
   public onCollision(collision: Collision): void {
   }
}
export default PhysicsEntity;