

import run from "./coroutines";

/**
 * Wraps a normal function into a generator function
 * that <code>yield</code>s on a regular basis
 * @param {Function} fn - the function to be wrapped
 * @param {number} [frequency=8] -
 *    the number of times the function should be called
 *    before performing a <code>yield</code>
 * @returns {Coroutine} The wrapped yielding
 * version of the function passed
 */
export function yielding(fn, frequency = 8) {
  let yieldCount = 0;
  return function* (...params) {
    let result = fn(...params);
    if (yieldCount++ % frequency === 0) {
      yield;
    }
    return result;
  };
}

/**
 * @callback PromiseFn
 * @param {...*} [parameters] the parameters for the function
 * @return {Promise} a promise for the result of the function
 */

/**
 * Returns a function that will execute the passed
 * Coroutine and return a Promise for its result. The
 * returned function will take any number of parameters
 * and pass them on to the coroutine.
 *
 * @param {Coroutine} coroutine - The coroutine to run
 * @returns {PromiseFn} a function that can be called to execute the coroutine
 * and return its result on completion
 */
export function wrapAsPromise(coroutine) {
  return function (...params) {
    return run(function* () {
      return yield* coroutine(...params);
    });
  };
}
