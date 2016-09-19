import Vec2 from "../physics/vec2";
import Collidable from "../physics/collidable";
import CollisionListener from "../physics/collisionlistener";
import Entity from "./entity";
import PhysicsEntity from "./physicsentity";

export default class Player extends PhysicsEntity {

   public constructor(x, y) {
      super("Player");
      this.position = new Vec2(x, y);
      this.velocity = new Vec2(0, -10);
      this.dimension = new Vec2(100, 100);
      this.listener = this;
   }

   public collision(time: number, normal: Vec2, other: Collidable) {
      console.log(normal);
      let entity = other as PhysicsEntity;

      if (entity.getType() === "Wall") {
         this.velocity = new Vec2(0, 0);
      }
   }

   public render(interpPercent: number) {

   }
   public update(delta: number) {
      
   }

}