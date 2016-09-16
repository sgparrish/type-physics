export default GameScreen;
abstract class GameScreen {

   private _fps: number;
   private _framesThisSecond: number;
   private _nextFpsUpdate: number;

   private _simulationTimestep: number;
   private _panicUpdates: number;

   private _rafHandle: number;

   private _lastFrameTimestamp: number;
   private _frameDelta: number;

   private _exitRequested: boolean;

   private _run;

   public start(simulationFPS: number) {
      this._simulationTimestep = 1000 / simulationFPS;
      this._panicUpdates = simulationFPS * 2;

      this._fps = 60;
      this._framesThisSecond = 0;
      this._nextFpsUpdate = performance.now() + 1000;

      this._frameDelta = 0;
      this._lastFrameTimestamp = performance.now();

      this._exitRequested = false;

      this.setup();

      this._run = (timestamp: number) => { this.run(timestamp) }

      this._rafHandle = requestAnimationFrame(this._run);
   }

   public stop() {
      this._exitRequested = true;
   }

   public run(timestamp: number) {
      if (this._exitRequested) {
         this.end();
         return;
      }
      this._rafHandle = requestAnimationFrame(this._run);

      if (timestamp > this._nextFpsUpdate) {
         this._fps = 0.25 * this._framesThisSecond + 0.75 * this._fps;
         this._framesThisSecond = 0;
         this._nextFpsUpdate = performance.now() + 1000;
      }
      this._framesThisSecond += 1;

      this._frameDelta += timestamp - this._lastFrameTimestamp;
      this._lastFrameTimestamp = timestamp;

      let numUpdates = 0;
      while (this._frameDelta >= this._simulationTimestep) {
         this.update(this._simulationTimestep);
         this._frameDelta -= this._simulationTimestep;

         numUpdates++;
         if (numUpdates > this._panicUpdates) {
            break;
         }
      }
      this.render(this._frameDelta / this._simulationTimestep);
   }

   public get fps(): number {
      return this._fps;
   }

   protected abstract setup(): void;
   protected abstract update(delta: number): void;
   protected abstract render(interpPercent: number): void;
   protected abstract end(): void;
}