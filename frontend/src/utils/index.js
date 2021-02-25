import { transform, isEqual, isObject, isArray } from 'lodash';

export const getObjectDiff = (newObj, oldObj) => {
  let arrayIndexCounter = 0;
  return transform(newObj, (result, value, key) => {
    if (!isEqual(value, oldObj[key])) {
      const resultKey = isArray(oldObj) ? arrayIndexCounter++ : key;
      result[resultKey] =
        isObject(value) && isObject(oldObj[key])
          ? getObjectDiff(value, oldObj[key])
          : value;
    }
  });
};
