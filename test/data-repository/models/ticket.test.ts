import { expect } from 'chai';
import { WrappedTicket, wrapTicket } from '../../../src/data-repository/models';

describe('wrapTicket', () => {
  const sample = {
    _id: '674a19a1-c330-45fb-8b61-b4d77ba87130',
    url: 'http://initech.zendesk.com/api/v2/tickets/674a19a1-c330-45fb-8b61-b4d77ba87130.json',
    external_id: '050ea8ce-251c-44c8-b71c-535dd9072a74',
    created_at: '2016-03-07T08:24:53 -11:00',
    type: 'task',
    subject: 'A Drama in St. Pierre and Miquelon',
    description:
      'Incididunt exercitation voluptate eu laborum proident Lorem minim pariatur. Lorem culpa amet Lorem Lorem commodo anim deserunt do consectetur sunt.',
    priority: 'low',
    status: 'open',
    submitter_id: 49,
    assignee_id: 14,
    organization_id: 109,
    tags: ['Connecticut', 'Arkansas', 'Missouri', 'Alabama'],
    has_incidents: false,
    due_at: '2016-08-15T06:13:11 -10:00',
    via: 'voice',
  };

  let ticket: WrappedTicket;

  beforeEach(() => {
    ticket = wrapTicket(sample);
  });

  describe('#new', () => {
    it('build an ticket object from data with helper fns', () => {
      const { getSubmitter, getAssignee, getOrganization, ...ticketProps } = ticket;

      expect(ticketProps).to.deep.equal(sample);

      expect(getSubmitter).to.be.a('Function');
      expect(getAssignee).to.be.a('Function');
      expect(getOrganization).to.be.a('Function');
    });
  });

  describe('#getSubmitter', () => {
    describe('when no tickets provided to collection', () => {
      it('returns undefined', () => {
        expect(ticket.getSubmitter()).to.be.undefined;
      });
    });

    describe('when ticket has not been submitted to any of the users listed', () => {
      const users = [
        {
          _id: 2,
          url: 'http://initech.zendesk.com/api/v2/users/2.json',
          external_id: 'c9995ea4-ff72-46e0-ab77-dfe0ae1ef6c2',
          name: 'Cross Barlow',
          alias: 'Miss Joni',
          created_at: '2016-06-23T10:31:39 -10:00',
          active: true,
          verified: true,
          shared: false,
          locale: 'zh-CN',
          timezone: 'Armenia',
          last_login_at: '2012-04-12T04:03:28 -10:00',
          email: 'jonibarlow@flotonic.com',
          phone: '9575-552-585',
          signature: "Don't Worry Be Happy!",
          organization_id: 106,
          tags: ['Foxworth', 'Woodlands', 'Herlong', 'Henrietta'],
          suspended: false,
          role: 'admin',
        },
      ];

      beforeEach(() => {
        ticket = wrapTicket(sample, [], users);
      });

      it('returns undefined', () => {
        expect(ticket.getSubmitter()).to.be.undefined;
      });
    });

    describe('when ticket was submitted by a user listed', () => {
      const users = [
        {
          _id: 49,
          url: 'http://initech.zendesk.com/api/v2/users/49.json',
          external_id: '4bd5e757-c0cd-445b-b702-ee3ed794f6c4',
          name: 'Faulkner Holcomb',
          alias: 'Miss Jody',
          created_at: '2016-05-12T08:39:30 -10:00',
          active: true,
          verified: false,
          shared: true,
          locale: 'zh-CN',
          timezone: 'Antigua and Barbuda',
          last_login_at: '2014-12-04T12:51:36 -11:00',
          email: 'jodyholcomb@flotonic.com',
          phone: '9255-943-719',
          signature: "Don't Worry Be Happy!",
          organization_id: 118,
          tags: ['Hanover', 'Woodlake', 'Saticoy', 'Hinsdale'],
          suspended: true,
          role: 'end-user',
        },
      ];

      beforeEach(() => {
        ticket = wrapTicket(sample, [], users);
      });

      it('returns user that submitted the ticket', () => {
        expect(ticket.getSubmitter()).to.deep.equal(users[0]);
      });
    });
  });

  describe('#getAssignee', () => {
    describe('when no tickets provided to collection', () => {
      it('returns undefined', () => {
        expect(ticket.getAssignee()).to.be.undefined;
      });
    });

    describe('when ticket has not been assigned to any of the users listed', () => {
      const users = [
        {
          _id: 51,
          url: 'http://initech.zendesk.com/api/v2/users/51.json',
          external_id: '4a4adf11-a0e8-461d-b310-0e52a052dc73',
          name: 'Green Buckley',
          alias: 'Miss Esmeralda',
          created_at: '2016-01-21T06:02:01 -11:00',
          active: true,
          verified: true,
          shared: false,
          locale: 'de-CH',
          timezone: 'Seychelles',
          last_login_at: '2015-03-01T03:06:05 -11:00',
          email: 'esmeraldabuckley@flotonic.com',
          phone: '8154-223-420',
          signature: "Don't Worry Be Happy!",
          organization_id: 125,
          tags: ['Chumuckla', 'Dixie', 'Yardville', 'Riverton'],
          suspended: true,
          role: 'end-user',
        },
      ];

      beforeEach(() => {
        ticket = wrapTicket(sample, [], users);
      });

      it('returns undefined', () => {
        expect(ticket.getAssignee()).to.be.undefined;
      });
    });

    describe('when ticket is assigned to a user listed', () => {
      const users = [
        {
          _id: 14,
          url: 'http://initech.zendesk.com/api/v2/users/14.json',
          external_id: 'feacbd09-4aed-4c45-b9e0-af3898277cb3',
          name: 'Shepherd Joseph',
          alias: 'Miss Martina',
          created_at: '2016-05-22T02:41:16 -10:00',
          active: false,
          verified: false,
          shared: true,
          locale: 'en-AU',
          timezone: 'Falkland Islands (Malvinas)',
          last_login_at: '2013-05-11T07:33:30 -10:00',
          email: 'martinajoseph@flotonic.com',
          phone: '8484-593-012',
          signature: "Don't Worry Be Happy!",
          organization_id: 107,
          tags: ['Springhill', 'Staples', 'Trail', 'Newry'],
          suspended: true,
          role: 'admin',
        },
      ];

      beforeEach(() => {
        ticket = wrapTicket(sample, [], users);
      });

      it('returns user the ticket is assigned to', () => {
        expect(ticket.getAssignee()).to.deep.equal(users[0]);
      });
    });
  });

  describe('#getOrganization', () => {
    describe('when no organizations provided to collection', () => {
      it('returns undefined', () => {
        expect(ticket.getOrganization()).to.be.undefined;
      });
    });

    describe('when ticket is not assigned to any of the organizations listed', () => {
      const organizations = [
        {
          _id: 102,
          url: 'http://initech.zendesk.com/api/v2/organizations/102.json',
          external_id: '7cd6b8d4-2999-4ff2-8cfd-44d05b449226',
          name: 'Nutralab',
          domain_names: ['trollery.com', 'datagen.com', 'bluegrain.com', 'dadabase.com'],
          created_at: '2016-04-07T08:21:44 -10:00',
          details: 'Non profit',
          shared_tickets: false,
          tags: ['Cherry', 'Collier', 'Fuentes', 'Trevino'],
        },
      ];

      beforeEach(() => {
        ticket = wrapTicket(sample, organizations, []);
      });

      it('returns undefined', () => {
        expect(ticket.getOrganization()).to.be.undefined;
      });
    });

    describe('when ticket is assigned to an organization listed', () => {
      const organizations = [
        {
          _id: 109,
          url: 'http://initech.zendesk.com/api/v2/organizations/109.json',
          external_id: '5f930931-37fd-41a2-9c68-1cd5b99e7a3e',
          name: 'Möreganic',
          domain_names: ['pearlesex.com', 'netility.com', 'rodemco.com', 'cuizine.com'],
          created_at: '2016-06-03T10:50:56 -10:00',
          details: 'MegaCorp',
          shared_tickets: false,
          tags: ['Price', 'Meyer', 'Heath', 'Skinner'],
        },
      ];

      beforeEach(() => {
        ticket = wrapTicket(sample, organizations, []);
      });

      it('returns ticket part of the organization', () => {
        expect(ticket.getOrganization()).to.deep.equal(organizations[0]);
      });
    });
  });
});
