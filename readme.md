# pmap

A `PMap` has the same API surface as an es'15 `Map`, except keys are arrays describing paths into a logical tree structure.
Here are some examples.

```js
import PMap from 'pmap';

const map = new PMap();

map.set(['a','b','c'], 2);

// . (empty)
// └--a (empty)
//    └--b (empty)
//       └--c (2)

map.set(['a','x'], 3);

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

// [['a'], 9]
// [['a', 'x'], 3]
```

# npm

```
npm install pmap
```

# API documentation

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Caveat: differs from maps since keys are paths!
