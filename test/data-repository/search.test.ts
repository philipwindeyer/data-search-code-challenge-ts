import { expect } from 'chai';
// import { Organization, Ticket, User } from '../../src/data-repository/models';

import { organizations, tickets, users } from '../../src/data-repository/data-sources';
import { search, getSearchableFields } from '../../src/data-repository/search';

describe('#search', () => {
  describe('when search term is unrecognized', () => {
    it('throws an "unrecognized term" error', () => {});
  });

  describe('when search value does not match anything', () => {
    it('returns an empty array', () => {});
  });

  describe('when search value is empty', () => {
    it('returns objects that have a corresponding empty value', () => {});

    describe('and when matching objects have related data', () => {
      it('includes links to related data', () => {});
    });
  });

  describe('when search value one object', () => {
    it('returns single matching object in an array', () => {});

    describe('and when matching objects have related data', () => {
      it('includes links to related data', () => {});
    });
  });

  describe('when search value multiple objects', () => {
    it('returns matching objects in an array', () => {});

    describe('and when matching objects have related data', () => {
      it('includes links to related data', () => {});
    });
  });
});

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
});
