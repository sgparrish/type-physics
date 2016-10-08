import GameScreen from "./gamescreen";
import Stage from "./game/stage";
import Player from "./game/player";
import DebugRenderer from "./graphics/debugrenderer";

export default class PhysicsScreen extends GameScreen {

   private stage: Stage;

   protected setup(): void {
      this.stage = new Stage();
      this.stage.add(new Player());
   }
   protected update(delta: number): void {
      this.stage.update(delta);
   }
   protected render(interpPercent: number): void {
      this.stage.preRender(interpPercent);
      DebugRenderer.drawText("fps: " + Math.round(this.fps));
   }
   protected panic(delta: number): void {
   }
   protected end(): void {

   }
}