import { expect } from 'chai';
import { Organization } from '../../../src/data-repository/models';
import { formatAsPrintableString } from '../../../src/data-repository/utils';

describe('formatAsPrintableString', () => {
  const sample = new Organization({
    _id: 125,
    url: 'http://initech.zendesk.com/api/v2/organizations/125.json',
    external_id: '42a1a845-70cf-40ed-a762-acb27fd606cc',
    name: 'Strezzö',
    domain_names: ['techtrix.com', 'teraprene.com', 'corpulse.com', 'flotonic.com'],
    created_at: '2016-02-21T06:11:51 -11:00',
    details: 'MegaCorp',
    shared_tickets: false,
    tags: ['Vance', 'Ray', 'Jacobs', 'Frank'],
  });

  it('stringifies each prop on a new line with justified space between ', () => {
    expect(formatAsPrintableString(sample)).to.equal(
      [
        '_id                             125',
        'url                             http://initech.zendesk.com/api/v2/organizations/125.json',
        'external_id                     42a1a845-70cf-40ed-a762-acb27fd606cc',
        'name                            Strezzö',
        'domain_names                    techtrix.com,teraprene.com,corpulse.com,flotonic.com',
        'created_at                      2016-02-21T06:11:51 -11:00',
        'details                         MegaCorp',
        'shared_tickets                  false',
        'tags                            Vance,Ray,Jacobs,Frank',
      ].join('\n'),
    );
  });
});
