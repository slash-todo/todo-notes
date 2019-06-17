/**
 * These are popular array functions that return a promise. The idea is to use these
 * in the .then() callback of a promise to indicate what the function is doing and always
 * return a promise
 */

export function map(mapper) {
  return function(data) {
    let executor = () => mapper(data);

    if (Array.isArray(data)) {
      executor = () => data.map(mapper);
    }

    return this && this.chainable ? Promise.resolve(executor()) : executor();
  };
}

export function flatMap2(mapper) {
  return data => {
    if (Array.isArray(data)) {
      return Promise.all(data.map(map(mapper))).then(res => res);
    }

    return map(mapper)(data).then(res => res);
  };
}

export function flatMap(mapper) {
  return function(data) {
    let executor = () => mapper(data).then(res => res);

    if (Array.isArray(data)) {
      executor = () => Promise.all(data.map(mapper)).then(res => res);
    }
    return this && this.chainable ? Promise.resolve(executor()) : executor();
  };
}

export const mergeMap = flatMap;

export function reduce(reducer, initialValue) {
  return function(array) {
    const executor = () => array.reduce(reducer, initialValue);
    return this && this.chainable ? Promise.resolve(executor()) : executor();
  };
}

export function filter() {}

export function parallel(...promises) {
  return function(value) {
    const executor = () => promises.map(p => p(value));
    // return this && this.chainable ? Promise.all(executor()) : executor();
    return Promise.all(executor());
  };
}

export function pipe(...operators) {
  const that = this || {};
  that.chainable = false;

  return function(value) {
    return Promise.resolve(
      operators.reduce(async (result, op) => await op.call(that, result), value)
    );
  };
}

export function tap(sideEffect) {
  return function(value) {
    sideEffect(value);
    return this && this.chainable ? Promise.resolve(value) : value;
  };
}
