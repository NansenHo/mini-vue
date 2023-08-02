import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value;
  // for a ref, only one dep is needed
  public dep;
  private _rawValue: any;
  public __v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    // if `newValue` is a plain object, it should be compared with the plain object `value`,
    // rather than being compared with `reactive(value)`, which is a proxy object.
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}
