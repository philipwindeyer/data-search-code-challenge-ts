import { Organization, User } from '.';
import { formatAsPrintableString } from '../utils/format-as-printable-string';

interface TicketProps {
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

export class Ticket {
  _id!: string;
  url!: string;
  external_id!: string;
  created_at!: string;
  type?: string;
  subject!: string;
  description?: string;
  priority!: string;
  status!: string;
  submitter_id!: number;
  assignee_id?: number;
  organization_id?: number;
  tags!: string[];
  has_incidents!: boolean;
  due_at?: string;
  via!: string;

  #organizations: Organization[] = [];
  #users: User[] = [];

  constructor(props: TicketProps) {
    Object.assign(this, props);
  }

  setOrganizations(organizations: Organization[]) {
    this.#organizations = organizations;
  }

  setUsers(users: User[]) {
    this.#users = users;
  }

  getOrganization() {
    return this.#organizations.find((organization) => organization._id === this.organization_id);
  }

  getSubmitter() {
    return this.#users.find((user) => user._id === this.submitter_id);
  }

  getAssignee() {
    return this.#users.find((user) => user._id === this.assignee_id);
  }

  formatForDisplay() {
    const decoratedProps = [formatAsPrintableString(this)];

    const organization = this.getOrganization();

    if (organization) {
      decoratedProps.push(`\n  For organization: ${organization.name} (ID: ${organization._id})`);
    }

    const submitter = this.getSubmitter();

    if (submitter) {
      decoratedProps.push(`\n  Submitted by: ${submitter.name} (ID: ${submitter._id})`);
    }

    const assignee = this.getAssignee();

    if (assignee) {
      decoratedProps.push(`\n  Assigned to: ${assignee.name} (ID: ${assignee._id})`);
    }

    return decoratedProps.join('\n');
  }
}
