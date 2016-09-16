import Vec2 from "./physics/vec2";
import Collidable from "./physics/collidable";
import World from "./physics/world";
import Renderer from "./graphics/renderer";
import GameScreen from "./gamescreen";

export default class PhysicsScreen extends GameScreen {

   private _world: World;
   private _renderer: Renderer;

   protected setup(): void {
      this._world = new World();
      this._renderer = new Renderer(document.body);
      this._world.collidables.push(
         new Collidable(
            new Vec2(10, 10),
            new Vec2(20, 20),
            new Vec2(100, 100)
         ),
         new Collidable(
            new Vec2(200, 300),
            new Vec2(0, -4),
            new Vec2(100, 100)
         )
      );
   }
   protected update(delta: number): void {
      this._world.step(delta);
   }
   protected render(interpPercent: number): void {
      this._renderer.drawWorld(this._world);
      this._renderer.drawText("fps: " + this.fps.toFixed(0));
   }
   protected end(): void {

   }
}