import RenderObject from "../graphics/renderobject";

export default Entity;
export interface Entity {
   update(delta: number): void;
   render(interpPercent: number): RenderObject[];
}