import { Organization, User } from '.';

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
    const decoratedProps = [
      `_id:             ${this._id}`,
      `url:             ${this.url}`,
      `external_id:     ${this.external_id}`,
      `created_at:      ${this.created_at}`,
      `type:            ${this.type}`,
      `subject:         ${this.subject}`,
      `description:     ${this.description}`,
      `priority:        ${this.priority}`,
      `status:          ${this.status}`,
      `submitter_id:    ${this.submitter_id}`,
      `assignee_id:     ${this.assignee_id}`,
      `organization_id: ${this.organization_id}`,
      `tags:            ${this.tags}`,
      `has_incidents:   ${this.has_incidents}`,
      `due_at:          ${this.due_at}`,
      `via:             ${this.via}`,
    ];

    const organization = this.getOrganization();

    if (organization) {
      decoratedProps.push(`For organization: ${organization.name} (ID: ${organization._id})`);
    }

    const submitter = this.getSubmitter();

    if (submitter) {
      decoratedProps.push(`Submitted by: ${submitter.name} (ID: ${submitter._id})`);
    }

    const assignee = this.getAssignee();

    if (assignee) {
      decoratedProps.push(`Assigned to: ${assignee.name} (ID: ${assignee._id})`);
    }

    return decoratedProps.join('\n');
  }
}
