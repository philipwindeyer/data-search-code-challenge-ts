import { Ticket } from './ticket';
import { User } from './user';

export interface Organization {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  domain_names: string[];
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags: string[];
}

export const getOrganization = (props: Organization, users: User[] = [], tickets: Ticket[] = []) => ({
  ...props,
  getUsers: () => users.filter((user) => user.organization_id === props._id),
  getTickets: () => tickets.filter((ticket) => ticket.organization_id === props._id),
  getSearchableFields: () => Object.keys(props),
});
