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

  #organizations: Organization[] = [];
  #users: User[] = [];

  constructor(props: TicketProps) {
    this._id = props._id;
    this.url = props.url;
    this.external_id = props.external_id;
    this.created_at = props.created_at;
    this.type = props.type;
    this.subject = props.subject;
    this.description = props.description;
    this.priority = props.priority;
    this.status = props.status;
    this.submitter_id = props.submitter_id;
    this.assignee_id = props.assignee_id;
    this.organization_id = props.organization_id;
    this.tags = props.tags;
    this.has_incidents = props.has_incidents;
    this.due_at = props.due_at;
    this.via = props.via;
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
}
