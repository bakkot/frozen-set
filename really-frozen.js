'use strict';

const hiddenState = require('hidden-state').default;

const hidden = hiddenState('FrozenSet');

const fromMethod = Function.prototype.bind.bind(Function.prototype.call);
const call = fromMethod(Function.prototype.call);

const $Set = Set;
const $add = fromMethod(Set.prototype.add);
const $has = fromMethod(Set.prototype.has);
const $values = fromMethod(Set.prototype.values);
const $size = fromMethod(Object.getOwnPropertyDescriptor(Set.prototype, 'size').get);
const setIteratorPrototype = Object.getPrototypeOf((new Set).values());
const $iteratorNext = fromMethod(setIteratorPrototype.next);


class FrozenSet {
  constructor(iterable) {
    const set = new $Set();
    for (const item of iterable) {
      $add(set, item);
    }
    hidden(this, set);
  }

  has(value) {
    return $has(hidden(this), value);
  }

  get size() {
    return $size(hidden(this));
  }

  forEach(callbackFn, thisArg) {
    const vs = $values(hidden(this));
    while (true) {
      const { value, done } = $iteratorNext(vs);
      if (done) {
        break;
      }
      call(callbackFn, thisArg, value, value, this);
    }
  }

  *values() {
    const vs = $values(hidden(this));
    while (true) {
      const { value, done } = $iteratorNext(vs);
      if (done) {
        break;
      }
      yield value;
    }
  }

  *entries() {
    const vs = $values(hidden(this));
    while (true) {
      const { value, done } = $iteratorNext(vs);
      if (done) {
        break;
      }
      yield [value, value];
    }
  }
}
Object.defineProperty(FrozenSet.prototype, 'keys', { value: FrozenSet.prototype.values, writable: true, enumerable: false, configurable: true });
Object.defineProperty(FrozenSet.prototype, Symbol.iterator, { value: FrozenSet.prototype.values, writable: true, enumerable: false, configurable: true });
Object.defineProperty(FrozenSet.prototype, Symbol.toStringTag, { value: 'FrozenSet', writable: false, enumerable: false, configurable: true });

module.exports = FrozenSet;
