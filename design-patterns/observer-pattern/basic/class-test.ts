import { Subscribable } from './subscribable-class';

const sub = new Subscribable<string>();

const unsub = sub.subscribe(console.log);
sub.publish('Hello, World!');
sub.publish('Hello, World! Again');
unsub();
sub.publish('You shouldn`t see me');
