import { wrapOrganization, wrapTicket, wrapUser } from './models';
import { organizations, tickets, users } from './data-sources';

const getOrganizations = () => organizations.map((organization) => wrapOrganization(organization, users, tickets));
const getTickets = () => tickets.map((ticket) => wrapTicket(ticket, organizations, users));
const getUsers = () => users.map((user) => wrapUser(user, organizations, tickets));

export const getData = () => ({
  organizations: getOrganizations(),
  tickets: getTickets(),
  users: getUsers(),
});
