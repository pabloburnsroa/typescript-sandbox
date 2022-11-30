import { Cipher } from 'crypto';
import { run } from 'node:test';

// Singleton class to represent global app settings data
class Settings {
  static instance: Settings;

  public readonly mode = 'dark';
  // prevent new with private constructor
  private constructor() {}

  static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }
}

const settings = Settings.getInstance();

/* 

In JS, there are object literals? Global Data?
Objects are passed around by reference 

const settings = {
  dark: 'true';
}
 
*/

// PROTOTYPE
export const zombie = {
  eatBrains() {
    return 'yum ...';
  },
};

export const chad = Object.create(zombie, { name: { value: 'J' } });
console.log(chad);

chad.eatBrains();
Object.getPrototypeOf(chad);

// BUILDER

class HotDog {
  constructor(public bread: string, public ketchup?: boolean) {}

  addKetchup() {
    this.ketchup = true;
    return this; // reference to the object
  }
}

// FACTORY
// Using a function or method instead of new keyword

class IOSButton {}
class AndroidButton {}

class ButtonFactory {
  createButton(os: string): IOSButton | AndroidButton {
    if (os === 'ios') {
      return new IOSButton();
    } else {
      return new AndroidButton();
    }
  }
}

const factory = new ButtonFactory();
const btn1 = factory.createButton('ios');

// FACADE
// Simplified API to hide other low level details

class PlumbingSystem {
  // low level access
  setPressure(v: number) {}
  turnOn() {}
  turnOff() {}
}

class ElectricalSystem {
  setVoltage(v: number) {}
  turnOn() {}
  turnOff() {}
}

// simplified wrapper
class House {
  private plumbing = new PlumbingSystem();
  private electrical = new ElectricalSystem();

  public turnOnSystems() {
    this.electrical.setVoltage(120);
    this.electrical.turnOn();
    this.plumbing.setPressure(500);
    this.plumbing.turnOn();
  }

  public shutDown() {
    this.plumbing.turnOff();
    this.electrical.turnOff();
  }
}

const client = new House();
client.turnOnSystems();
client.shutDown();

// PROXY
// Substitute e.g. Reactivity System in VueJs

const original = { name: 'Pablo' };
const reactive = new Proxy(original, {
  get(target, key) {
    console.log('Tracking:', key);
    return target[key as keyof typeof original];
  },
  set(target, key, value) {
    console.log('updating UI...');
    return Reflect.set(target, key, value);
  },
});

reactive.name;

// ITERATOR(BEHAVIORAL) - pull-based system
// Allows us to traverse through a collection of objects

function range(start: number, end: number, step = 1) {
  return {
    // Use it with for of
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (start < end) {
        start = start + step;
        return { value: start, done: false };
      }
      return { done: true, value: end };
    },
  };
}

for (const n of range(0, 100, 5)) {
  // console.log(n);
}

// OBSERVER - push based system
// Allows many objects to subscribe to events that are broadcast by another object
// One-To-Many

import { Subject } from 'rxjs';

// Data we want to listen to
const news = new Subject();

const tv1 = news.subscribe((v) => console.log(v + 'via Den TV'));
const tv2 = news.subscribe((v) => console.log(v + 'via Batcave TV'));

news.next('Breaking news: ....');
// every subscription will be notified

// MEDIATOR (BEHAVIOURAL)
// "Middle man"

class Airplane {
  land() {}
}

class Runway {
  clear: boolean = false;
}

class Tower {
  clearForLanding(runway: Runway, plane: Airplane) {
    if (runway.clear) {
      console.log(`Plane ${plane} is clear for landing`);
    }
  }
}

import express from 'express';
const app = express();

// REQUEST ====> MIDDLEWARE ====> RESPONSE
// function logger(req,res,next){
//   console.log('Request Type:' req.method);
//   next()
// }

// app.use(logger)
// app.get('/', (req,res) => {
//   res.send('Hello, World!')
// })

// STATE(BEHAVIOURAL)
// Objects behaviours differently based on a finite number of states

interface State {
  think(): string;
}

class HappyState implements State {
  think() {
    return 'I am happy';
  }
}

class SadState implements State {
  think() {
    return 'I am sad';
  }
}

class Human {
  state: State;

  constructor() {
    this.state = new HappyState();
  }

  think() {
    return this.state.think();
  }

  changeState(state: State) {
    this.state = state;
  }
}

const human = new Human();
console.log(human.think());
human.changeState(new SadState());
console.log(human.think());
