import Screen from "./engine/screen";
import Stage from "./engine/stage";
import Player from "./game/player";
import Kitchen from "./game/kitchen";

export default class GameScreen extends Screen {

   private gameStage: Stage;
   private uiRoot: PIXI.Container;

   public setup(): void {
      // Setup scene graph
      this.gameStage = new Stage(true);
      this.uiRoot = new PIXI.Container();

      this.root.addChild(this.gameStage.getDisplayRoot());
      this.root.addChild(this.uiRoot);

      this.gameStage.add(new Player());
      this.gameStage.add(new Kitchen());
   }
   public update(delta: number): void {
      this.gameStage.update(delta);
   }
   public render(interpDelta: number): void {
      this.gameStage.render(interpDelta);
   }
   public panic(delta: number): void {
      this.gameStage.update(delta);
   }
   public end(): void {
   }
}