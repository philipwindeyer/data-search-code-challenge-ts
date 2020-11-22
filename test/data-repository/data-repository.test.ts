import { use, expect } from 'chai';
import { getData } from '../../src/data-repository';
import { organizations, tickets, users } from '../../src/data-repository/data-sources';

use(require('chai-like'));

describe('data-repository', () => {
  describe('#getData', () => {
    let result: ReturnType<typeof getData>;

    beforeEach(() => {
      result = getData();
    });

    it('contains wrapped organizations', () => {
      expect(result.organizations).to.be.like(organizations);
    });

    it('contains wrapped tickets', () => {
      expect(result.tickets).to.be.like(tickets);
    });

    it('contains wrapped users', () => {
      expect(result.users).to.be.like(users);
    });
  });
});
