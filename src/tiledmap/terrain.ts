export default class Terrain {

   public name: string;

   public tile: number;

   public constructor(terrain: any) {
      if (terrain.name && typeof terrain.name === "string")
         this.name = terrain.name;
      if (terrain.tile && typeof terrain.tile === "number")
         this.tile = terrain.tile;
   }
}