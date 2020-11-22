import { Organization, Ticket } from '.';

export interface User {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  alias?: string;
  created_at: string;
  active: boolean;
  verified?: boolean;
  shared: boolean;
  locale?: string;
  timezone?: string;
  last_login_at: string;
  email?: string;
  phone: string;
  signature: string;
  organization_id?: number;
  tags: string[];
  suspended: boolean;
  role: string;
}

export const wrapUser = (props: User, organizations: Organization[] = [], tickets: Ticket[] = []) => ({
  ...props,
  getOrganization: () => organizations.find((organization) => organization._id === props.organization_id),
  getAssignedTickets: () => tickets.filter((ticket) => ticket.assignee_id === props._id),
  getSubmittedTickets: () => tickets.filter((ticket) => ticket.submitter_id === props._id),
});
