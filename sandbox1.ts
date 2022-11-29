/*
TypeScript checks if types have been consitently assigned
Highlight any unexpected behaviour in your code  i.e. lowering the chance of bugs

*/

// Implicit
let helloWorld = 'Hello World';
// Explicit
let helloWorld2: string = 'Hello World';

// Defining Types
// inferred types name: string and id:number
const user = {
  name: 'Pablo',
  id: 0,
};

interface User {
  name: string;
  id: number;
}

const user2: User = {
  name: 'Pablo',
  id: 0,
};

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user3: User = new UserAccount('Pablo', 1);

// We can use interfaces to annotate parameters and return values to functions

// function getAdminUser(): User {
//   // ...
// }

function deleteUser(user: User) {
  // ...
}

/* Additional primitive types in TS
  any (allow anything)
  unknown (ensure someone using this types declares what the type is)
  never (its not possible that this type could happen)
  void (function returns undefined or has no return value)

*/

/* We can create complex types by combining simple ones
  2 ways to do so 
  unions
  generics
*/

// Unions
type MyBool = true | false;
// popular use-case is to desc the set of string or num literals that a value is allowed to be
type WindowStates = 'open' | 'closed' | 'minimized';

// unions can handle different types too
function getLength(obj: string | string[]) {
  return obj.length;
}

function wrapInArray(obj: string | string[]) {
  if (typeof obj === 'string') {
    return [obj];
  }
  return obj;
}

// Generics
// Provide variables to types

type StringArray = Array<string>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get();

// backpack.add(23);
// Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)

// STRUCTURAL TYPE SYSTEM
// One of TypeScript’s core principles is that type checking focuses on the shape that values have.
// This is sometimes called “duck typing” or “structural typing”.

// if 2 objects have the same shape, they are considered to be of the same type

interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

let point = { x: 12, y: 13 };
logPoint(point);
// No errors, code passes - TS compares the shape of point and Point in the type-check
// the shape matching only requires a subset of the objects fields to match

const point3 = { x: 12, y: 14, z: 15 };
logPoint(point3);

// ALSO THERE is no diff between how classes AND objects conform to shapes

class VP {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVP = new VP(13, 56);
logPoint(newVP);
