import { extend } from "@mini-vue/shared";

let activeEffect;
let shouldTrack;

export class ReactiveEffect {
  private _fn: any;
  deps = [];
  stopActive = true;
  onStop?: () => void;
  public scheduler: Function | undefined;
  constructor(fn, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    if (!this.stopActive) {
      return this._fn();
    }

    // should be collected
    shouldTrack = true;
    activeEffect = this;
    const r = this._fn();

    // reset
    shouldTrack = false;

    return r;
  }

  stop() {
    if (this.stopActive) {
      cleanEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.stopActive = false;
    }
  }
}

function cleanEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}

// collect dependents
const targetMap = new Map();
export function track(target, key) {
  if (!isTracking()) return;

  // target-depsMap --> key-dep ---> {functions}s
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  trackEffects(dep);
}

export function isTracking() {
  // activeEffect might have a value of `undefined` (scheduler)
  return shouldTrack && activeEffect !== undefined;
}

export function trackEffects(dep) {
  if (dep.has(activeEffect)) return;
  // A `dep` can have multiple `activeEffect`s,
  // and a `activeEffect` can be associated with multiple `dep`s.
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

// trigger dependents
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  triggerEffects(dep);
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // extend options
  extend(_effect, options);

  _effect.run();

  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;

  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
