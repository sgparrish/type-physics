const LEFT_MASK = 1 << 0;
const RIGHT_MASK = 1 << 1;
const TOP_MASK = 1 << 2;
const BOTTOM_MASK = 1 << 3;

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

   public static fromFlags(flag: number): DirectionSet {
      let set = new DirectionSet();
      set.left = (flag & LEFT_MASK) !== 0;
      set.right = (flag & RIGHT_MASK) !== 0;
      set.top = (flag & TOP_MASK) !== 0;
      set.bottom = (flag & BOTTOM_MASK) !== 0;

      return set
   }
}