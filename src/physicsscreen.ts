import Vec2 from "./physics/vec2";
import Collidable from "./physics/collidable";
import World from "./physics/world";
import Renderer from "./graphics/renderer";
import Wall from "./game/wall";
import Player from "./game/player";
import GameScreen from "./gamescreen";
import Stage from "./game/stage"

export default class PhysicsScreen extends GameScreen {

   private _stage: Stage;
   private _renderer: Renderer;

   protected setup(): void {
      this._stage = new Stage();
      let p = new Player(0, 300);
      let w = new Wall(0, 0);
      this._stage.add(p, true);
      this._stage.add(w, true);
      Renderer.initialize();
   }
   protected update(delta: number): void {
      this._stage.update(delta);
   }
   protected render(interpPercent: number): void {
      this._stage.render(interpPercent);
      Renderer.drawText("fps: " + Math.round(this.fps));
   }
   protected end(): void {

   }
}