import { SearchableObject } from '../types';

export const formatAsPrintableString = (object: SearchableObject) =>
  Object.entries(object)
    .map(([key, value]) => `${key.padEnd(32)}${value}`)
    .join('\n');
