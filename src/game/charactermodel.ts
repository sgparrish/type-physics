export default class CharacterModel {

   public root: PIXI.Container;

   private hair: PIXI.Sprite;
   private head: PIXI.Sprite;
   private arms: PIXI.Sprite;
   private body: PIXI.Sprite;
   private legs: PIXI.Sprite;

   public constructor() {
      let res = PIXI.loader.resources;

      this.root = new PIXI.Container();

      this.hair = new PIXI.Sprite(res['hair'].texture);
      this.head = new PIXI.Sprite(res['head'].texture);
      this.arms = new PIXI.Sprite(res['arms'].texture);
      this.body = new PIXI.Sprite(res['body'].texture);
      this.legs = new PIXI.Sprite(res['legs'].texture);

      this.root.addChild(this.legs);
      this.root.addChild(this.body);
      this.root.addChild(this.arms);
      this.root.addChild(this.head);
      this.root.addChild(this.hair);
      
      this.hair.tint = 0xbe6431;
   }
}