import Color from "./color";
import Context from "./context";
import Animation from "./animation";
import AnimationSet from "./animationset";

const ANIMS = ['idle', 'run'];
const DIRS = ['Down', 'Up', 'Left', 'Right'];

export default class CharacterModel {

   public static buildAnimationSet() {
      let animationSet: AnimationSet = {};

      let res = PIXI.loader.resources;
      let preSet = Animation.setFromJson(res['animation'].data);

      for (let anim of ANIMS) {
         for (let dir of DIRS) {
            animationSet[anim + dir] = this.renderAnimation(anim, dir, preSet);
         }
      }

      return animationSet;
   }

   private static renderAnimation(anim: string, dir: string, animSet: AnimationSet): Animation {
      let root = new PIXI.Container();

      let dirLower = dir.toLowerCase();

      let hair = PIXI.Sprite.fromFrame(dirLower + 'Picard');
      hair.tint = 0xbe6431;
      hair.tint = 0xffffff;
      let head = PIXI.Sprite.fromFrame(dirLower + 'Head');
      let armsAnimation = animSet[anim + dir + 'Arms'];
      let arms = new PIXI.Sprite(armsAnimation.textures[0]);
      let body = PIXI.Sprite.fromFrame(dirLower + 'Body');
      let legsAnimation = animSet[anim + dir + 'Legs'];
      let legs = new PIXI.Sprite(legsAnimation.textures[0]);


      // Setup scene graph
      root.addChild(legs);
      root.addChild(body);
      root.addChild(arms);
      root.addChild(head);
      root.addChild(hair);

      let animation = new Animation([], []);

      let frames = armsAnimation.frameCount;
      for (let frame = 0; frame < frames; frame++) {
         arms.texture = armsAnimation.textures[frame];
         legs.texture = legsAnimation.textures[frame];

         // Create render texture
         animation.textures.push(Context.renderToTexture(
            hair.width,
            hair.height,
            root));

         animation.durations.push(armsAnimation.durations[frame]);
      }

      // Clear display objects
      hair.destroy();
      head.destroy();
      arms.destroy();
      body.destroy();
      legs.destroy();
      root.destroy(false);

      return animation;
   }
}