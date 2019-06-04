/**
 * These are popular array functions that return a promise. The idea is to use these
 * in the .then() callback of a promise to indicate what the function is doing and always
 * return a promise
 */

export function map(mapper) {
  return data => {
    if (Array.isArray(data)) {
      return Promise.resolve(data.map(mapper));
    }

    return Promise.resolve(mapper(data));
  };
}

export function flatMap(mapper) {
  return data => {
    if (Array.isArray(data)) {
      return Promise.all(data.map(map(mapper))).then(res => res);
    }

    return map(mapper)(data).then(res => res);
  };
}

export const mergeMap = flatMap;

export function reduce(reducer, initialValue) {
  return array => Promise.resolve(array.reduce(reducer, initialValue));
}

export function filter() {}

export function parallel(...promises) {
  return value => Promise.all(promises.map(p => p(value)));
}

export function pipe(...operators) {}

export function tap(sideEffect) {
  return value => {
    sideEffect(value);
    return Promise.resolve(value);
  };
}
