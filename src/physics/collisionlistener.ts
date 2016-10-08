import Vec2 from "./vec2";
import Body from "./body";
import Collision from "./collision";

export default CollisionListener;
interface CollisionListener {
   onCollision(collision: Collision): void;
}