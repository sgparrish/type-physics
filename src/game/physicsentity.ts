import Entity from "./entity";
import Vec2 from "../physics/vec2";
import Body from "../physics/body";
import CollisionListener from "../physics/collisionlistener";

abstract class PhysicsEntity extends Body implements Entity, CollisionListener {

   private type: string;

   public constructor(type: string) {
      super(new Vec2(0, 0), new Vec2(0, 0), new Vec2(0, 0));
      this.type = type;
   }

   public getType():string {
      return this.type;
   }
   public abstract render(interpPercent: number): void;
   public abstract update(delta: number): void;
   public abstract collision(normal: Vec2, other: Body): void;
}
export default PhysicsEntity;