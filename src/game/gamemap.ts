import Entity from "./entity";
import Vec2 from "../physics/vec2";
import Tilemap from "../physics/tilemap";
import RenderObject from "../graphics/renderobject";

export default class GameMap extends Tilemap implements Entity {

   public update(delta: number): void {
   }
   public render(interpPercent: number): RenderObject[] {
      return null;
   }

} 