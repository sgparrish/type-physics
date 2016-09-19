import Entity from "./entity";
import Vec2 from "../physics/vec2";
import Collidable from "../physics/collidable";
import CollisionListener from "../physics/collisionlistener";

abstract class PhysicsEntity extends Collidable implements Entity, CollisionListener {

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
   public abstract collision(time: number, normal: Vec2, other: Collidable);
}
export default PhysicsEntity;