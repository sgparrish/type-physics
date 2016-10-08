abstract class GameScreen {

   private _fps: number;
   private framesThisSecond: number;
   private nextFpsUpdate: number;

   private simulationTimestep: number;
   private panicUpdates: number;

   private rafHandle: number;

   private lastFrameTimestamp: number;
   private frameDelta: number;

   private exitRequested: boolean;

   private _run: (timestamp: number) => void;

   public start(simulationFPS: number) {
      this.simulationTimestep = 1000 / simulationFPS;
      this.panicUpdates = simulationFPS * 2;

      this._fps = 60;
      this.framesThisSecond = 0;
      this.nextFpsUpdate = performance.now() + 1000;

      this.frameDelta = 0;
      this.lastFrameTimestamp = performance.now();

      this.exitRequested = false;

      this.setup();

      this._run = (timestamp: number) => { this.run(timestamp) }

      this.rafHandle = requestAnimationFrame(this._run);
   }

   public stop() {
      this.exitRequested = true;
   }

   public run(timestamp: number) {
      if (this.exitRequested) {
         this.end();
         return;
      }
      this.rafHandle = requestAnimationFrame(this._run);

      if (timestamp > this.nextFpsUpdate) {
         this._fps = 0.25 * this.framesThisSecond + 0.75 * this._fps;
         this.framesThisSecond = 0;
         this.nextFpsUpdate = performance.now() + 1000;
      }
      this.framesThisSecond += 1;

      this.frameDelta += timestamp - this.lastFrameTimestamp;
      this.lastFrameTimestamp = timestamp;

      let numUpdates = 0;
      while (this.frameDelta >= this.simulationTimestep) {
         this.update(this.simulationTimestep);
         this.frameDelta -= this.simulationTimestep;

         numUpdates++;
         if (numUpdates > this.panicUpdates) {
            this.panic(this.frameDelta);
            this.frameDelta = 0; // skip to now
            break;
         }
      }
      this.render(this.frameDelta / this.simulationTimestep);
   }

   public get fps(): number {
      return this._fps;
   }

   protected abstract setup(): void;
   protected abstract update(delta: number): void;
   protected abstract render(interpPercent: number): void;
   protected abstract panic(delta: number): void;
   protected abstract end(): void;
}
export default GameScreen;