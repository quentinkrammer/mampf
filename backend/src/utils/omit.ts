import { omit as _omit } from 'lodash';
import { Omit } from '../types';

export function omit<T extends object, U extends Array<keyof T>>(
  object: T,
  ...key: U
): Omit<T, U[number]> {
  return _omit(object, ...key);
}
