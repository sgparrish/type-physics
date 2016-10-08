export default Entity;
export interface Entity {
   render(interpPercent: number): void;
   update(delta: number): void;
}