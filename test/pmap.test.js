/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

/* eslint-env mocha */

import assert from 'assert';
import PMap from '../src/pmap';

describe('pmap', () => {

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
    const res = [];
    for (const [path, value] of m) {
      res.push(path.slice());
      res.push(value);
    }
    assert.deepEqual(res, [
      [], 0,
      [1,2], 3
    ]);
  });

  it('should iterate entries', () => {
    const m = new PMap();
    m.set([], 0);
    m.set([1,2], 3);
    const res = [];
    for (const [path, value] of m.entries()) {
      res.push(path.slice());
      res.push(value);
    }
    assert.deepEqual(res, [[],0,[1,2],3]);
  });

  it('should iterate keys', () => {
    const m = new PMap();
    m.set([], 0);
    m.set([1,2], 3);
    const res = [];
    for (const path of m.keys()) {
      res.push(path.slice());
    }
    assert.deepEqual(res, [[],[1,2]]);
  });

  it('should iterate values', () => {
    const m = new PMap();
    m.set([], 0);
    m.set([1,2], 3);
    const res = [];
    for (const value of m.values()) {
      res.push(value);
    }
    assert.deepEqual(res, [0,3]);
  });

  it('should construct on entries', () => {
    const m = new PMap([
      [[], 0],
      [[1,2], 3]
    ]);
    const res = [];
    for (const [path, value] of m.entries()) {
      res.push(path.slice());
      res.push(value);
    }
    assert.deepEqual(res, [[],0,[1,2],3]);
  });

  it('should forEach', () => {
    const m = new PMap([
      [[], 0],
      [[1,2], 3]
    ]);
    const res = [];
    m.forEach((value, path) => {
      res.push(path.slice());
      res.push(value);
    });
    assert.deepEqual(res, [[],0,[1,2],3]);
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
    const res = [];
    for (const [path, value] of m.entries()) {
      res.push(path.slice());
      res.push(value);
    }
    assert.deepEqual(res, []);
  });

  it('should have a size', () => {
    const m = new PMap([
      [[], 0],
      [[1,2], 3]
    ]);
    assert.strictEqual(m.size, 2);
  });
});
