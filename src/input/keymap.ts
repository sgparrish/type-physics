export default class KeyMap {

   private static _keyup: (event: KeyboardEvent) => void;
   private static _keydown: (event: KeyboardEvent) => void;

   public static initialize() {
      this._keyup = (event: KeyboardEvent) => { this.keyup(event) }
      this._keydown = (event: KeyboardEvent) => { this.keydown(event) }
      window.addEventListener("keyup", this._keyup);
      window.addEventListener("keydown", this._keydown);
   }

   private static keyup(event: KeyboardEvent) {
      this[(event as any).code] = false;
   }

   private static keydown(event: KeyboardEvent) {
      this[(event as any).code] = true;
   }

   public static getKey(key: string) {
      return this[key] === true;
   }
}
KeyMap.initialize();