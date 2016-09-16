import Vec2 from "./vec2";
import Collidable from "./collidable";

export default CollisionListener;
interface CollisionListener {
   collision(time: number, normal: Vec2, other: Collidable): void;
}