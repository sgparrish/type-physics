import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import CollisionListener from "./collisionlistener";

abstract class Collidable {
   public enabled: boolean;
   public bounds: Rectangle;
   public listener: CollisionListener;

   public constructor() {
      this.enabled = true;
      this.bounds = new Rectangle(0, 0, 0, 0);
      this.listener = null;
   }

   public get position(): (Vec2) {
      return this.bounds.position;
   }
   public set position(pos: Vec2) {
      this.bounds = new Rectangle(
         pos.x,
         pos.y,
         this.bounds.width,
         this.bounds.height);
   }

   public get dimension(): (Vec2) {
      return this.bounds.dimension;
   }
   public set dimension(dim: Vec2) {
      this.bounds = new Rectangle(
         this.bounds.x,
         this.bounds.y,
         dim.x,
         dim.y);
   }

   public reportCollision(collision: any) {
      this.listener.onCollision(collision);
   }
}
export default Collidable;