import { createSubscribable } from './subscribable-function';

const sub = createSubscribable<string>();

const unsub = sub.subscribe(console.log);
sub.publish('Hello, World!');
sub.publish('Hello, World! Again');
unsub();
sub.publish('You shouldn`t see me');
