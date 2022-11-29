function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  }
  return padding + input;
}


// == null (checks if potentially null or undefined)
// == undefined (checks if potentially null or undefined)

