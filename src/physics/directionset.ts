export default class DirectionSet {
   public left: boolean;
   public right: boolean;
   public top: boolean;
   public bottom: boolean;

   public constructor(startState: boolean = false) {
      this.left = startState;
      this.right = startState;
      this.top = startState;
      this.bottom = startState;
   }

   public get any(): boolean {
      return this.left || this.right || this.top || this.bottom;
   }
}