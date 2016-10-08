import Renderer from "./graphics/renderer";
import Wall from "./game/wall";
import Player from "./game/player";
import GameScreen from "./gamescreen";
import Stage from "./game/stage"

export default class PhysicsScreen extends GameScreen {

   private stage: Stage;
   private renderer: Renderer;

   protected setup(): void {
      this.stage = new Stage();
      this.stage.add(new Player(), true);
   }
   protected update(delta: number): void {
      this.stage.update(delta);
   }
   protected render(interpPercent: number): void {
      this.stage.render(interpPercent);
      Renderer.drawText("fps: " + Math.round(this.fps));
   }
   protected panic(delta: number): void {
   }
   protected end(): void {

   }
}