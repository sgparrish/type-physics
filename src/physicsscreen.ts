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
      this._stage.add(new Player(), true);
      this._stage.add(new Wall(300, 300), true);
      for (let i = 1; i < 6; i++) {
         this._stage.add(new Wall(i * 100, 0, true), true);
         this._stage.add(new Wall(i * 100, 600, true), true);
         this._stage.add(new Wall(0, i * 100, false), true);
         this._stage.add(new Wall(600, i * 100, false), true);
      }
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