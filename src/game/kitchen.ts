import Vec2 from "../physics/vec2";
import Entity from "../engine/entity";
import Tilemap from "../physics/tilemap";
import RenderObject from "../graphics/renderobject";
import RenderLayer from "../graphics/renderlayer";
import Map from "../tiledmap/map";
import Layer from "../tiledmap/layer";

export default class Kitchen implements Entity {

   private mapModel: Map;

   private tileset: PIXI.Texture[];
   private tileCollision: boolean[];

   private mapRender: RenderObject[];
   private mapRows: PIXI.Container[][];
   private mapSprites: PIXI.Sprite[][][];

   private physicsMap: Tilemap;

   public constructor() {
      this.mapModel = new Map(PIXI.loader.resources['kitchen'].data);
      this.mapModel.tileWidth *= 4;
      this.mapModel.tileHeight *= 4;

      this.tileset = [];
      this.tileCollision = [];

      this.mapRender = [];
      this.mapRows = [];
      this.mapSprites = [];

      this.physicsMap = new Tilemap(
         new Vec2(0, 0),
         new Vec2(this.mapModel.width, this.mapModel.height),
         new Vec2(this.mapModel.tileWidth, this.mapModel.tileHeight)
      );

      this.unpackTileset();

      this.unpackLayers();
   }

   private unpackTileset(): void {
      // First get each tile out of the tileset
      for (let tileset of this.mapModel.tilesets) {
         // For this tileset, get the texture of this tileset
         let tileImage = PIXI.loader.resources[tileset.name].texture;
         // Iterate image X/Y
         let gid = 0;
         for (let tileY = 0; tileY < tileset.imageHeight; tileY += tileset.tileHeight) {
            for (let tileX = 0; tileX < tileset.imageWidth; tileX += tileset.tileWidth) {
               let tile = new PIXI.Texture(
                  tileImage.baseTexture,
                  new PIXI.Rectangle(
                     tileX,
                     tileY,
                     tileset.tileWidth,
                     tileset.tileHeight)
               );
               this.tileset[tileset.firstGid + gid] = tile;
               gid++;
            }
         }
         if (tileset.tileProperties) {
            for (let tileIndex in tileset.tileProperties) {
               if (tileset.tileProperties[tileIndex].collides) {
                  this.tileCollision[tileset.firstGid + parseInt(tileIndex)] = true;
               }
            }
         }
      }
   }

   private unpackLayers(): void {
      for (let layerIndex in this.mapModel.layers) {
         let layer = this.mapModel.layers[layerIndex];

         let renderLayer: RenderLayer = null;
         // Identify render layer from layer properties
         if (layer.properties.layer == "room") {
            renderLayer = RenderLayer.ROOM;
         } else if (layer.properties.layer == "floor") {
            renderLayer = RenderLayer.FLOOR;
         }

         if (renderLayer !== null) {
            this.mapRows[renderLayer] = [];
            this.mapSprites[renderLayer] = [];

            // Generate layer rows and sprites
            let tileIndex = 0;
            for (let tileY = 0; tileY < layer.height; tileY++) {
               let spriteY = tileY * this.mapModel.tileHeight;
               this.mapRows[renderLayer][tileY] = new PIXI.Container();
               this.mapRender.push(new RenderObject(this.mapRows[renderLayer][tileY], spriteY, renderLayer));
               this.mapSprites[renderLayer][tileY] = [];
               for (let tileX = 0; tileX < layer.width; tileX++) {
                  // Graphics
                  let gid = layer.data[tileIndex];
                  let spriteX = tileX * this.mapModel.tileWidth;
                  let sprite = new PIXI.Sprite(this.tileset[gid]);
                  sprite.position.set(spriteX, spriteY);
                  sprite.scale.set(4, 4);
                  this.mapSprites[renderLayer][tileY][tileX] = sprite;
                  this.mapRows[renderLayer][tileY].addChild(sprite);
                  tileIndex++;

                  // Collision
                  if (this.tileCollision[gid]) {
                     this.physicsMap.setTileAtLocalCoords(
                        new Vec2(tileX, tileY),
                        true)
                        ;
                  }
               }
            }
         }
      }
   }

   getCollidable(): Tilemap {
      return this.physicsMap;
   }
   update(delta: number): void {
   }
   render(interpPercent: number): RenderObject[] {
      return this.mapRender;
   }
}