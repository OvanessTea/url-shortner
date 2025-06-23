// Mock implementation of nanoid for testing
let counter = 0;

export const nanoid = (size: number = 21): string => {
  counter++;
  // Generate a predictable string based on counter and size
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < size; i++) {
    result += chars[(counter + i) % chars.length];
  }
  return result;
};

export const customAlphabet = (alphabet: string, defaultSize: number = 21) => {
  return (size: number = defaultSize): string => {
    counter++;
    let result = '';
    for (let i = 0; i < size; i++) {
      result += alphabet[(counter + i) % alphabet.length];
    }
    return result;
  };
}; 