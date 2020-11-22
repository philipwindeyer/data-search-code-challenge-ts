import { expect } from 'chai';
import { users } from '../../src/data-repository/data-sources';
import { search } from '../../src/search-utils';
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
