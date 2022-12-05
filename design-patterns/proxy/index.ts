// Publishable/Subscribable function
function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

// Create a mechanism that allows us to subscribe to any object
// Give object and it returns a proxy to you - object will have an additional subscribe method - anytime you set object, called back with info about whats happened

type ObservableMessage<T> = {
  target: T;
  prop: string;
};

// Takes in initial type passed in + extends subscribe method
type Observable<T> = T & {
  subscribe: (callback: (data: ObservableMessage<T>) => void) => () => void;
};

// Accepts data<DataType> and returns an Observable<DataType>
function createObservable<DataType>(data: DataType): Observable<DataType> {
  const subscribers = createSubscribable<ObservableMessage<DataType>>();

  // Returns new proxy and contains everything in original object + subscribe method
  return new Proxy(
    {
      ...data,
      subscribe: subscribers.subscribe,
    },
    {
      set: function (target: object, prop: string, value: any) {
        Reflect.set(target, prop, value);
        subscribers.publish({
          target,
          prop,
        } as unknown as ObservableMessage<DataType>);
        return true;
      },
    }
  ) as Observable<DataType>;
}

interface Message {
  message1: string;
  message2: string;
}
const target: Message = {
  message1: 'hello',
  message2: 'everyone',
};

const proxy = createObservable(target);
proxy.subscribe(console.log);
proxy.message1 = 'foo!';
proxy.message2 = 'something else!';

/* CONSOLE.LOG OUTPUT

{
  target: {
    message1: 'foo!',
    message2: 'everyone',
    subscribe: [Function: subscribe]
  },
  prop: 'message1'
}
{
  target: {
    message1: 'foo!',
    message2: 'something else!',
    subscribe: [Function: subscribe]
  },
  prop: 'message2'
}

*/
