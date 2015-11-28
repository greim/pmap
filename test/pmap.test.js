/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

/* eslint-env mocha */

import assert from 'assert';
import PMap from '../src/pmap';

describe('pmap', () => {

  describe('sorting helpers', () => {

    it('sortVals should sort ("a", "a")', () => {
      assert.strictEqual(sortVals('a', 'a'), 0);
    });

    it('sortVals should sort ("a", "b")', () => {
      assert.strictEqual(sortVals('a', 'b'), -1);
    });

    it('sortVals should sort ("b", "a")', () => {
      assert.strictEqual(sortVals('b', 'a'), 1);
    });

    it('sortVals should sort (0, 0)', () => {
      assert.strictEqual(sortVals(0, 0), 0);
    });

    it('sortVals should sort (0, 1)', () => {
      assert.strictEqual(sortVals(0, 1), -1);
    });

    it('sortVals should sort (1, 0)', () => {
      assert.strictEqual(sortVals(1, 0), 1);
    });

    it('sortVals should sort (null, 1)', () => {
      assert.strictEqual(sortVals(null, 1), -1);
    });

    it('sortVals should sort (1, null)', () => {
      assert.strictEqual(sortVals(1, null), 1);
    });

    it('sortVals should sort (undefined, 0)', () => {
      assert.strictEqual(sortVals(undefined, 0), -1);
    });

    it('sortVals should sort (0, undefined)', () => {
      assert.strictEqual(sortVals(0, undefined), 1);
    });

    it('sortVals should sort (null, undefined)', () => {
      assert.strictEqual(sortVals(null, undefined), 1);
    });

    it('sortVals should sort (null, undefined)', () => {
      assert.strictEqual(sortVals(null, undefined), 1);
    });

    it('sortPaths should sort ([0], [0])', () => {
      assert.strictEqual(sortPaths([0], [0]), 0);
    });

    it('sortPaths should sort ([0], [1])', () => {
      assert.strictEqual(sortPaths([0], [1]), -1);
    });

    it('sortPaths should sort ([1], [0])', () => {
      assert.strictEqual(sortPaths([1], [0]), 1);
    });

    it('sortPaths should sort ([0, 1], [0])', () => {
      assert.strictEqual(sortPaths([0, 1], [0]), 1);
    });

    it('sortPaths should sort ([0], [0, 1])', () => {
      assert.strictEqual(sortPaths([0], [0, 1]), -1);
    });

    it('sortPaths should sort ([0, 1], [0, 1])', () => {
      assert.strictEqual(sortPaths([0, 1], [0, 1]), 0);
    });

    it('sortPaths should sort ([0, 1], [0, 2])', () => {
      assert.strictEqual(sortPaths([0, 1], [0, 2]), -1);
    });

    it('sortEntries should sort ([[0, 1]], [[0, 2]])', () => {
      assert.strictEqual(sortEntries([[0, 1]], [[0, 2]]), -1);
    });
  });

  it('should construct blank', () => {
    new PMap();
  });

  it('should set root', () => {
    const m = new PMap();
    m.set([], 'a');
  });

  it('should get root', () => {
    const m = new PMap();
    m.set([], 'a');
    const res = m.get([]);
    assert.strictEqual(res, 'a');
  });

  it('should has root', () => {
    const m = new PMap();
    m.set([], 'a');
    let res = m.has([]);
    assert.strictEqual(res, true);
  });

  it('should delete root', () => {
    const m = new PMap();
    m.set([], 'a');
    m.delete([]);
    const res = m.get([]);
    assert.strictEqual(res, undefined);
  });

  it('should confirm delete root', () => {
    const m = new PMap();
    m.set([], 'a');
    const isDeleted = m.delete([]);
    assert.strictEqual(isDeleted, true);
  });

  it('should not get root', () => {
    const m = new PMap();
    const res = m.get([]);
    assert.strictEqual(res, undefined);
  });

  it('should not has root', () => {
    const m = new PMap();
    let res = m.has([]);
    assert.strictEqual(res, false);
  });

  it('should confirm not delete root', () => {
    const m = new PMap();
    const isDeleted = m.delete([]);
    assert.strictEqual(isDeleted, false);
  });

  it('should set one level deep', () => {
    const m = new PMap();
    m.set(['aa'], 'a');
  });

  it('should get one level deep', () => {
    const m = new PMap();
    m.set(['aa'], 'a');
    const res = m.get(['aa']);
    assert.strictEqual(res, 'a');
  });

  it('should has one level deep', () => {
    const m = new PMap();
    m.set(['aa'], 'a');
    let res = m.has(['aa']);
    assert.strictEqual(res, true);
  });

  it('should delete one level deep', () => {
    const m = new PMap();
    m.set(['aa'], 'a');
    m.delete(['aa']);
    const res = m.get(['aa']);
    assert.strictEqual(res, undefined);
  });

  it('should confirm delete one level deep', () => {
    const m = new PMap();
    m.set(['aa'], 'a');
    const isDeleted = m.delete(['aa']);
    assert.strictEqual(isDeleted, true);
  });

  it('should not get one level deep', () => {
    const m = new PMap();
    const res = m.get(['aa']);
    assert.strictEqual(res, undefined);
  });

  it('should not has one level deep', () => {
    const m = new PMap();
    let res = m.has(['aa']);
    assert.strictEqual(res, false);
  });

  it('should confirm not delete one level deep', () => {
    const m = new PMap();
    const isDeleted = m.delete(['aa']);
    assert.strictEqual(isDeleted, false);
  });

  it('should set two levels deep', () => {
    const m = new PMap();
    m.set(['aa','bb'], 'a');
  });

  it('should get two levels deep', () => {
    const m = new PMap();
    m.set(['aa','bb'], 'a');
    const res = m.get(['aa','bb']);
    assert.strictEqual(res, 'a');
  });

  it('should has two levels deep', () => {
    const m = new PMap();
    m.set(['aa','bb'], 'a');
    let res = m.has(['aa','bb']);
    assert.strictEqual(res, true);
  });

  it('should delete two levels deep', () => {
    const m = new PMap();
    m.set(['aa','bb'], 'a');
    m.delete(['aa','bb']);
    const res = m.get(['aa','bb']);
    assert.strictEqual(res, undefined);
  });

  it('should confirm delete two levels deep', () => {
    const m = new PMap();
    m.set(['aa','bb'], 'a');
    const isDeleted = m.delete(['aa','bb']);
    assert.strictEqual(isDeleted, true);
  });

  it('should not get two levels deep', () => {
    const m = new PMap();
    const res = m.get(['aa','bb']);
    assert.strictEqual(res, undefined);
  });

  it('should not has two levels deep', () => {
    const m = new PMap();
    let res = m.has(['aa','bb']);
    assert.strictEqual(res, false);
  });

  it('should confirm not delete two levels deep', () => {
    const m = new PMap();
    const isDeleted = m.delete(['aa','bb']);
    assert.strictEqual(isDeleted, false);
  });

  it('should iterate', () => {
    const m = new PMap();
    m.set([], 0);
    m.set([1,2], 3);
    const res = [...m].sort(sortEntries);
    assert.deepEqual(res, [
      [[], 0],
      [[1,2], 3]
    ]);
  });

  it('should iterate entries', () => {
    const m = new PMap();
    m.set([], 0);
    m.set([1,2], 3);
    const res = [...m.entries()].sort(sortEntries);
    assert.deepEqual(res, [[[],0],[[1,2],3]]);
  });

  it('should iterate keys', () => {
    const m = new PMap();
    m.set([], 0);
    m.set([1,2], 3);
    const res = [...m.keys()].sort(sortPaths);
    assert.deepEqual(res, [[],[1,2]]);
  });

  it('should iterate values', () => {
    const m = new PMap();
    m.set('a', 0);
    m.set('abc', 2);
    m.set('ab', 4);
    m.set('abcdefg', 6);
    const res = [...m.values()].sort(sortVals);
    assert.deepEqual(res, [0,2,4,6]);
  });

  it('should construct on entries', () => {
    const m = new PMap([
      [[], 0],
      [[1,2], 3]
    ]);
    const res = [...m].sort(sortEntries);
    assert.deepEqual(res, [[[],0],[[1,2],3]]);
  });

  it('should forEach', () => {
    const m = new PMap([
      [[], 0],
      [[1,2], 3]
    ]);
    const res = [];
    m.forEach((value, path) => {
      res.push([path,value]);
    });
    res.sort(sortEntries);
    assert.deepEqual(res, [[[],0],[[1,2],3]]);
  });

  it('should forEach with context', () => {
    const m = new PMap([
      [[], 0]
    ]);
    const ctx = {};
    m.forEach(function() {
      assert.strictEqual(this, ctx);
    }, ctx);
  });

  it('should forEach with self', () => {
    const m = new PMap([
      [[], 0]
    ]);
    m.forEach(function(val, path, map) {
      assert.strictEqual(map, m);
    });
  });

  it('should clear', () => {
    const m = new PMap([
      [[], 0],
      [[1,2], 3]
    ]);
    m.clear();
    const res = [...m];
    assert.deepEqual(res, []);
  });

  it('should have a size', () => {
    const m = new PMap([
      [[], 0],
      [[1,2], 3]
    ]);
    assert.strictEqual(m.size, 2);
  });

  it('should set with iterables', () => {
    const m = new PMap();
    m.set('1234');
    assert(m.has(['1','2','3','4']));
  });

  it('should has with iterables', () => {
    const m = new PMap();
    m.set('1234');
    assert(m.has('1234'));
  });

  it('should get with iterables', () => {
    const m = new PMap();
    m.set('1234', 2);
    assert.strictEqual(m.get('1234'), 2);
  });

  it('should delete with iterables', () => {
    const m = new PMap();
    m.set('1234');
    m.delete('1234');
    assert(!m.has('1234'));
  });

  it('should find', () => {
    const m = new PMap();
    m.set('my dog has fleas');
    m.set('my dog has fur');
    m.set('my doge');
    m.set('my dog');
    m.set('my do');
    m.set('my cat');
    const results = [...m.find('my dog')].map(r => r[0].join('')).sort(sortVals);
    assert.deepEqual(results, ['my dog','my dog has fleas','my dog has fur','my doge']);
  });
});

function sortEntries(a, b) {
  return sortPaths(a[0], b[0]);
}

function sortPaths(a, b) {
  const len = Math.max(a.length, b.length);
  for (let i=0; i<len; i++) {
    const aa = a[i];
    const bb = b[i];
    if (aa !== bb) {
      return sortVals(aa, bb);
    }
  }
  return 0;
}

function sortVals(a, b) {
  if (a !== b) {
    if (a === undefined) { return -1; }
    else if (b === undefined) { return 1; }
    else if (a < b) { return -1; }
    else { return 1; }
  } else {
    return 0;
  }
}