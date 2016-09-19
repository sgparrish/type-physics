import Rectangle from "../physics/rectangle";
import World from "../physics/world";

export default class Renderer {

   public static canvas: HTMLCanvasElement;
   public static context: CanvasRenderingContext2D;

   public static _resize: () => void;

   public static initialize() {
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);
      this._resize = () => { this.resize() }
      this._resize();
      window.addEventListener('resize', this._resize);
   }

   public static resize(): void {
      let element = document.documentElement;
      this.canvas.width = element.clientWidth;
      this.canvas.height = element.clientHeight;
   }

   public static clear(): void {
      this.context.clearRect(
         0,
         0,
         this.canvas.width,
         this.canvas.height
      );
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
      for (let collidable of world.collidables) {
         this.drawRectangle(collidable.getRectangle());
         if (collidable.aabb !== null) {
            this.drawRectangle(collidable.aabb, '#ff0000');
         }
      }
   }

   public static drawText(text: string, color: string = "#000000"): void {
      this.context.strokeStyle = color;
      this.context.font = "12px Monospace";
      this.context.fillText(text, 0, 12);
   }

}