import { expect } from "chai";
import { getTicket } from "../../../src/data-repository/models";

describe("getTicket", () => {
  const sample = {
    _id: "674a19a1-c330-45fb-8b61-b4d77ba87130",
    url:
      "http://initech.zendesk.com/api/v2/tickets/674a19a1-c330-45fb-8b61-b4d77ba87130.json",
    external_id: "050ea8ce-251c-44c8-b71c-535dd9072a74",
    created_at: "2016-03-07T08:24:53 -11:00",
    type: "task",
    subject: "A Drama in St. Pierre and Miquelon",
    description:
      "Incididunt exercitation voluptate eu laborum proident Lorem minim pariatur. Lorem culpa amet Lorem Lorem commodo anim deserunt do consectetur sunt.",
    priority: "low",
    status: "open",
    submitter_id: 49,
    assignee_id: 14,
    organization_id: 109,
    tags: ["Connecticut", "Arkansas", "Missouri", "Alabama"],
    has_incidents: false,
    due_at: "2016-08-15T06:13:11 -10:00",
    via: "voice",
  };

  describe("#new", () => {
    let ticket: ReturnType<typeof getTicket>;

    beforeEach(() => {
      ticket = getTicket(sample);
    });

    it("build an ticket object from data", () => {
      const {
        getSubmitter,
        getAssignee,
        getOrganization,
        getSearchableFields,
        ...ticketProps
      } = ticket;

      expect(ticketProps).to.deep.equal(sample);
    });
  });
});
