/**
 * These are popular array functions that return a promise. The idea is to use these
 * in the .then() callback of a promise to indicate what the function is doing and always
 * return a promise
 */

export function map(mapper) {
  return array => Promise.resolve(array.map(mapper));
}

export function reduce(reducer, initialValue) {
  return array => Promise.resolve(array.reduce(reducer, initialValue));
}
