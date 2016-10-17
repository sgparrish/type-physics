import Entity from "../engine/entity";

class EntityNode {
   next: EntityNode;
   prev: EntityNode;
   data: Entity;

   constructor(entity: Entity) {
      this.data = entity;
   }

   destroy(): void {
      this.next = null;
      this.prev = null;
      this.data = null;
   }

   static compare(node1: EntityNode, node2: EntityNode): number {
      return Entity.compare(node1.data, node2.data);
   }
}

class TestEntity extends Entity {
   constructor() {
      super();
      this.depth = this.id;
   }
   update(delta: number): void { }
   render(interpPercent: number): void { }
}

export default class EntityList {

   private _length: number;

   private entityIdTable: EntityNode[];

   private head: EntityNode;
   private tail: EntityNode;
   private iter: EntityNode;

   public constructor() {
      this._length = 0;
      this.entityIdTable = [];
      this.head = null;
      this.tail = null;
   }

   public get length(): number {
      return this._length;
   }

   public add(entity: Entity): void {
      let newNode = new EntityNode(entity);

      if (this.head === null) {
         this.head = newNode;
         this.tail = newNode;
      } else {
         this.tail.next = newNode;
         newNode.prev = this.tail;
         this.tail = newNode;
      }

      this.entityIdTable[entity.id] = newNode;

      this._length += 1;
   }

   public remove(entity: Entity): void {
      // Lookup entity by id and un-register it
      let nodeToRemove = this.entityIdTable[entity.id];
      this.entityIdTable[entity.id] = null;

      // remove before and after references of node
      let nextNode = nodeToRemove.next;
      let prevNode = nodeToRemove.prev;
      if (nextNode) {
         nextNode.prev = prevNode;
      }
      if (prevNode) {
         prevNode.next = nextNode;
      }

      // Leave node to the garbage collector
      nodeToRemove.destroy();

      this._length -= 1;
   }

   public start(): void {
      this.iter = this.head;
   }

   public hasNext(): boolean {
      return this.iter !== undefined;
   }

   public next(): Entity {
      let entity = this.iter.data;
      this.iter = this.iter.next;
      return entity;
   }

   public sort(): void {
      // Insertion sort
      let nodeA: EntityNode = this.head; // a is tail of sorted list
      let nodeB: EntityNode;

      while (nodeA != this.tail) {
         nodeA = nodeA.next;
         nodeB = nodeA;
         while (nodeB.prev != null && EntityNode.compare(nodeB, nodeB.prev) < 0) { // nodeB < nodeB.prev
            this.swap(nodeB, nodeB.prev);
            nodeB = nodeB.prev;
         }
      }
   }

   public static unitTest(): void {
      let e1 = new TestEntity();
      let e2 = new TestEntity();
      let e3 = new TestEntity();
      let e4 = new TestEntity();
      let e5 = new TestEntity();
      let e6 = new TestEntity();
      let e7 = new TestEntity();
      let e8 = new TestEntity();

      let list = new EntityList();

      list.add(e6);
      list.add(e5);
      list.add(e3);
      list.add(e1);
      list.add(e8);
      list.add(e7);
      list.add(e2);
      list.add(e4);

      list.sort();
   }

   private swap(nodeA: EntityNode, nodeB: EntityNode): void {
      // swap data and id entries
      let entityA = nodeA.data;
      nodeA.data = nodeB.data;
      nodeB.data = entityA;

      this.entityIdTable[nodeA.data.id] = nodeA;
      this.entityIdTable[nodeB.data.id] = nodeB;
   }
}