import AnimationSet from "./animationset";

export default class Animation {
   public textures: PIXI.Texture[];
   public durations: number[];

   public constructor(textures: PIXI.Texture[], durations: number[]) {
      this.textures = textures;
      this.durations = durations;
   }

   public get frameCount(): number {
      return this.textures.length;
   }

   public static fromJson(json: any): Animation {
      let anim = new Animation([], []);
      if (json.frameNames && json.frameNames instanceof Array) {
         for (let frameName of json.frameNames) {
            anim.textures.push(PIXI.Texture.fromFrame(frameName));
         }
      }
      if (json.frameDurations) {
         if (json.frameDurations instanceof Array) {
            anim.durations = json.frameDurations;
         } else if (typeof json.frameDurations === "number") {
            for (let index = 0; index < anim.textures.length; index++) {
               anim.durations.push(json.frameDurations);
            }
         }
      }
      if (anim.textures.length == 0 || anim.durations.length == 0 ||
         anim.textures.length != anim.durations.length) {

         anim = null;
      }
      return anim;
   }

   public static setFromJson(json: any): AnimationSet {
      let set: AnimationSet = {};

      for (let name in json) {
         let animation = Animation.fromJson(json[name]);
         if (animation) {
            set[name] = animation;
         }
      }

      return set;
   }

}