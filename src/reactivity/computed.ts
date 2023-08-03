import { ReactiveEffect } from "./effect";

class ComputedRefImpl {
  private _getter: any;
  private _dirty: boolean = true;
  private _value: any;
  private _effect: any;
  constructor(getter) {
    this._getter = getter;
    this._effect = new ReactiveEffect(getter, () => {
      // the scheduler will be executed when the reactive object is being set.
      // this._dirty will be set to true when the depended reactive object changed.
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }

  get value() {
    if (this._dirty) {
      this._value = this._effect.run();
      this._dirty = false;
    }
    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}
