import { Organization, Ticket, User } from './models';

export type DataCollection = Array<Organization | Ticket | User>;
export type SearchableObject = Organization | Ticket | User;
