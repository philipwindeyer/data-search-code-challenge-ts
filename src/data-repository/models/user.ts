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

  formatForDisplay() {
    const decoratedProps = [
      `_id:             ${this._id}`,
      `url:             ${this.url}`,
      `external_id:     ${this.external_id}`,
      `name:            ${this.name}`,
      `alias:           ${this.alias}`,
      `created_at:      ${this.created_at}`,
      `active:          ${this.active}`,
      `verified:        ${this.verified}`,
      `shared:          ${this.shared}`,
      `locale:          ${this.locale}`,
      `timezone:        ${this.timezone}`,
      `last_login_at:   ${this.last_login_at}`,
      `email:           ${this.email}`,
      `phone:           ${this.phone}`,
      `signature:       ${this.signature}`,
      `organization_id: ${this.organization_id}`,
      `tags:            ${this.tags}`,
      `suspended:       ${this.suspended}`,
      `role:            ${this.role}`,
    ];

    const organization = this.getOrganization();

    if (organization) {
      decoratedProps.push(`Works at: ${organization.name} (ID: ${organization._id})`);
    }

    const assigned = this.getAssignedTickets();

    if (assigned.length > 0) {
      decoratedProps.push('Assigned tickets:');

      assigned.forEach((ticket) => {
        decoratedProps.push(`  ${ticket.subject} (ID: ${ticket._id})`);
      });
    }

    const submitted = this.getSubmittedTickets();

    if (submitted.length > 0) {
      decoratedProps.push('Tickets submitted/raised:');

      submitted.forEach((ticket) => {
        decoratedProps.push(`  ${ticket.subject} (ID: ${ticket._id})`);
      });
    }

    return decoratedProps.join('\n');
  }
}
