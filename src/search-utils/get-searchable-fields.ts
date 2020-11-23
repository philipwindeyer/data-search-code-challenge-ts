import { DataCollection } from './search';

export const getSearchableFields = (data: DataCollection) =>
  data.reduce<string[]>((keys, object) => {
    Object.entries(object).forEach(([key, value]) => {
      if (!keys.includes(key) && typeof value != 'function') {
        keys.push(key);
      }
    });

    return keys;
  }, []);
