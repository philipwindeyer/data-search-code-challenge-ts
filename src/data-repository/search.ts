import { Organization, Ticket, User } from './models';

type SearchableData = Array<Organization | Ticket | User>;
type SearchableObject = Organization | Ticket | User;

export const search = (term: string, value: any, data: SearchableData) =>
  data.filter((object: SearchableObject) => object[term as keyof SearchableObject] === value);

export const getSearchableFields = (data: SearchableData) =>
  data.reduce<string[]>((keys, object) => {
    Object.keys(object).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });

    return keys;
  }, []);
