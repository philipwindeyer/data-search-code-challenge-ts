import { SearchableData } from './search';

export const getSearchableFields = (data: SearchableData) =>
  data.reduce<string[]>((keys, object) => {
    Object.keys(object).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });

    return keys;
  }, []);
