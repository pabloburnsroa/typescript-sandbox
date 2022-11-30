"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chad = exports.zombie = void 0;
// Singleton class to represent global app settings data
class Settings {
    // prevent new with private constructor
    constructor() {
        this.mode = 'dark';
    }
    static getInstance() {
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
exports.zombie = {
    eatBrains() {
        return 'yum ...';
    },
};
exports.chad = Object.create(exports.zombie, { name: { value: 'J' } });
console.log(exports.chad);
exports.chad.eatBrains();
Object.getPrototypeOf(exports.chad);
// BUILDER
class HotDog {
    constructor(bread, ketchup) {
        this.bread = bread;
        this.ketchup = ketchup;
    }
    addKetchup() {
        this.ketchup = true;
        return this; // reference to the object
    }
}
// FACTORY
// Using a function or method instead of new keyword
class IOSButton {
}
class AndroidButton {
}
class ButtonFactory {
    createButton(os) {
        if (os === 'ios') {
            return new IOSButton();
        }
        else {
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
    setPressure(v) { }
    turnOn() { }
    turnOff() { }
}
class ElectricalSystem {
    setVoltage(v) { }
    turnOn() { }
    turnOff() { }
}
// simplified wrapper
class House {
    constructor() {
        this.plumbing = new PlumbingSystem();
        this.electrical = new ElectricalSystem();
    }
    turnOnSystems() {
        this.electrical.setVoltage(120);
        this.electrical.turnOn();
        this.plumbing.setPressure(500);
        this.plumbing.turnOn();
    }
    shutDown() {
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
        return target[key];
    },
    set(target, key, value) {
        console.log('updating UI...');
        return Reflect.set(target, key, value);
    },
});
reactive.name;
// ITERATOR(BEHAVIORAL) - pull-based system
// Allows us to traverse through a collection of objects
function range(start, end, step = 1) {
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
const rxjs_1 = require("rxjs");
// Data we want to listen to
const news = new rxjs_1.Subject();
const tv1 = news.subscribe((v) => console.log(v + 'via Den TV'));
const tv2 = news.subscribe((v) => console.log(v + 'via Batcave TV'));
news.next('Breaking news: ....');
// every subscription will be notified
// MEDIATOR (BEHAVIOURAL)
// "Middle man"
class Airplane {
    land() { }
}
class Runway {
    constructor() {
        this.clear = false;
    }
}
class Tower {
    clearForLanding(runway, plane) {
        if (runway.clear) {
            console.log(`Plane ${plane} is clear for landing`);
        }
    }
}
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
class HappyState {
    think() {
        return 'I am happy';
    }
}
class SadState {
    think() {
        return 'I am sad';
    }
}
class Human {
    constructor() {
        this.state = new HappyState();
    }
    think() {
        return this.state.think();
    }
    changeState(state) {
        this.state = state;
    }
}
const human = new Human();
console.log(human.think());
human.changeState(new SadState());
console.log(human.think());
