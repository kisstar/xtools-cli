export const NOOP = () => {};

export const objectToString = Object.prototype.toString;

export const toTypeString = (value: unknown): string => objectToString.call(value);

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isArray = Array.isArray;

export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]';

export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]';

export const isEmpty = (target: unknown) => {
  if (!target) {
    return true;
  }

  if (isArray(target)) {
    return !target.length;
  }

  if (isObject(target)) {
    return !Object.keys(target).length;
  }

  if (isMap(target) || isSet(target)) {
    return !target.size;
  }

  return true;
};
