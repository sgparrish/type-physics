import ScreenManager from "./screenmanager";

/**
 * A Screen is a game update/render loop.
 * 
 * @abstract
 * @class Screen
 */
abstract class Screen {

   public simulationFps: number = 60;
   public manager: ScreenManager;
   public root: PIXI.Container;

   /** Called when starting the screen
    * 
    * @protected
    * @abstract
    * 
    * @memberOf Screen
    */
   public abstract setup(): void;
   /** Called each simulation frame
    * 
    * @protected
    * @abstract
    * @param {number} delta - milliseconds to simulate
    * 
    * @memberOf Screen
    */
   public abstract update(delta: number): void;
   /** Called each graphical frame
    * 
    * @protected
    * @abstract
    * @param {number} interpDelta - milliseconds to interpolate
    * 
    * @memberOf Screen
    */
   public abstract render(interpDelta: number): void;
   /** Called when severely behind in simulation
    * 
    * @protected
    * @abstract
    * @param {number} delta - milliseconds to simulate
    * 
    * @memberOf Screen
    */
   public abstract panic(delta: number): void;
   /** Called when exiting the screen
    * 
    * @protected
    * @abstract
    * 
    * @memberOf Screen
    */
   public abstract end(): void;
}
export default Screen;