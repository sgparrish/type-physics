export default Entity;
export interface Entity {
   getType(): string;
   render(interpPercent: number): void;
   update(delta: number): void;
}