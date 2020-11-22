import { expect } from 'chai';
import { wrapOrganization } from '../../../src/data-repository/models';

describe('wrapOrganization', () => {
  const sample = {
    _id: 125,
    url: 'http://initech.zendesk.com/api/v2/organizations/125.json',
    external_id: '42a1a845-70cf-40ed-a762-acb27fd606cc',
    name: 'Strezzö',
    domain_names: ['techtrix.com', 'teraprene.com', 'corpulse.com', 'flotonic.com'],
    created_at: '2016-02-21T06:11:51 -11:00',
    details: 'MegaCorp',
    shared_tickets: false,
    tags: ['Vance', 'Ray', 'Jacobs', 'Frank'],
  };

  let organization: ReturnType<typeof wrapOrganization>;

  beforeEach(() => {
    organization = wrapOrganization(sample);
  });

  describe('#new', () => {
    it('build an organization object from data with helper fns', () => {
      const { getUsers, getTickets, getSearchableFields, ...organizationProps } = organization;

      expect(organizationProps).to.deep.equal(sample);

      expect(getUsers).to.be.a('Function');
      expect(getTickets).to.be.a('Function');
      expect(getSearchableFields).to.be.a('Function');
    });
  });

  describe('#getUsers', () => {
    describe('when no users provided to collection', () => {
      it('returns an empty array', () => {
        expect(organization.getUsers()).to.deep.equal([]);
      });
    });

    describe('when no users are part of the organization', () => {
      const users = [
        {
          _id: 1,
          url: 'http://initech.zendesk.com/api/v2/users/1.json',
          external_id: '74341f74-9c79-49d5-9611-87ef9b6eb75f',
          name: 'Francisca Rasmussen',
          alias: 'Miss Coffey',
          created_at: '2016-04-15T05:19:46 -10:00',
          active: true,
          verified: true,
          shared: false,
          locale: 'en-AU',
          timezone: 'Sri Lanka',
          last_login_at: '2013-08-04T01:03:27 -10:00',
          email: 'coffeyrasmussen@flotonic.com',
          phone: '8335-422-718',
          signature: "Don't Worry Be Happy!",
          organization_id: 119,
          tags: ['Springville', 'Sutton', 'Hartsville/Hartley', 'Diaperville'],
          suspended: true,
          role: 'admin',
        },
      ];

      beforeEach(() => {
        organization = wrapOrganization(sample, users, []);
      });

      it('returns an empty array', () => {
        expect(organization.getUsers()).to.deep.equal([]);
      });
    });

    describe('when a user is part of the organization', () => {
      const users = [
        {
          _id: 8,
          url: 'http://initech.zendesk.com/api/v2/users/8.json',
          external_id: 'fa13ffa4-0ba1-41d1-be4a-c1e7a92f25e4',
          name: 'Lolita Herring',
          alias: 'Miss Reyna',
          created_at: '2016-07-14T03:21:49 -10:00',
          active: false,
          verified: false,
          shared: false,
          locale: 'de-CH',
          timezone: 'Iceland',
          last_login_at: '2014-10-28T03:06:58 -11:00',
          email: 'reynaherring@flotonic.com',
          phone: '8484-692-871',
          signature: "Don't Worry Be Happy!",
          organization_id: 125,
          tags: ['Greenbush', 'Canby', 'Bedias', 'Boyd'],
          suspended: true,
          role: 'agent',
        },
      ];

      beforeEach(() => {
        organization = wrapOrganization(sample, users, []);
      });

      it('returns user part of the organization', () => {
        expect(organization.getUsers()).to.deep.equal(users);
      });
    });
  });

  describe('#getTickets', () => {
    describe('when no tickets provided to collection', () => {
      it('returns an empty array', () => {
        expect(organization.getTickets()).to.deep.equal([]);
      });
    });

    describe('when no tickets are assigned to the organization', () => {
      const tickets = [
        {
          _id: '436bf9b0-1147-4c0a-8439-6f79833bff5b',
          url: 'http://initech.zendesk.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json',
          external_id: '9210cdc9-4bee-485f-a078-35396cd74063',
          created_at: '2016-04-28T11:19:34 -10:00',
          type: 'incident',
          subject: 'A Catastrophe in Korea (North)',
          description:
            'Nostrud ad sit velit cupidatat laboris ipsum nisi amet laboris ex exercitation amet et proident. Ipsum fugiat aute dolore tempor nostrud velit ipsum.',
          priority: 'high',
          status: 'pending',
          submitter_id: 38,
          assignee_id: 24,
          organization_id: 116,
          tags: ['Ohio', 'Pennsylvania', 'American Samoa', 'Northern Mariana Islands'],
          has_incidents: false,
          due_at: '2016-07-31T02:37:50 -10:00',
          via: 'web',
        },
      ];

      beforeEach(() => {
        organization = wrapOrganization(sample, [], tickets);
      });

      it('returns an empty array', () => {
        expect(organization.getTickets()).to.deep.equal([]);
      });
    });

    describe('when a ticket is assigned to the organization', () => {
      const tickets = [
        {
          _id: '25d9edca-7756-4d28-8fdd-f16f1532f6ab',
          url: 'http://initech.zendesk.com/api/v2/tickets/25d9edca-7756-4d28-8fdd-f16f1532f6ab.json',
          external_id: 'c6782106-7623-4952-b4b1-8663f7b5e9dc',
          created_at: '2016-03-01T05:58:09 -11:00',
          type: 'task',
          subject: 'A Problem in Cyprus',
          description:
            'Laborum ad proident consectetur amet officia pariatur magna. Elit sint dolore id nostrud enim id quis commodo ex et eu ex.',
          priority: 'urgent',
          status: 'open',
          submitter_id: 62,
          assignee_id: 75,
          organization_id: 125,
          tags: ['Puerto Rico', 'Idaho', 'Oklahoma', 'Louisiana'],
          has_incidents: true,
          due_at: '2016-08-17T07:54:27 -10:00',
          via: 'web',
        },
      ];

      beforeEach(() => {
        organization = wrapOrganization(sample, [], tickets);
      });

      it('returns ticket assigned to the organization', () => {
        expect(organization.getTickets()).to.deep.equal(tickets);
      });
    });
  });

  describe('#getSearchableFields', () => {
    it('returns an array of "searchable fields"', () => {
      const expected = ['_id', 'url', 'external_id', 'name', 'domain_names', 'created_at', 'details', 'shared_tickets', 'tags'];

      expect(organization.getSearchableFields()).to.deep.equal(expected);
    });
  });
});
