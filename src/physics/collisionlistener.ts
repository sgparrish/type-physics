import Vec2 from "./vec2";
import Body from "./body";

export default CollisionListener;
interface CollisionListener {
   collision(noraml: Vec2, other: Body): void;
}