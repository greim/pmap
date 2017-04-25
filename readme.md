# Path Maps!

```bash
npm install pmap
```

A path map has the same API surface as an ES6 `Map`, except keys are arrays (or iterables) describing *paths*.
Internally, a [trie data structure](https://en.wikipedia.org/wiki/Trie) is used to store entries.
Here are some examples.

```js
import PathMap from 'pmap';

const map = new PathMap();

map.set(['a','b','c'], 2);

// . (empty)
// └--a (empty)
//    └--b (empty)
//       └--c (2)

console.log(map.has(['a','b','c'])); // true
console.log(map.has(['a','b'])); // false
console.log(map.get(['a','b','c'])); // 2

map.set('ax', 3); // any iterable can be a path
                  // identical to map.set(['a', 'x'], 3)

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

map.delete('abc');

// . (null)
// └--a (9)
//    └--x (3)

// there's also a find() method
// which ES6 `Map` doesn't have
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

# API documentation

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Caveats, change logs and notes:

 * Unlike ES6 maps, iteration order isn't guaranteed.
 * 1.x => 2.0 major version bump due to having removed es6 module syntax. No other changes.
