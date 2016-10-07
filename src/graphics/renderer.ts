import Rectangle from "../physics/rectangle";
import World from "../physics/world";

export default class Renderer {

   public static canvas: HTMLCanvasElement;
   public static context: CanvasRenderingContext2D;

   private static _resize: () => void;

   public static initialize() {
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);
      this._resize = () => { this.resize() }
      this._resize();
      window.addEventListener('resize', this._resize);

      this.context.translate(0, 0);
      this.context.scale(2, 2);
   }

   public static resize(): void {
      let element = document.documentElement;
      this.canvas.width = element.clientWidth;
      this.canvas.height = element.clientHeight;
   }

   public static clear(): void {
      this.context.save();
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(
         0,
         0,
         this.canvas.width,
         this.canvas.height
      );
      this.context.restore();
   }

   public static drawRectangle(rect: Rectangle, color: string = "#000000"): void {
      this.context.strokeStyle = color;
      this.context.strokeRect(
         rect.x,
         rect.y,
         rect.width,
         rect.height
      );
   }

   public static drawWorld(world: World): void {
      this.clear();
      for (let body of world.bodies) {
         this.drawRectangle(body.getRectangle());
      }

      for (let tilemap of world.tilemaps) {
         let rectangles = tilemap.getRectangles();
         for (let rectangle of rectangles) {
            this.drawRectangle(rectangle, '#ff0000');
         }
      }
   }

   public static drawText(text: string, color: string = "#000000"): void {
      this.context.fillStyle = color;
      this.context.font = "12px Monospace";
      this.context.fillText(text, 0, 12);
   }
}
Renderer.initialize();