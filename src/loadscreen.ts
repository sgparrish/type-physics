import Context from "./graphics/context";
import Screen from "./engine/screen";
import GameScreen from "./gamescreen";

const LOAD_BAR_HEIGHT = 25;
const RESOURCE_LIST_NAME = "resources";
const RESOURCES_LOCATION = "res/resources.json";

export default class LoadScreen extends Screen {

   private preload: boolean;

   private loadingText: PIXI.Text;
   private loadingBar: PIXI.Graphics;

   private currentProgress: number;

   private _progress: (loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => void;
   private _error: (loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => void;
   private _complete: (loader: PIXI.loaders.Loader, resources: Object) => void;

   public setup(): void {

      this.preload = true;

      this.currentProgress = 0;

      // Build Scene graph
      this.loadingText = new PIXI.Text("0%",
         {
            fontFamily: "Arial",
            fontSize: LOAD_BAR_HEIGHT.toString() + "px",
            fill: "#FFFFFF"
         } as any);
      this.loadingText.anchor.set(0.5, 0.5);
      this.loadingBar = new PIXI.Graphics();
      this.root.addChild(this.loadingBar);
      this.root.addChild(this.loadingText);

      this.setupLoader();

      // Call preload
      PIXI.loader.add(RESOURCE_LIST_NAME, RESOURCES_LOCATION);
      PIXI.loader.load();
   }
   public update(delta: number): void {
   }
   public render(interpDelta: number): void {
      let dim = Context.getScreenDimensions();
      let quarter = [dim[0] * 0.25, dim[1] * 0.25];
      let half = [dim[0] * 0.50, dim[1] * 0.50];

      // Get top left coordinate
      let topLeft = [quarter[0], half[1] - LOAD_BAR_HEIGHT * 0.5];
      let totalWidth = half[0];
      let progressWidth = (this.currentProgress / 100) * totalWidth;

      // Generate bar with Graphics
      this.loadingBar.clear();

      this.loadingBar.lineStyle(2, 0xffffff, 1);
      this.loadingBar.beginFill(0x000000, 1);
      this.loadingBar.drawRect(topLeft[0], topLeft[1], totalWidth, LOAD_BAR_HEIGHT);
      this.loadingBar.endFill();

      this.loadingBar.lineStyle(2, 0xffffff, 1);
      this.loadingBar.beginFill(0x0000ff, 1);
      this.loadingBar.drawRect(topLeft[0], topLeft[1], progressWidth, LOAD_BAR_HEIGHT);
      this.loadingBar.endFill();

      this.loadingText.x = half[0];
      this.loadingText.y = half[1];
      this.loadingText.text = Math.round(this.currentProgress).toString() + "%"
   }
   public panic(delta: number): void {
   }
   public end(): void {
   }

   private setupLoader(): void {
      this._progress = (loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => {
         this.progress(loader, resource)
      }
      this._error = (loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => {
         this.error(loader, resource);
      }
      this._complete = (loader: PIXI.loaders.Loader, resources: Object) => {
         this.complete(loader, resources);
      }
      PIXI.loader.on('progress', this._progress);
      PIXI.loader.on('error', this._error);
      PIXI.loader.on('complete', this._complete);
   }

   private progress(loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource): void {
      if (!this.preload) {
         this.currentProgress = loader.progress;
         if (resource.texture) {
            resource.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
         }
      }
   }
   private error(loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource): void {
      console.error("Error loading resource");
   }
   private complete(loader: PIXI.loaders.Loader, resources: Object): void {
      if (this.preload) {
         console.log("Preloading complete.");
         this.preload = false;

         // Set up resources found from resource file
         let resources = PIXI.loader.resources[RESOURCE_LIST_NAME].data.resources;
         for (let index = 0; index < resources.length; index++) {
            let res = resources[index];
            PIXI.loader.add(res.name, res.file);
         }
         // Load these new resources
         PIXI.loader.load();
      } else {
         console.log("Loading Complete.");
         this.manager.setScreen(new GameScreen());
      }
   }
}