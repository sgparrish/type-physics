import KeyMap from "./keymap";
import Command from "./command";
import Vec2 from "../physics/vec2";

export default class CommandMap {

   private static commandKeys: string[][];

   public static initialize() {
      this.commandKeys = [];
      for (let index = 0; index < Command.LENGTH; index++) {
         this.commandKeys[index] = [];
      }
   }

   public static loadDeafults() {
      this.commandKeys[Command.LEFT] = ['KeyA', 'ArrowLeft'];
      this.commandKeys[Command.RIGHT] = ['KeyD', 'ArrowRight'];
      this.commandKeys[Command.UP] = ['KeyW', 'ArrowUp'];
      this.commandKeys[Command.DOWN] = ['KeyS', 'ArrowDown'];
      this.commandKeys[Command.DEBUG] = ['Space'];
   }

   public static getCommand(command: Command): number {
      let keys = this.commandKeys[command];
      for (let key of keys) {
         if (KeyMap.getKey(key)) {
            return 1.0;
         }
      }
      return 0.0;
   }

   public static getDirection(): (Vec2) {
      let x = this.getCommand(Command.RIGHT) - this.getCommand(Command.LEFT);
      let y = this.getCommand(Command.DOWN) - this.getCommand(Command.UP);
      let direction = new Vec2(x, y);

      return direction.clamp(1);
   }

}
CommandMap.initialize();
CommandMap.loadDeafults();