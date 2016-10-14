import Entity from "../engine/entity";
import Vec2 from "../physics/vec2";
import Body from "../physics/body";
import RenderObject from "../graphics/renderobject";
import RenderLayer from "../graphics/renderlayer";
import Command from "../input/command";
import CommandMap from "../input/commandmap";
import CharacterModel from "./charactermodel";

const ACCELERATION = 100;
const FRICTION = 80;
const MAX_SPEED = 200;

export default class Player implements Entity {

   private body: Body;
   private sprite: PIXI.DisplayObject;

   public constructor() {
      let charModel = new CharacterModel();
      this.sprite = charModel.root;

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

      let direction = new Vec2(0, 0);
      if (CommandMap.getCommand(Command.LEFT) !== 0) {
         direction = direction.add(new Vec2(-1, 0));
      }
      if (CommandMap.getCommand(Command.RIGHT) !== 0) {
         direction = direction.add(new Vec2(1, 0));
      }
      if (CommandMap.getCommand(Command.UP) !== 0) {
         direction = direction.add(new Vec2(0, -1));
      }
      if (CommandMap.getCommand(Command.DOWN) !== 0) {
         direction = direction.add(new Vec2(0, 1));
      }
      if (direction.length() === 0) {
         this.body.velocity = this.body.velocity.reduce(new Vec2(FRICTION, FRICTION));
      } else {
         direction = direction.normalize();
         this.body.velocity = this.body.velocity.add(direction.times(ACCELERATION));
      }

      this.body.velocity = this.body.velocity.clamp(MAX_SPEED);
   }
   render(interpPercent: number): RenderObject[] {
      this.sprite.position.set(this.body.position.x - 4, this.body.position.y - 16);
      return [new RenderObject(this.sprite, this.body.bounds.top, RenderLayer.ROOM)];
   }
}