import { DataCollection, SearchableObject } from '../data-repository';

const isEmpty = (match: any) => match === undefined || match === '';

export const search = (term: string, value: string, data: DataCollection) =>
  data.filter((object: SearchableObject) => {
    const match = object[term as keyof SearchableObject];

    if (value === '') {
      return isEmpty(match);
    }

    if (Array.isArray(match)) {
      return match.map((element) => String(element)).includes(value);
    }

    return String(match) === value;
  });
