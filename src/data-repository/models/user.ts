import { Organization, Ticket } from '.';
import { formatAsPrintableString } from '../utils';

interface UserProps {
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

export class User {
  _id!: number;
  url!: string;
  external_id!: string;
  name!: string;
  alias?: string;
  created_at!: string;
  active!: boolean;
  verified?: boolean;
  shared!: boolean;
  locale?: string;
  timezone?: string;
  last_login_at!: string;
  email?: string;
  phone!: string;
  signature!: string;
  organization_id?: number;
  tags!: string[];
  suspended!: boolean;
  role!: string;

  #organizations: Organization[] = [];
  #tickets: Ticket[] = [];

  constructor(props: UserProps) {
    Object.assign(this, props);
  }

  setOrganizations(organizations: Organization[]) {
    this.#organizations = organizations;
  }

  setTickets(tickets: Ticket[]) {
    this.#tickets = tickets;
  }

  getOrganization() {
    return this.#organizations.find((organization) => organization._id === this.organization_id);
  }

  getAssignedTickets() {
    return this.#tickets.filter((ticket) => ticket.assignee_id === this._id);
  }

  getSubmittedTickets() {
    return this.#tickets.filter((ticket) => ticket.submitter_id === this._id);
  }

  formatForDisplay() {
    const decoratedProps = [formatAsPrintableString(this)];

    const organization = this.getOrganization();

    if (organization) {
      decoratedProps.push(`\n  Works at: ${organization.name} (ID: ${organization._id})`);
    }

    const assigned = this.getAssignedTickets();

    if (assigned.length > 0) {
      decoratedProps.push('\n  Assigned tickets:');

      assigned.forEach((ticket) => {
        decoratedProps.push(`    - ${ticket.subject} (ID: ${ticket._id})`);
      });
    }

    const submitted = this.getSubmittedTickets();

    if (submitted.length > 0) {
      decoratedProps.push('\n  Tickets submitted/raised:');

      submitted.forEach((ticket) => {
        decoratedProps.push(`    - ${ticket.subject} (ID: ${ticket._id})`);
      });
    }

    return decoratedProps.join('\n');
  }
}
