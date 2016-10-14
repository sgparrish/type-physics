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

      this.hair = PIXI.Sprite.fromFrame('right spock.png');
      this.head = PIXI.Sprite.fromFrame('right head.png');
      this.arms = PIXI.Sprite.fromFrame('right arms 0.png');
      this.body = PIXI.Sprite.fromFrame('right narrow body stripe.png');
      this.legs = PIXI.Sprite.fromFrame('right legs 0.png');

      this.root.addChild(this.legs);
      this.root.addChild(this.body);
      this.root.addChild(this.arms);
      this.root.addChild(this.head);
      this.root.addChild(this.hair);
      
      this.hair.tint = 0x666666;
   }
}