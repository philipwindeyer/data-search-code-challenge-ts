import { getOrganization, getTicket, getUser } from "./models";

import {
  organizations as organizationData,
  tickets as ticketData,
  users as userData,
} from "./data-sources";

export const getData = () => {
  const organizations = organizationData.map((organization) =>
    getOrganization(organization)
  );

  const tickets = ticketData.map((ticket) => getTicket(ticket));

  const users = userData.map((user) => getUser(user));

  return { organizations, tickets, users };
};
