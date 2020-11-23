import { Organization, Ticket, User } from '../data-repository/models';

export interface Data {
  organizations: Organization[];
  tickets: Ticket[];
  users: User[];
  [key: string]: Organization[] | Ticket[] | User[];
}

export interface PrintSearchableFieldsArgs {
  data: Data;
  log: Function;
}
