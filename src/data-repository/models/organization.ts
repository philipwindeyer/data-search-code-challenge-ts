import { User, Ticket } from '.';

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

export interface WrappedOrganization extends Organization {
  getUsers: Function;
  getTickets: Function;
}

export const wrapOrganization = (props: Organization, users: User[] = [], tickets: Ticket[] = []) => ({
  ...props,
  getUsers: () => users.filter((user) => user.organization_id === props._id),
  getTickets: () => tickets.filter((ticket) => ticket.organization_id === props._id),
});
