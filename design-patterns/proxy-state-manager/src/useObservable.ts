import { useEffect, useState } from 'react';
export function createSubscribable<MessageType>() {
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

export type ObservableMessage<T> = {
  target: T;
  prop: string;
};

// Takes in initial type passed in + extends subscribe method
export type Observable<T> = T & {
  subscribe: (callback: (data: ObservableMessage<T>) => void) => () => void;
};

// Accepts data<DataType> and returns an Observable<DataType>
// Create a global piece of data
export function createObservable<DataType>(
  data: DataType
): Observable<DataType> {
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

export function useObservable<DataType>(
  observable: Observable<DataType>
): DataType {
  const [, setVersion] = useState(0);
  useEffect(() => {
    observable.subscribe(() => setVersion((v) => v + 1));
  }, [observable]);
  return observable as DataType;
}
