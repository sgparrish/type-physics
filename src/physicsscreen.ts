import Vec2 from "./physics/vec2";
import Collidable from "./physics/collidable";
import World from "./physics/world";
import Renderer from "./graphics/renderer";
import Wall from "./game/wall";
import Player from "./game/player";
import {GameScreen} from "./gamescreen";

export default class PhysicsScreen extends GameScreen {

   private _world: World;
   private _renderer: Renderer;

   protected setup(): void {
      this._world = new World();
      this._renderer = new Renderer(document.body);
      let p = new Player(0, 300);
      let w = new Wall(0, 0);
      this._world.collidables.push(w, p);
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