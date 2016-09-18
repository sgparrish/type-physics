export default class Heap<T> {

   private _data: T[];
   private _size: number;
   private _compare: (a: T, b: T) => number; // Return positive if a>b, 0 if equal, negative if a<b

   public constructor(compare: (a: T, b: T) => number) {
      this._data = [];
      this._size = 0;
      this._compare = compare;
   }

   private compare(a: T, b: T): number {
      if (a === null && b === null) {
         return 0;
      } else if (a === null) {
         return -1;
      } else if (b === null) {
         return 1;
      }
      return this._compare(a, b);
   }
   private compareIndices(aIndex: number, bIndex: number): number {
      return this.compare(this.getData(aIndex), this.getData(bIndex));
   }
   private leftChildIndex(index: number): number {
      return (2 * index) + 1;
   }
   private rightChildIndex(index: number): number {
      return (2 * index) + 2;
   }
   private largerChildIndex(index: number): number {
      let leftChildIdx = this.leftChildIndex(index);
      let rightChildIdx = this.rightChildIndex(index);

      if (this.compareIndices(leftChildIdx, rightChildIdx) > 0) {
         return leftChildIdx;
      } else {
         return rightChildIdx;
      }
   }
   private parentIndex(index: number): number {
      return Math.floor((index - 1) / 2);
   }

   public getData(index: number): T {
      if (index >= 0 && index < this._size) {
         return this._data[index];
      }
      return null;
   }
   public getSize(): number {
      return this._size;
   }
   public getArray(): T[] {
      return this._data;
   }

   public add(value: T): void {
      this._data[this._size] = value;
      this._size += 1;

      this.siftUp(this._size - 1);
   }
   public removeRoot(): T {
      return this.remove(0);
   }
   public remove(index: number): T {
      // Swap with last element in tree
      let value: T = this._data[index];
      this._data[index] = this._data[this._size - 1];
      this._data[this._size - 1] = value;

      // Remove last element & sift up or down
      this._size -= 1
      this.update(index);

      return value;
   }
   public update(index: number): void {
      // Check if parent is bigger than child, sift up or down
      let currentVal = this.getData(index);
      let parentIdx = this.parentIndex(index);
      let largerChildIdx = this.largerChildIndex(index);

      if (this.compareIndices(index, parentIdx) > 0) {
         this.siftUp(index);
      }
      if (this.compareIndices(index, largerChildIdx) < 0) {
         this.siftDown(index);
      }
   }

   private siftUp(index: number): void {
      // Compare vs parent
      let currentIdx = index;
      let currentVal = this.getData(index);
      let parentIdx = this.parentIndex(index);
      let parentVal = this.getData(parentIdx);

      while (currentIdx > 0 && this.compare(currentVal, parentVal) > 0) {
         // Swap in the data array
         this._data[parentIdx] = currentVal;
         this._data[currentIdx] = parentVal;

         // Update temporary variables
         currentIdx = parentIdx;
         parentIdx = this.parentIndex(currentIdx);
         currentVal = this.getData(currentIdx);
         parentVal = this.getData(parentIdx);
      }
   }

   private siftDown(index: number): void {
      // Compare vs parent
      let currentIdx = index;
      let currentVal = this.getData(index);
      let largerChildIdx = this.largerChildIndex(currentIdx);
      let largerChildVal = this.getData(largerChildIdx);

      while (this.compare(currentVal, largerChildVal) < 0) {
         // Swap in the data array
         this._data[largerChildIdx] = currentVal;
         this._data[currentIdx] = largerChildVal;

         // Update temporary variables
         currentIdx = largerChildIdx;
         currentVal = this.getData(currentIdx);
         largerChildIdx = this.largerChildIndex(currentIdx);
         largerChildVal = this.getData(largerChildIdx);
      }
   }
}
