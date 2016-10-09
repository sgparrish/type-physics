import Collidable from "../physics/collidable";
import RenderObject from "../graphics/renderobject";

/** Represents a world object that exists on a Stage. Without a stage, an entity has no meaning
 * 
 * @export
 * @interface Entity
 */
export interface Entity {
   getCollidable(): Collidable;
   update(delta: number): void;
   render(interpPercent: number): RenderObject[];
}
export default Entity;