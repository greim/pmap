/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

const privates = new WeakMap();

export default class PMap {

  constructor(entries) {
    const _ = {};
    privates.set(this, _);
    if (entries) {
      for (let [ path, value ] of entries) {
        this.set(path, value);
      }
    }
  }

  set(path, value) {
    let _ = privates.get(this);
    for (const step of path) {
      if (!_.children) {
        _.children = new Map();
      }
      let child = _.children.get(step);
      if (!child) {
        child = new PMap();
        _.children.set(step, child);
      }
      _ = privates.get(child);
    }
    _.value = value;
    _.hasValue = true;
  }

  delete(path) {
    let _ = privates.get(this);
    for (const step of path) {
      if (!_.children) {
        return false;
      }
      let child = _.children.get(step);
      if (!child) {
        return false;
      }
      _ = privates.get(child);
    }
    if (_.hasValue) {
      delete _.value;
      _.hasValue = false;
      prune(this);
      return true;
    } else {
      return false;
    }
  }

  get(path) {
    let _ = privates.get(this);
    for (const step of path) {
      if (!_.children) {
        return undefined;
      }
      let child = _.children.get(step);
      if (!child) {
        return undefined;
      }
      _ = privates.get(child);
    }
    return _.value;
  }

  get size() {
    let size = 0;
    for (const value of this.values()) {
      size++;
    }
    return size;
  }

  clear() {
    const _ = privates.get(this);
    delete _.value;
    delete _.children;
    _.hasValue = false;
  }

  has(path) {
    let _ = privates.get(this);
    for (const step of path) {
      if (!_.children) {
        return false;
      }
      let child = _.children.get(step);
      if (!child) {
        return false;
      }
      _ = privates.get(child);
    }
    return !!_.hasValue;
  }

  *find(path) {
    let _ = privates.get(this);
    let child = this;
    for (const step of path) {
      if (!_.children) {
        return;
      }
      child = _.children.get(step);
      if (!child) {
        return;
      }
      _ = privates.get(child);
    }
    for (const [p, value] of child) {
      yield [[...path].concat(p), value ];
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  keys() {
    return iterate(this, 'keys');
  }

  values() {
    return iterate(this, 'values');
  }

  entries() {
    return iterate(this, 'entries');
  }

  forEach(cb, ctx) {
    for (const [ path, value ] of this) {
      cb.call(ctx, value, path, this);
    }
  }
}

function* iterate(pmap, which, path = []) {
  const _ = privates.get(pmap);
  if (_.hasValue) {
    if (which === 'entries') {
      yield [ path.slice(), _.value ];
    } else if (which === 'keys') {
      yield path.slice();
    } else if (which === 'values') {
      yield _.value;
    }
  }
  if (_.children) {
    for (const [ step, child ] of _.children) {
      path.push(step);
      yield* iterate(child, which, path);
      path.pop();
    }
  }
}

function prune(pmap) {
  const _ = privates.get(pmap);
  if (_.children) {
    for (const [ step, child ] of _.children) {
      if (child.size === 0) {
        _.children.delete(step);
      } else {
        prune(child);
      }
    }
    if (_.children.size === 0) {
      delete _.children;
    }
  }
}
