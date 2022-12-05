 let userName: string = 'Pablo';
let hasLoggedIn: boolean = true;

// hasLoggedIn += 'Surname';

console.log(hasLoggedIn);

let myNumber: number = 10;
let myRegex: RegExp = /foo/;

const names: string[] = userName.split('');
const myValues: Array<number> = [1, 2, 3];

interface Person {
  firstName: string;
  lastName: string;
}

const myPerson: Person = {
  firstName: 'qwerty',
  lastName: 'qwerty',
};

/* Record<Keys, Type>
  object type whose prop keys are Keys and prop values are Type
*/

const ids: Record<number, string> = {
  10: 'a',
  20: 'b',
};

ids[30] = 'c';

if (ids[30] === 'd') {
  //
}

// Its okay to let TS to infer i
for (let i = 0; i < 10; i++) {
  console.log(i);
}

[1, 2, 3].forEach((v) => console.log(v));
const out = [4, 5, 6].map((v) => v * 10);
