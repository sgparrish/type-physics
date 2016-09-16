import Rectangle from "../physics/rectangle";
import World from "../physics/world";

export default class Renderer {

   private _body: HTMLElement;
   private _canvas: HTMLCanvasElement;
   private _context: CanvasRenderingContext2D;

   private _resize;

   public constructor(body: HTMLElement) {
      this._body = body;
      this._canvas = document.createElement("canvas");
      this._context = this._canvas.getContext("2d");
      document.body.appendChild(this._canvas);
      this._resize = () => { this.resize() }
      this._resize();
      window.addEventListener('resize', this._resize);
   }

   private resize(): void {
      let element = document.documentElement;
      this._canvas.width = element.clientWidth;
      this._canvas.height = element.clientHeight;
   }

   public clear(): void {
      this._context.clearRect(
         0,
         0,
         this._canvas.width,
         this._canvas.height
      );
   }

   public drawRectangle(rect: Rectangle, color?: string): void {
      if (typeof color !== 'undefined') {
         this._context.strokeStyle = color;
      } else {
         this._context.strokeStyle = "#000000";
      }
      this._context.strokeRect(
         rect.x,
         rect.y,
         rect.width,
         rect.height
      );
   }

   public drawWorld(world: World): void {
      this.clear();
      for (let collidable of world.collidables) {
         this.drawRectangle(collidable.getRectangle());
         if (collidable.aabb !== null) {
            this.drawRectangle(collidable.aabb, '#ff0000');
         }
      }
   }

   public drawText(text: string, color?: string): void {
      if (typeof color !== 'undefined') {
         this._context.fillStyle = color;
      } else {
         this._context.fillStyle = "#000000";
      }
      this._context.font = "12px Monospace";
      this._context.fillText(text, 0, 12);
   }

}