import Vec2 from "./vec2";
import Rectangle from "./rectangle";
import Body from "./body";

const MAX_DEPTH = 10;
const MAX_ELEMENTS = 10;

export default class QuadTree {
   private children: QuadTree[];
   private elements: Body[];
   private depth: number;
   private rectangle: Rectangle;

   public constructor(rectangle: Rectangle, depth: number = 0) {
      this.children = [];
      this.elements = [];
      this.rectangle = rectangle;
      this.depth = depth;
   }

   public insert(body: Body): void {
      // Does this node have children to push this off to?
      if (this.children.length == 0) {

         // Insert into approriate child
         let index = this.getIndex(body);
         if (index == -1) {
            this.elements.push(body);
         } else {
            this.children[index].insert(body);
         }
      } else {
         // This must be a leaf node
         this.elements.push(body);

         // Should this leaf split?
         if (this.elements.length > MAX_ELEMENTS && this.depth < MAX_DEPTH) {
            this.split();

            // Re insert all of the elements 
            let tempElements = this.elements;
            this.elements = [];
            for (let element of tempElements) {
               this.insert(element);
            }
         }
      }
   }

   public clear(): void {
      this.children = [];
      this.elements = [];
   }

   public getSets(sets: Body[][] = [], parentElements: Body[] = []): Body[][] {
      sets.push(this.elements.concat(parentElements));
      for (let child of this.children) {
         child.getSets(sets, this.elements);
      }
      return sets;
   }

   public getPairs(): [Body, Body][] {
      let sets = this.getSets();
      let pairs: [Body, Body][] = [];
      for (let set of sets) {
         for (let i = 0; i < set.length; i++) {
            for (let j = i + 1; j < set.length; j++) {
               pairs.push([set[i], set[j]]);
            }
         }
      }
      return pairs;
   }

   private split(): void {
      let width = this.rectangle.dimension.x / 2;
      let height = this.rectangle.dimension.y / 2;
      let left = this.rectangle.position.x;
      let right = this.rectangle.position.x + width;
      let top = this.rectangle.position.y;
      let bottom = this.rectangle.position.y + height;

      this.children[0] = new QuadTree(new Rectangle(left, top, width, height), this.depth + 1);
      this.children[1] = new QuadTree(new Rectangle(right, top, width, height), this.depth + 1);
      this.children[2] = new QuadTree(new Rectangle(left, bottom, width, height), this.depth + 1);
      this.children[3] = new QuadTree(new Rectangle(right, bottom, width, height), this.depth + 1);
   }

   private getIndex(body: Body): number {
      let index = -1;
      if (this.children.length != 0) {
         for (let i = 0; i < 4; i++) {
            if (this.children[i].rectangle.contains(body.getRectangle())) {
               index = i;
            }
         }
      }
      return index;
   }

}