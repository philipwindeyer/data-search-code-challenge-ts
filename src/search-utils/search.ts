import { Organization, Ticket, User } from '../data-repository/models';

type SearchableObject = Organization | Ticket | User;
const isEmpty = (match: any) => match === undefined || match === '';

export type SearchableData = Array<Organization | Ticket | User>;

export const search = (term: string, value: string, data: SearchableData) =>
  data.filter((object: SearchableObject) => {
    const match = object[term as keyof SearchableObject];

    if (value === '') {
      return isEmpty(match);
    }

    return String(match) === value;
  });
