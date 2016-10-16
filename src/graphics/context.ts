import Color from "./color";

export default class Context {

   private static renderer: PIXI.WebGLRenderer;
   private static utilRenderer: PIXI.CanvasRenderer;
   private static _resize: () => void;

   public static initialize() {
      let dim = this.getScreenDimensions();
      this.renderer = new PIXI.WebGLRenderer(dim[0], dim[1]);
      this.utilRenderer = new PIXI.CanvasRenderer(1, 1, {
         transparent: true
      });
      this.renderer.backgroundColor = 0x000000;

      document.body.appendChild(this.renderer.view);

      this._resize = () => { this.resize() };
      window.addEventListener('resize', this._resize);
   }

   public static getScreenDimensions(): [number, number] {
      var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      return [w, h];
   }

   public static render(obj: PIXI.DisplayObject) {
      this.renderer.render(obj);
   }

   private static resize(): void {
      var dim = this.getScreenDimensions();

      // Resize renderer and then re-render
      this.renderer.resize(dim[0], dim[1]);
   }

   public static recolor(texture: PIXI.Texture, oldColors: Color[], newColors: Color[]): PIXI.Texture {
      let sprite = new PIXI.Sprite(texture);

      // Setup renderer for recolor
      this.utilRenderer.resize(texture.width, texture.height);

      // Draw sprite to texture and get pixel data
      this.utilRenderer.render(sprite);
      let canvasContext = this.utilRenderer.view.getContext('2d')
      let imageData = canvasContext.getImageData(0, 0, texture.width, texture.height);
      let data = imageData.data;

      // Manipulate color array
      for (let i = 0; i < data.length; i += 4) {
         let r = data[i];
         let g = data[i + 1];
         let b = data[i + 2];
         let a = data[i + 3];

         for (let colorIdx = 0; colorIdx < oldColors.length; colorIdx++) {
            let oldColor = oldColors[colorIdx];
            let newColor = newColors[colorIdx];

            if (oldColor.equals(r, g, b)) {
               data[i] = newColor.r;
               data[i + 1] = newColor.g;
               data[i + 2] = newColor.b;
            }
         }
      }

      // Replace color array
      canvasContext.putImageData(imageData, 0, 0);
      let newTexture = PIXI.Texture.fromCanvas(this.utilRenderer.view, PIXI.SCALE_MODES.NEAREST);

      // Clean up
      sprite.destroy();

      return newTexture;
   }

   public static renderToTexture(width: number, height: number, obj: PIXI.DisplayObject) {
      let renderTexture = PIXI.RenderTexture.create(width, height, PIXI.SCALE_MODES.NEAREST);
      
      this.renderer.render(obj, renderTexture);

      return renderTexture;
   }
}