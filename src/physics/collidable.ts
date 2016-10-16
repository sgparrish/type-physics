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

   public reportCollision(collision: any) {
      this.listener.onCollision(collision);
   }
}
export default Collidable;