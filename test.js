'use strict';

const assert = require('assert');

const { FrozenSet, MostlyFrozenSet } = require('./index.js');

const { add, clear, delete: del } = Set.prototype;

function test(ctor) {
  const a = {}, b = {}, c = {}; 
  const F = new ctor([a, b, c]);

  assert(!('add' in F));
  assert(!('clear' in F));
  assert(!('delete' in F));
  assert.throws(() => add.call(F, 42));
  assert.throws(() => clear.call(F, 42));
  assert.throws(() => del.call(F, 42));


  assert(F.size === 3);

  let items = [];
  for (let item of F) {
    items.push(item);
  }

  assert(items.length === 3);
  assert(items[0] === a);
  assert(items[1] === b);
  assert(items[2] === c);

  items = [];
  for (const item of F.entries()) {
    items.push(item);
  }

  assert(items.length === 3);
  assert(items[0].length === 2);
  assert(items[0][0] === a);
  assert(items[0][1] === a);
  assert(items[1].length === 2);
  assert(items[1][0] === b);
  assert(items[1][1] === b);
  assert(items[2].length === 2);
  assert(items[2][0] === c);
  assert(items[2][1] === c);


  const sigil = {};
  let index = 0;
  F.forEach(function(...args) {
    assert(this === sigil);
    assert(args.length === 3);
    assert(args[0] === args[1]);
    assert(args[2] === F);
    if (index === 0) {
      assert(args[0] === a);
    } else if (index === 1) {
      assert(args[0] === b);
    } else if (index === 2) {
      assert(args[0] === c);
    }
    ++index;
  }, sigil);
  assert(index === 3);


  assert(F.keys === F[Symbol.iterator]);
  assert(F.values === F[Symbol.iterator]);

  assert(F.toString() === '[object FrozenSet]');
}


test(MostlyFrozenSet);
test(FrozenSet);


// stronger contract: use of the set does not rely on Set-related primordials (which could be hijacked to get at the set) 
const setIteratorPrototype = Object.getPrototypeOf((new Set).values());
for (let key of Reflect.ownKeys(setIteratorPrototype)) {
  delete setIteratorPrototype[key];
}

for (let key of Reflect.ownKeys(Set.prototype)) {
  delete Set.prototype[key];
}

delete global.Set;

test(FrozenSet);
