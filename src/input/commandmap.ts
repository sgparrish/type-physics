import KeyMap from "./keymap";
import Command from "./command";

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

}
CommandMap.initialize();
CommandMap.loadDeafults();