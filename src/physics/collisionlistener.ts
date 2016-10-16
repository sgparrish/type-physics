import Vec2 from "./vec2";
import Body from "./body";

export default CollisionListener;
interface CollisionListener {
   onCollision(collision: any): void;
}