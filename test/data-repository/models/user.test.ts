import { expect } from 'chai';
import { getUser } from '../../../src/data-repository/models';

describe('getUser', () => {
  const sample = {
    _id: 34,
    url: 'http://initech.zendesk.com/api/v2/users/34.json',
    external_id: '36dc7f6c-4b66-4a0e-bf0b-1b2b294ca730',
    name: 'Gallegos Armstrong',
    alias: 'Mr Dale',
    created_at: '2016-02-09T01:34:46 -11:00',
    active: true,
    verified: false,
    shared: true,
    locale: 'de-CH',
    timezone: 'Papua New Guinea',
    last_login_at: '2015-02-04T06:17:46 -11:00',
    email: 'dalearmstrong@flotonic.com',
    phone: '8904-083-951',
    signature: "Don't Worry Be Happy!",
    organization_id: 111,
    tags: ['Munjor', 'Kula', 'Osage', 'Shindler'],
    suspended: true,
    role: 'agent',
  };

  let user: ReturnType<typeof getUser>;

  beforeEach(() => {
    user = getUser(sample);
  });

  describe('#new', () => {
    it('build an user object from data with helper fns', () => {
      const { getOrganization, getAssignedTickets, getSubmittedTickets, getSearchableFields, ...userProps } = user;

      expect(userProps).to.deep.equal(sample);

      expect(getOrganization).to.be.a('Function');
      expect(getAssignedTickets).to.be.a('Function');
      expect(getSubmittedTickets).to.be.a('Function');
      expect(getSearchableFields).to.be.a('Function');
    });
  });

  describe('#getOrganization', () => {
    describe('when no organizations provided to collection', () => {
      it('returns null', () => {
        expect(user.getOrganization()).to.be.undefined;
      });
    });

    describe('when user is not part of the organizations listed', () => {
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
        user = getUser(sample, organizations, []);
      });

      it('returns an empty array', () => {
        expect(user.getOrganization()).to.be.undefined;
      });
    });

    describe('when user is part of an organization', () => {
      const organizations = [
        {
          _id: 111,
          url: 'http://initech.zendesk.com/api/v2/organizations/111.json',
          external_id: '852e22ab-76dc-4d92-9a1d-02d3e04349cb',
          name: 'Speedbolt',
          domain_names: ['quintity.com', 'radiantix.com', 'enomen.com', 'minga.com'],
          created_at: '2016-03-10T10:36:00 -11:00',
          details: 'Artisan',
          shared_tickets: true,
          tags: ['Sheppard', 'Nunez', 'Bartlett', 'Giles'],
        },
      ];

      beforeEach(() => {
        user = getUser(sample, organizations, []);
      });

      it('returns user part of the organization', () => {
        expect(user.getOrganization()).to.deep.equal(organizations[0]);
      });
    });
  });

  describe('#getAssignedTickets', () => {
    describe('when no tickets provided to collection', () => {
      it('returns an empty array', () => {
        expect(user.getAssignedTickets()).to.deep.equal([]);
      });
    });

    describe('when no tickets are assigned to the user', () => {
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
        user = getUser(sample, [], tickets);
      });

      it('returns an empty array', () => {
        expect(user.getAssignedTickets()).to.deep.equal([]);
      });
    });

    describe('when a ticket is assigned to the user', () => {
      const tickets = [
        {
          _id: 'c73a0be5-e967-4948-b0a4-eff98d1a43ad',
          url: 'http://initech.zendesk.com/api/v2/tickets/c73a0be5-e967-4948-b0a4-eff98d1a43ad.json',
          external_id: '97e1ea8e-356c-48ea-9ad6-dc4c9f1843da',
          created_at: '2016-06-12T09:32:30 -10:00',
          type: 'problem',
          subject: 'A Catastrophe in Maldives',
          description: 'Commodo ex dolore ipsum consequat id enim voluptate. Cillum commodo minim qui tempor ullamco exercitation.',
          priority: 'high',
          status: 'open',
          submitter_id: 36,
          assignee_id: 34,
          organization_id: 122,
          tags: ['Virginia', 'Virgin Islands', 'Maine', 'West Virginia'],
          has_incidents: false,
          due_at: '2016-08-16T11:12:43 -10:00',
          via: 'web',
        },
      ];

      beforeEach(() => {
        user = getUser(sample, [], tickets);
      });

      it('returns ticket assigned to the user', () => {
        expect(user.getAssignedTickets()).to.deep.equal(tickets);
      });
    });
  });

  describe('#getSubmittedTickets', () => {
    describe('when no tickets provided to collection', () => {
      it('returns an empty array', () => {
        expect(user.getSubmittedTickets()).to.deep.equal([]);
      });
    });

    describe('when no tickets have been submitted by the user', () => {
      const tickets = [
        {
          _id: 'c08537d2-116d-45ff-a6d0-60c1a7d4778f',
          url: 'http://initech.zendesk.com/api/v2/tickets/c08537d2-116d-45ff-a6d0-60c1a7d4778f.json',
          external_id: '0f534118-467e-438f-9cfd-fad0fe4a0b1e',
          created_at: '2016-05-15T01:23:37 -10:00',
          type: 'task',
          subject: 'A Drama in British Indian Ocean Territory',
          description:
            'Ut in minim ea ipsum anim nostrud in et aliqua. Magna est tempor sit do deserunt nostrud non fugiat Lorem officia Lorem dolore ullamco.',
          priority: 'normal',
          status: 'pending',
          submitter_id: 65,
          assignee_id: 64,
          organization_id: 113,
          tags: ['Mississippi', 'Marshall Islands', 'South Dakota', 'Montana'],
          has_incidents: true,
          due_at: '2016-08-06T07:35:44 -10:00',
          via: 'chat',
        },
      ];

      beforeEach(() => {
        user = getUser(sample, [], tickets);
      });

      it('returns an empty array', () => {
        expect(user.getSubmittedTickets()).to.deep.equal([]);
      });
    });

    describe('when a ticket has been submitted by the user', () => {
      const tickets = [
        {
          _id: 'b539a7db-1166-4537-9a5e-d2a97dd432bd',
          url: 'http://initech.zendesk.com/api/v2/tickets/b539a7db-1166-4537-9a5e-d2a97dd432bd.json',
          external_id: '5150a02f-0aca-4db3-a1f7-91998df71794',
          created_at: '2016-01-16T09:56:03 -11:00',
          type: 'task',
          subject: 'A Catastrophe in Lesotho',
          description:
            'Lorem laboris sunt ullamco laboris fugiat minim adipisicing nisi proident officia mollit sunt ipsum. Aliquip nulla mollit consequat non anim elit id nostrud mollit pariatur ut non.',
          priority: 'low',
          status: 'solved',
          submitter_id: 34,
          assignee_id: 37,
          organization_id: 120,
          tags: ['Oregon', 'Arizona', 'Delaware', 'New Hampshire'],
          has_incidents: true,
          due_at: '2016-07-30T02:22:24 -10:00',
          via: 'chat',
        },
      ];

      beforeEach(() => {
        user = getUser(sample, [], tickets);
      });

      it('returns ticket submitted by the user', () => {
        expect(user.getSubmittedTickets()).to.deep.equal(tickets);
      });
    });
  });

  describe('#getSearchableFields', () => {
    it('returns an array of "searchable fields"', () => {
      const expected = [
        '_id',
        'url',
        'external_id',
        'name',
        'alias',
        'created_at',
        'active',
        'verified',
        'shared',
        'locale',
        'timezone',
        'last_login_at',
        'email',
        'phone',
        'signature',
        'organization_id',
        'tags',
        'suspended',
        'role',
      ];

      expect(user.getSearchableFields()).to.deep.equal(expected);
    });
  });
});
