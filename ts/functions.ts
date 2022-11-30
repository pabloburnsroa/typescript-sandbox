function addNumbers(a: number, b: number): number {
  return a + b;
}
export default addNumbers;

export const addStrings = (str1: string, str2: string): string => {
  return `${str1} ${str2}`;
};

// Assignability of functions
type voidFunc = () => void;

export const f1: voidFunc = () => {
  return true;
};

// ^^ retains it return type void when assigned to another variable
const v1 = f1();
