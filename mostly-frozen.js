'use strict';

const hiddenState = require('hidden-state').default;

const hidden = hiddenState('FrozenSet');

class FrozenSet {
  constructor(iterable) {
    hidden(this, new Set(iterable));
  }

  has(value) {
    return hidden(this).has(value);
  }

  get size() {
    return hidden(this).size;
  }

  forEach(callbackFn, thisArg) {
    // This is more complicated because of the third argument to the callback
    hidden(this).forEach((k, v) => {
      callbackFn.call(thisArg, k, v, this);
    });
  }

  values() {
    return hidden(this).values();
  }

  entries() {
    return hidden(this).entries();
  }
}
FrozenSet.prototype.keys = FrozenSet.prototype.values;
FrozenSet.prototype[Symbol.iterator] = FrozenSet.prototype.values;
Object.defineProperty(FrozenSet.prototype, Symbol.toStringTag, { value: 'FrozenSet', writable: false, enumerable: false, configurable: true });

module.exports = FrozenSet;
