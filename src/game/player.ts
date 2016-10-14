import Entity from "../engine/entity";
import Vec2 from "../physics/vec2";
import Body from "../physics/body";
import Direction from "../physics/direction";
import DirectionUtil from "../physics/directionutil";
import RenderObject from "../graphics/renderobject";
import RenderLayer from "../graphics/renderlayer";
import Command from "../input/command";
import CommandMap from "../input/commandmap";
import AnimatedSprite from "../graphics/animatedsprite";
import CharacterModel from "../graphics/charactermodel";

const MAX_SPEED = 120;

export default class Player implements Entity {

   private moving: boolean;
   private direction: Direction;
   private body: Body;
   private sprite: AnimatedSprite;

   public constructor() {
      this.moving = false;
      this.direction = Direction.DOWN;

      this.sprite = new AnimatedSprite(CharacterModel.buildAnimationSet(), "idleDown");

      this.body = new Body(
         new Vec2(4, 32),
         new Vec2(0, 0),
         new Vec2(16, 12)
      );
   }

   getCollidable(): Body {
      return this.body;
   }
   update(delta: number): void {

      let moveDirection = CommandMap.getDirection();
      this.body.velocity = moveDirection.times(MAX_SPEED);

      let newDirection = moveDirection.direction();
      let newMoving = newDirection !== Direction.NULL;

      let oldDirStr = DirectionUtil.directionToString(this.direction);
      let newDirStr = DirectionUtil.directionToString(newDirection);

      if (this.moving && !newMoving) {
         // Was moving, and no longer moving
         this.sprite.play('idle' + oldDirStr);
      } else if (!this.moving && newMoving) {
         // Wasn't moving, but now moving
         this.sprite.play('run' + newDirStr);
      } else if (this.moving && newMoving) {
         // Was moving, and still moving
         if (this.direction !== newDirection) {
            // Changed direction
            this.sprite.play('run' + newDirStr);
         } else {
            this.sprite.update(delta);
         }
      } else {
         this.sprite.update(delta);
      }

      this.moving = newMoving;
      this.direction = newDirection;

      this.sprite.update(delta);
   }
   render(interpPercent: number): RenderObject[] {
      this.sprite.position.set(this.body.position.x - 4, this.body.position.y - 16);
      return [new RenderObject(this.sprite, this.body.bounds.top, RenderLayer.ROOM)];
   }
}