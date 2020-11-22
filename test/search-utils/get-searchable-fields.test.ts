import { expect } from 'chai';
import { organizations, tickets, users } from '../../src/data-repository/data-sources';
import { getSearchableFields } from '../../src/search-utils';

describe('#getSearchableFields', () => {
  describe('when data is made up of organizations', () => {
    it('returns an array of "searchable fields"', () => {
      const expected = ['_id', 'url', 'external_id', 'name', 'domain_names', 'created_at', 'details', 'shared_tickets', 'tags'];
      expect(getSearchableFields(organizations)).to.deep.equal(expected);
    });
  });

  describe('when data is made up of tickets', () => {
    it('returns an array of "searchable fields"', () => {
      const expected = [
        '_id',
        'url',
        'external_id',
        'created_at',
        'type',
        'subject',
        'description',
        'priority',
        'status',
        'submitter_id',
        'assignee_id',
        'organization_id',
        'tags',
        'has_incidents',
        'due_at',
        'via',
      ];

      expect(getSearchableFields(tickets)).to.deep.equal(expected);
    });
  });

  describe('when data is made up of users', () => {
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

      expect(getSearchableFields(users)).to.deep.equal(expected);
    });
  });

  describe('when data is made up of object that also contain functions', () => {
    let data: any[];

    beforeEach(() => {
      data = organizations.map((organization) => ({
        ...organization,
        getSomething: () => {},
        w00tB33r: () => {},
      }));
    });

    it('returns an array of "searchable fields" with functions omitted', () => {
      const expected = ['_id', 'url', 'external_id', 'name', 'domain_names', 'created_at', 'details', 'shared_tickets', 'tags'];
      expect(getSearchableFields(data)).to.deep.equal(expected);
    });
  });
});
