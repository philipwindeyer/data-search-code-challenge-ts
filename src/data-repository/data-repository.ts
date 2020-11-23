import { Organization, Ticket, User } from './models';
import { organizations as organizationData, tickets as ticketData, users as userData } from './data-sources';

export const getData = () => {
  const organizations = organizationData.map((organization) => new Organization(organization));
  const tickets = ticketData.map((ticket) => new Ticket(ticket));
  const users = userData.map((user) => new User(user));

  organizations.map((organization) => {
    organization.setUsers(users);
    organization.setTickets(tickets);
  });

  tickets.map((ticket) => {
    ticket.setOrganizations(organizations);
    ticket.setUsers(users);
  });

  users.map((user) => {
    user.setOrganizations(organizations);
    user.setTickets(tickets);
  });

  return { organizations, tickets, users };
};
