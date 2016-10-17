import Vec2 from "../physics/vec2";
import Entity from "../engine/entity";
import Tilemap from "../physics/tilemap";
import DirectionSet from "../physics/directionset";
import Map from "../tiledmap/map";
import Layer from "../tiledmap/layer";
import Plane from "./plane";
import Context from "../graphics/context";

export default class Level {

   private mapModel: Map;

   private tileset: PIXI.Texture[];
   private tileCollision: boolean[];

   public entities: Entity[];

   private physicsMap: Tilemap;

   public constructor() {
      this.mapModel = new Map(PIXI.loader.resources['ship-planes'].data);

      this.tileset = [];
      this.tileCollision = [];

      this.entities = [];

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
               let tileIdx = parseInt(tileIndex);
               if (tileset.tileProperties[tileIdx].collision) {
                  this.tileCollision[tileset.firstGid + tileIdx] = true;
               }
            }
         }
      }
   }

   private unpackLayers(): void {
      for (let layerIndex in this.mapModel.layers) {
         let layerIdx = parseInt(layerIndex);
         let layer = this.mapModel.layers[layerIdx];

         let entity: Entity;

         // Read layer properties
         if (layer.properties && layer.properties.type) {
            let type: string = (layer.properties.type as string).toLowerCase();
            if (type === "plane") {
               entity = this.unpackPlane(layerIdx, layer);
            } else if (type === "entity") {

            }
         } else {
            // default to plane
            entity = this.unpackPlane(layerIdx, layer);
         }

         // Unpack collision
         if (layer.properties && layer.properties.collision !== undefined) {
            entity.body = this.unpackCollision(layer);
         }

         if (entity) {
            this.entities.push(entity);
         }
      }
   }

   private unpackPlane(layerIdx: number, layer: Layer): Entity {
      let plane = new Plane(layerIdx);

      // Read properties
      if (layer.properties && layer.properties.minAlpha !== "undefined") {
         plane.minAlpha = layer.properties.minAlpha;
      }

      // Bounds for depth calculation
      let top = Number.MAX_VALUE;
      let bottom = Number.MIN_VALUE;
      let left = Number.MAX_VALUE;
      let right = Number.MIN_VALUE;
      let tileIdx = 0;
      for (let tileY = 0; tileY < layer.height; tileY++) {
         for (let tileX = 0; tileX < layer.width; tileX++) {
            let gid = layer.data[tileIdx];
            if (gid !== 0) {
               // Update bounds
               top = Math.min(top, tileY);
               bottom = Math.max(bottom, tileY);
               left = Math.min(left, tileX);
               right = Math.max(right, tileX);
            }
            tileIdx += 1;
         }
      }

      // Display Container
      let root = new PIXI.Container();
      tileIdx = 0;
      for (let tileY = 0; tileY < layer.height; tileY++) {
         for (let tileX = 0; tileX < layer.width; tileX++) {
            let gid = layer.data[tileIdx];

            if (gid !== 0) {
               // Calculate sprite coordinates
               let spriteX = (tileX - left) * this.mapModel.tileWidth;
               let spriteY = (tileY - top) * this.mapModel.tileHeight;

               // Add texture to display contanier
               let sprite = new PIXI.Sprite(this.tileset[gid]);
               sprite.position.set(spriteX, spriteY);
               root.addChild(sprite);
            }
            tileIdx += 1;
         }
      }

      // Render container to texture
      let width = ((right - left) + 1) * this.mapModel.tileWidth;
      let height = ((bottom - top) + 1) * this.mapModel.tileHeight;
      let texture = Context.renderToTexture(width, height, root);
      root.destroy({ children: true } as any);

      let x = left * this.mapModel.tileWidth;
      let y = top * this.mapModel.tileHeight;

      let sprite = new PIXI.Sprite(texture);
      sprite.position.set(x, y);
      plane.display = sprite;
      plane.depth = y + height;

      // Read depth properties to overwrite if necessary
      if (layer.properties && layer.properties.depth !== undefined && typeof layer.properties.depth === "number") {
         plane.depth = layer.properties.depth;
      } else if (layer.properties && layer.properties.depthAdjust !== undefined && typeof layer.properties.depthAdjust === "number") {
         plane.depth += layer.properties.depthAdjust;
      }

      return plane;
   }

   private unpackCollision(layer: Layer): Tilemap {
      let tilemap = new Tilemap(
         new Vec2(0, 0),
         new Vec2(this.mapModel.width, this.mapModel.height),
         new Vec2(this.mapModel.tileWidth, this.mapModel.tileHeight)
      );

      let tileIdx = 0;
      for (let tileY = 0; tileY < layer.height; tileY++) {
         for (let tileX = 0; tileX < layer.width; tileX++) {
            let gid = layer.data[tileIdx];

            if (gid === 0) {
               tilemap.setTileAtLocalCoords(new Vec2(tileX, tileY), true);
            } else {
               tilemap.setTileAtLocalCoords(new Vec2(tileX, tileY), false);
            }

            tileIdx += 1;
         }
      }

      return tilemap;
   }
}