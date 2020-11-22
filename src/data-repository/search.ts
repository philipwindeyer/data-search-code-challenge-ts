import { Organization, Ticket, User } from './models';

type SearchableData = Array<Organization | Ticket | User>;
type SearchableObject = Organization | Ticket | User;

const isEmpty = (match: any) => match === undefined || match === '';

export const search = (term: string, value: string, data: SearchableData) =>
  data.filter((object: SearchableObject) => {
    const match = object[term as keyof SearchableObject];

    if (value === '') {
      return isEmpty(match);
    }

    return String(match) === value;
  });

export const getSearchableFields = (data: SearchableData) =>
  data.reduce<string[]>((keys, object) => {
    Object.keys(object).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });

    return keys;
  }, []);
