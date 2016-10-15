import Screen from "./engine/screen";
import Stage from "./engine/stage";
import Player from "./game/player";
import Level from "./game/level";

export default class GameScreen extends Screen {

   private gameStage: Stage;
   private uiRoot: PIXI.Container;

   private fpsText: PIXI.Text;

   public setup(): void {
      // Initialize scene componenets
      this.gameStage = new Stage(false);
      this.uiRoot = new PIXI.Container();

      this.fpsText = new PIXI.Text("0%",
         {
            fontFamily: "Arial",
            fontSize: "12px",
            fill: "#FFFFFF",
            stroke: "#000000",
            strokeThickness: 2
         } as any);
      this.fpsText.position.set(512, 0);

      // Setup scene graph
      this.root.addChild(this.gameStage.getDisplayRoot());
      this.root.addChild(this.uiRoot);

      this.uiRoot.addChild(this.fpsText);

      this.gameStage.add(new Player());
      this.gameStage.add(new Level());
   }
   public update(delta: number): void {
      this.gameStage.update(delta);
   }
   public render(interpDelta: number): void {
      this.fpsText.text = Math.round(this.manager.fps).toString();
      this.gameStage.render(interpDelta);
   }
   public panic(delta: number): void {
      this.gameStage.update(delta);
   }
   public end(): void {
   }
}