# pmap

A `PMap` (AKA path map) has the same API surface as an ES6 `Map`, except keys are arrays (or iterables) describing paths into a logical tree structure.
Here are some examples.

```js
import PMap from 'pmap';

const map = new PMap();

map.set(['a','b','c'], 2);

// . (empty)
// └--a (empty)
//    └--b (empty)
//       └--c (2)

console.log(map.has(['a','b','c'])); // true
console.log(map.has(['a','b'])); // false
console.log(map.get(['a','b','c'])); // 2

map.set('ax', 3); // strings can be paths since they're iterable

// . (empty)
// └--a (empty)
//    |--b (empty)
//    |  └--c (2)
//    └--x (3)

map.set(['a'], 9);

// . (empty)
// └--a (9)
//    |--b (empty)
//    |  └--c (2)
//    └--x (3)

map.set([], null);

// . (null)
// └--a (9)
//    |--b (empty)
//    |  └--c (2)
//    └--x (3)

map.delete(['a','b','c']);

// . (null)
// └--a (9)
//    └--x (3)

for (const entry of map) {
  console.log(entry);
}

// [[], null]
// [['a'], 9]
// [['a', 'x'], 3]

// trie-like operations also supported via find()
map.clear();
map.set('my dog');
map.set('my dog has fleas');
map.set('my doug');
map.set('my doge');
map.set('my cat');
for (const [path] of map.find('my dog')) {
  console.log(path.join(''));
}

// 'my dog'
// 'my dog has fleas'
// 'my doge'
```

# npm

```
npm install pmap
```

# API documentation

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Caveats and notes:

 * Differs from maps since keys are paths!
 * Also, the path can be any iterable, so `['a','b','c']` and `'abc'` are both identical path keys.
 * There's a `find()` method which ES6 maps don't have.
 * Note that unlike ES6 maps, iteration order isn't guaranteed.
