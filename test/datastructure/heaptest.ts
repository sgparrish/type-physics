import * as tsUnit from "../tsUnit";
import Heap from "../../src/datastructure/heap";

function isHeap(heap: Heap<number>): boolean {
   let data = heap.getArray();
   for (let i = 0; i < heap.getSize(); i++) {
      if (!isHeapNode(heap, i)) {
         return false;
      }
   }
   return true;
}
function isHeapNode(heap: Heap<number>, index: number): boolean {
   let current = heap.getData(index);
   let leftChild = heap.getData((2 * index) + 1);
   let rightChild = heap.getData((2 * index) + 2);
   let parent = heap.getData(Math.floor((index - 1) / 2));

   if ((current > parent && parent !== null)
      || (current < leftChild && leftChild !== null)
      || (current < rightChild && rightChild !== null)) {
      return false;
   }
   return true;
}

var compare = (a: number, b: number) => { return a - b };
var heap1: Heap<number> = new Heap<number>(compare);

export default class HeapTest extends tsUnit.TestClass {

   testHelpers() {
      this.isTrue(isHeap(heap1));
   }

   testAdd() {
      let vals = [4, 1, 2, 5, 6, 9, 8, 7, 3, 3];
      for (let val of vals) {
         heap1.add(val);
         this.isTrue(isHeap(heap1));
      }
      this.areIdentical(10, heap1.getSize());
   }

   testRemove() {
      let lastRoot = Number.MAX_VALUE;
      for(let i = 0; i < 10; i++) {
         let root = heap1.removeRoot();
         this.isTrue(root <= lastRoot);
         lastRoot = root;
         this.isTrue(isHeap(heap1));
      }
   }

}