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

  set(path, value, idx = 0) {
    if (!Array.isArray(path)) {
      path = [...path];
    }
    const len = path.length - idx;
    const _ = privates.get(this);
    if (len === 0) {
      _.value = value;
      _.hasValue = true;
    } else {
      if (!_.children) {
        _.children = new Map();
      }
      const step = path[idx];
      let child = _.children.get(step);
      if (!child) {
        child = new PMap();
        _.children.set(step, child);
      }
      child.set(path, value, idx + 1);
    }
    return this;
  }

  delete(path) {
    if (!Array.isArray(path)) {
      path = [...path];
    }
    const retVal = deleteFromPMap(this, path);
    prune(this);
    return retVal;
  }

  get(path, idx = 0) {
    if (!Array.isArray(path)) {
      path = [...path];
    }
    const _ = privates.get(this);
    const len = path.length - idx;
    if (len === 0) {
      return _.value;
    } else if (!_.children) {
      return undefined;
    } else {
      const step = path[idx];
      const child = _.children.get(step);
      if (!child) {
        return undefined;
      } else {
        return child.get(path, idx + 1);
      }
    }
  }

  get size() {
    const _ = privates.get(this);
    let size = _.hasValue ? 1 : 0;
    if (_.children) {
      for (let child of _.children.values()) {
        size += child.size;
      }
    }
    return size;
  }

  clear() {
    const _ = privates.get(this);
    _.value = undefined;
    _.hasValue = false;
    _.children = undefined;
  }

  has(path, idx = 0) {
    if (!Array.isArray(path)) {
      path = [...path];
    }
    const len = path.length - idx;
    const _ = privates.get(this);
    if (len === 0) {
      return !!_.hasValue;
    } else if (!_.children) {
      return false;
    } else {
      const step = path[idx];
      const child = _.children.get(step);
      if (!child) {
        return false;
      } else {
        return child.has(path, idx + 1);
      }
    }
  }

  *find(path, idx = 0) {
    if (!Array.isArray(path)) {
      path = [...path];
    }
    const len = path.length - idx;
    const _ = privates.get(this);
    if (len === 0) {
      for (const [p, value] of this) {
        yield [ path.concat(p), value ];
      }
    } else if (_.children) {
      const step = path[idx];
      const child = _.children.get(step);
      if (child) {
        yield* child.find(path, idx + 1);
      }
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

function deleteFromPMap(pmap, path, idx = 0) {
  const len = path.length - idx;
  const _ = privates.get(pmap);
  let retVal = false;
  if (len === 0) {
    if (_.hasValue) {
      retVal = true;
      _.value = undefined;
      _.hasValue = false;
    }
  } else if (_.children) {
    const step = path[idx];
    const child = _.children.get(step);
    if (child) {
      retVal = deleteFromPMap(child, path, idx + 1);
    }
  }
  return retVal;
}

function* iterate(pmap, which, path = []) {
  const _ = privates.get(pmap);
  if (_.hasValue) {
    if (which === 'entries') {
      yield [ path, _.value ];
    } else if (which === 'keys') {
      yield path;
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
      _.children = undefined;
    }
  }
}
