import { User, Ticket } from '.';
import { formatAsPrintableString } from '../utils';

interface OrganizationProps {
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

export class Organization {
  _id!: number;
  url!: string;
  external_id!: string;
  name!: string;
  domain_names!: string[];
  created_at!: string;
  details!: string;
  shared_tickets!: boolean;
  tags!: string[];

  #users: User[] = [];
  #tickets: Ticket[] = [];

  constructor(props: OrganizationProps) {
    Object.assign(this, props);
  }

  setUsers(users: User[]) {
    this.#users = users;
  }

  setTickets(tickets: Ticket[]) {
    this.#tickets = tickets;
  }

  getUsers() {
    return this.#users.filter((user) => user.organization_id === this._id);
  }

  getTickets() {
    return this.#tickets.filter((ticket) => ticket.organization_id === this._id);
  }

  formatForDisplay() {
    const decoratedProps = [formatAsPrintableString(this)];

    const users = this.getUsers();

    if (users.length > 0) {
      decoratedProps.push('\n  Users part of organization:');

      users.forEach((user) => {
        decoratedProps.push(`    - ${user.name} (ID: ${user._id})`);
      });
    }

    const tickets = this.getTickets();

    if (tickets.length > 0) {
      decoratedProps.push('\n  Tickets belonging to organization:');

      tickets.forEach((ticket) => {
        decoratedProps.push(`    - ${ticket.subject} (ID: ${ticket._id})`);
      });
    }

    return decoratedProps.join('\n');
  }
}
