import Screen from "./screen";
import Context from "../graphics/context";

export default class ScreenManager {

   private previous: Screen;
   private current: Screen;
   private next: Screen;

   public fps: number;

   private framesThisSecond: number;
   private nextFpsUpdate: number;

   private simulationTimestep: number;
   private panicUpdates: number;

   private rafHandle: number;

   private lastFrameTimestamp: number;
   private frameDelta: number;

   private exitRequested: boolean;
   private _run: (timestamp: number) => void;

   public constructor(screen?: Screen) {
      if (screen) {
         this.setScreen(screen);
      }
   }

   public setScreen(screen: Screen) {
      if (this.current) {
         this.next = screen;
         this.stop();
      } else {
         this.current = screen;
         this.start();
      }
   }

   private advanceScreen() {
      this.current.end();
      this.previous = this.current;
      if (this.next) {
         this.current = this.next;
         this.next = null;
         this.start();
      }
      // Clean up old scene graph to prevent memory leaks
      this.previous.root.destroy(true);
      // Clear previous reference to allow garbage collection
      this.previous = null;
   }

   /** Start a screen's loop
    * 
    * @param {number} simulationFPS - The number of simulation ticks per second
    * @memberOf Screen
    */
   private start(): void {
      this.current.manager = this;
      this.current.root = new PIXI.Container();

      this.simulationTimestep = 1000 / this.current.simulationFps;
      this.panicUpdates = this.current.simulationFps * 2;

      this.fps = 60;
      this.framesThisSecond = 0;
      this.nextFpsUpdate = performance.now() + 1000;

      this.frameDelta = 0;
      this.lastFrameTimestamp = performance.now();

      this.exitRequested = false;

      this.current.setup();

      this._run = (timestamp: number) => { this.run(timestamp) }

      this.rafHandle = requestAnimationFrame(this._run);
   }

   /** Exit a screen's loop
    * 
    * @memberOf Screen
    */
   private stop(): void {
      this.exitRequested = true;
   }

   /** Perform one draw frame, with the approriate number of simulation ticks
    * This function is called by request animatino frame
    * 
    * @param {number} timestamp - the current timestamp
    * 
    * @memberOf Screen
    */
   private run(timestamp: number): void {
      if (this.exitRequested) {
         this.advanceScreen();
         return;
      }
      this.rafHandle = requestAnimationFrame(this._run);

      if (timestamp > this.nextFpsUpdate) {
         this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;
         this.framesThisSecond = 0;
         this.nextFpsUpdate = performance.now() + 1000;
      }
      this.framesThisSecond += 1;

      this.frameDelta += timestamp - this.lastFrameTimestamp;
      this.lastFrameTimestamp = timestamp;

      let numUpdates = 0;
      while (this.frameDelta >= this.simulationTimestep) {
         this.current.update(this.simulationTimestep);
         this.frameDelta -= this.simulationTimestep;

         numUpdates++;
         if (numUpdates > this.panicUpdates) {
            this.current.panic(this.frameDelta);
            this.frameDelta = 0; // skip to now
            break;
         }
      }
      this.current.render(this.frameDelta);
      Context.render(this.current.root);
   }
}