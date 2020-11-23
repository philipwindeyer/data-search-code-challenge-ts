import { User, Ticket } from '.';

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
  _id: number;
  url: string;
  external_id: string;
  name: string;
  domain_names: string[];
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags: string[];

  #users: User[] = [];
  #tickets: Ticket[] = [];

  constructor(props: OrganizationProps) {
    this._id = props._id;
    this.url = props.url;
    this.external_id = props.external_id;
    this.name = props.name;
    this.domain_names = props.domain_names;
    this.created_at = props.created_at;
    this.details = props.details;
    this.shared_tickets = props.shared_tickets;
    this.tags = props.tags;
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
}
