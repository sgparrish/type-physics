import Animation from "./animation";
import AnimationSet from "./animationset";

export default class AnimatedSprite extends PIXI.Sprite {

   private currentTime: number;
   private currentFrame: number;

   private currentAnimation: Animation;
   private animationSet: AnimationSet;

   public constructor(animationSet: AnimationSet, startAnimation?: string) {
      super();

      this.animationSet = animationSet;
      if (startAnimation) {
         this.play(startAnimation);
      }
   }

   public play(animation: string) {
      let newAnimation = this.animationSet[animation];
      if (newAnimation) {
         this.currentTime = 0;
         this.currentFrame = 0;
         this.currentAnimation = newAnimation;
         this.update(0);
      }
   }

   public update(delta: number): void {
      // Only run with an actual animation set
      if (this.currentAnimation) {
         this.currentTime += delta;

         // Catch up to correct frame
         let duration = this.currentAnimation.durations[this.currentFrame];
         while (this.currentTime > duration) {
            this.currentTime -= duration;
            this.currentFrame += 1 % this.currentAnimation.frames;
            duration = this.currentAnimation.durations[this.currentFrame];
         }

         // Display frame
         this.texture = this.currentAnimation.textures[this.currentFrame];
      }
   }
}