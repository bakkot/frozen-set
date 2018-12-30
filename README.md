## `frozen-set`

This [npm module](https://www.npmjs.com/package/frozen-set) provides frozen (fixed) sets: sets which will not change after construction. These behave like ES2015 Sets in all other ways, but do not expose `add`, `clear`, or `delete` (or any other set-modifying methods which might be added to the language in the future).

There are two versions: `FrozenSet` and `MostlyFrozenSet`. These have the same API, but `FrozenSet` will deter even an actively malicious adversary from modifying the underlying set, whereas `MostlyFrozenSet` will only discourage people who are not really dedicated. `MostlyFrozenSet` is probably faster.

Note that these are only "shallowly" frozen - that is, if the set contains a mutable object, that object will remain mutable (just as with `Object.freeze`).
