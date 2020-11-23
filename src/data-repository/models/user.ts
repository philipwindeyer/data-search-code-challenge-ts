import { Organization, Ticket } from '.';

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

  #organizations: Organization[] = [];
  #tickets: Ticket[] = [];

  constructor(props: UserProps) {
    this._id = props._id;
    this.url = props.url;
    this.external_id = props.external_id;
    this.name = props.name;
    this.alias = props.alias;
    this.created_at = props.created_at;
    this.active = props.active;
    this.verified = props.verified;
    this.shared = props.shared;
    this.locale = props.locale;
    this.timezone = props.timezone;
    this.last_login_at = props.last_login_at;
    this.email = props.email;
    this.phone = props.phone;
    this.signature = props.signature;
    this.organization_id = props.organization_id;
    this.tags = props.tags;
    this.suspended = props.suspended;
    this.role = props.role;
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
}
