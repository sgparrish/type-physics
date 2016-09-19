import Entity from "./entity";

abstract class BaseEntity implements Entity {

   private type: string;

   public constructor(type: string) {
      this.type = type;
   }

   public getType(): string {
      return this.type;
   }
   public abstract render(interpPercent: number): void;
   public abstract update(delta: number): void;
}
export default BaseEntity;