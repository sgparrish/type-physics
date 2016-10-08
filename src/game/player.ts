import Vec2 from "../physics/vec2";
import PhysicsEntity from "./physicsentity";
import Command from "../input/command";
import CommandMap from "../input/commandmap";

export default class Player extends PhysicsEntity {

   public constructor() {
      super();
      this.position = new Vec2(128, 128);
      this.velocity = new Vec2(0, 0);
      this.dimension = new Vec2(48, 48);
   }
   public render(interpPercent: number) {

   }
   public update(delta: number) {
      if (CommandMap.getCommand(Command.LEFT) !== 0) {
         this.velocity = this.velocity.add(new Vec2(-64, 0));
      }
      if (CommandMap.getCommand(Command.RIGHT) !== 0) {
         this.velocity = this.velocity.add(new Vec2(64, 0));
      }
      if (CommandMap.getCommand(Command.UP) !== 0) {
         this.velocity = this.velocity.add(new Vec2(0, -64));
      }
      if (CommandMap.getCommand(Command.DOWN) !== 0) {
         this.velocity = this.velocity.add(new Vec2(0, 64));
      }
      if (CommandMap.getCommand(Command.DEBUG) !== 0) {
         this.velocity = new Vec2(0, 0);
      }
      this.velocity = this.velocity.clamp(196);
      // console.log(this.position.x + ", " + this.position.y + "; " + this.velocity.x + ", " + this.velocity.y);
   }
}