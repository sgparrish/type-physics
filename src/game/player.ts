import Vec2 from "../physics/vec2";
import Collidable from "../physics/collidable";
import CollisionListener from "../physics/collisionlistener";
import Entity from "./entity";
import PhysicsEntity from "./physicsentity";
import Command from "../input/command";
import CommandMap from "../input/commandmap";

export default class Player extends PhysicsEntity {

   public constructor(x, y) {
      super("Player");
      this.position = new Vec2(x, y);
      this.velocity = new Vec2(-2.34, -2.35);
      this.dimension = new Vec2(100, 100);
      this.listener = this;
   }

   public collision(time: number, normal: Vec2, other: Collidable) {
      let entity = other as PhysicsEntity;

      let ortho = normal.rotate90();
      let normalComponent = this.velocity.dot(normal);
      let orthoComponent = this.velocity.dot(ortho);

      if (entity.getType() === "Wall") {
         orthoComponent *= 0.5;
         normalComponent *= -0.5;
         this.velocity = normal.times(normalComponent).add(ortho.times(orthoComponent));
      }
   }

   public render(interpPercent: number) {

   }
   public update(delta: number) {
      this.velocity = this.velocity.add(new Vec2(-5, -5));
      if (CommandMap.getCommand(Command.LEFT) !== 0) {
         this.velocity = this.velocity.add(new Vec2(-5, 0));
      }
      if (CommandMap.getCommand(Command.RIGHT) !== 0) {
         this.velocity = this.velocity.add(new Vec2(5, 0));
      }
      if (CommandMap.getCommand(Command.UP) !== 0) {
         this.velocity = this.velocity.add(new Vec2(0, -5));
      }
      if (CommandMap.getCommand(Command.DOWN) !== 0) {
         this.velocity = this.velocity.add(new Vec2(0, 5));
      }
      if (CommandMap.getCommand(Command.DEBUG) !== 0) {
         this.velocity = new Vec2(0, 0);
      }
      this.velocity = this.velocity.clamp(15);
      console.log(this.position.x + ", " + this.position.y + "; " + this.velocity.x + ", " + this.velocity.y);
   }

}