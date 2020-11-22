import { Organization, User } from '.';

export interface Ticket {
  _id: string;
  url: string;
  external_id: string;
  created_at: string;
  type?: string;
  subject: string;
  description?: string;
  priority: string;
  status: string;
  submitter_id: number;
  assignee_id?: number;
  organization_id?: number;
  tags: string[];
  has_incidents: boolean;
  due_at?: string;
  via: string;
}

export const getTicket = (props: Ticket, organizations: Organization[] = [], users: User[] = []) => ({
  ...props,
  getSubmitter: () => users.find((user) => user._id === props.submitter_id),
  getAssignee: () => users.find((user) => user._id === props.assignee_id),
  getOrganization: () => organizations.find((organization) => organization._id === props.organization_id),
  getSearchableFields: () => Object.keys(props),
});
