export class Subscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set();
  constructor() {}
  subscribe(cb: (msg: MessageType) => void): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  publish(msg: MessageType): void {
    this.subscribers.forEach((cb) => cb(msg));
  }
}

// EXTENDING THE BASE CLASS
class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }
  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v: number) => console.log(`DC: ${v}`));
const dcUnsub2 = dc.subscribe((v: number) => console.log(`DC2: ${v}`));
dc.setValue(1);
dcUnsub();
dcUnsub2();
