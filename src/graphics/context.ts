export default class Context {

   public static renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
   private static _resize: () => void;

   public static initialize() {
      let dim = this.getScreenDimensions();
      this.renderer = PIXI.autoDetectRenderer(dim[0], dim[1]);
      this.renderer.backgroundColor = 0xeeeeee;

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
}