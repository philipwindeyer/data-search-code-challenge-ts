import { expect } from 'chai';
import { spy } from 'sinon';
import { printSearchableFields } from '../../src/command-line-helpers';

describe('printSearchableFields', () => {
  const sample = {
    organizations: [
      {
        _id: 101,
        url: 'http://initech.zendesk.com/api/v2/organizations/101.json',
        external_id: '9270ed79-35eb-4a38-a46f-35725197ea8d',
        name: 'Enthaze',
        domain_names: [],
        created_at: '2016-05-21T11:10:28 -10:00',
        details: 'MegaCorp',
        shared_tickets: false,
        tags: ['uwotm8', 'nahyeahnah'],
      },
    ],
    tickets: [],
    users: [],
  };

  const log = spy();

  beforeEach(() => {
    printSearchableFields({ data: sample, log });
  });

  describe('with a non-empty collection', () => {
    it('print "search with" message', () => {
      expect(log).to.have.been.calledWith('--------------------\nSearch Organizations with');
    });

    it('prints each searchable field', () => {
      Object.keys(sample.organizations[0]).forEach((key) => {
        expect(log).to.have.been.calledWith(key);
      });
    });
  });

  describe('with an empty collection', () => {
    it('does not print "search with" message for empty collection', () => {
      expect(log).not.to.have.been.calledWith('--------------------\nSearch Tickets with');
    });
  });
});
