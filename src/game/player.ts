import Entity from "../engine/entity";
import Vec2 from "../physics/vec2";
import Body from "../physics/body";
import Direction from "../physics/direction";
import DirectionUtil from "../physics/directionutil";
import RenderLayer from "../graphics/renderlayer";
import Command from "../input/command";
import CommandMap from "../input/commandmap";
import AnimatedSprite from "../graphics/animatedsprite";
import CharacterModel from "../graphics/charactermodel";

const MAX_SPEED = 100;

export default class Player extends Entity {

   private moving: boolean;
   private direction: Direction;
   public body: Body;
   public display: AnimatedSprite;

   public constructor() {
      super();
      this.moving = false;
      this.direction = Direction.DOWN;

      this.display = new AnimatedSprite(CharacterModel.buildAnimationSet(), "idleDown");
      this.layer = 100;

      this.body = new Body(
         new Vec2(80, 80),
         new Vec2(0, 0),
         new Vec2(12, 10)
      );
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
         this.display.play('idle' + oldDirStr);
      } else if (!this.moving && newMoving) {
         // Wasn't moving, but now moving
         this.display.play('run' + newDirStr);
      } else if (this.moving && newMoving) {
         // Was moving, and still moving
         if (this.direction !== newDirection) {
            // Changed direction
            this.display.play('run' + newDirStr);
         } else {
            this.display.update(delta);
         }
      } else {
         this.display.update(delta);
      }

      this.moving = newMoving;
      this.direction = newDirection;

      this.display.update(delta);
   }
   render(interpPercent: number): void {
      this.depth = this.body.bounds.top;
      this.display.position.set(this.body.position.x - 6, this.body.position.y - 22);
   }
}