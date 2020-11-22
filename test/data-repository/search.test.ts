import { expect } from 'chai';
import { organizations, tickets, users } from '../../src/data-repository/data-sources';
import { search, getSearchableFields } from '../../src/data-repository/search';
import { mockOrganization, usersWithEmptyValuesInVariousForms } from './samples';

describe('#search', () => {
  describe('when search term is unrecognized', () => {
    it('returns an empty array', () => {
      expect(search('u', 'wot', [mockOrganization])).to.deep.equal([]);
    });
  });

  describe('when search value does not match anything', () => {
    it('returns an empty array', () => {
      expect(search('timezone', 'Somewhere in the Pacific', users)).to.deep.equal([]);
    });
  });

  describe('when search value is empty', () => {
    describe('and it corresponds to an undefined key', () => {
      it('returns objects that have a corresponding empty value', () => {
        expect(search('email', '', usersWithEmptyValuesInVariousForms)).to.deep.equal([usersWithEmptyValuesInVariousForms[2]]);
      });
    });

    describe('and it corresponds to a key with an empty string value', () => {
      it('returns objects that have a corresponding empty value', () => {
        expect(search('alias', '', usersWithEmptyValuesInVariousForms)).to.deep.equal([usersWithEmptyValuesInVariousForms[0]]);
      });
    });
  });

  describe('when search value one object', () => {
    it('returns single matching object in an array', () => {
      expect(search('timezone', 'Guinea-Bissau', usersWithEmptyValuesInVariousForms)).to.deep.equal([
        usersWithEmptyValuesInVariousForms[0],
      ]);
    });
  });

  describe('when search value multiple objects', () => {
    it('returns matching objects in an array', () => {
      expect(search('organization_id', '114', usersWithEmptyValuesInVariousForms)).to.deep.equal([
        usersWithEmptyValuesInVariousForms[0],
        usersWithEmptyValuesInVariousForms[2],
      ]);
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
