"use strict";

/** PIXI.DisplayObject.translate
 *
 * This method moves by x, y
 *
 * @param {number} x
 * @param {number} y
 */
PIXI.DisplayObject.prototype.translate = function (x, y) {
   this.position.x += x * this.scale.x;
   this.position.y += y * this.scale.y;
};

/** PIXI.DisplayObject.zoom
 *
 * This method zooms into or out of the point at x, y by factor
 *
 * @param {number} x
 * @param {number} y
 * @param {number} factor
 */
PIXI.DisplayObject.prototype.zoom = function (x, y, factor, maxScale) {
   if (this.scale.x * factor >= maxScale) {
      factor = maxScale / this.scale.x;
   }
   this.position.x += x * this.scale.x;
   this.position.y += y * this.scale.y;
   this.scale.x *= factor;
   this.scale.y *= factor;
   this.position.x -= x * this.scale.x;
   this.position.y -= y * this.scale.y;
};

/** PIXI.DisplayObject.applyTransformation
 *
 * This method takes an x, y value in screen coordinates, and translates
 * to local coordinates
 *
 * @param {number} x
 * @param {number} y
 */
PIXI.DisplayObject.prototype.applyTransform = function (x, y) {
   return this.worldTransform.applyInverse(new PIXI.Point(x, y));
};

