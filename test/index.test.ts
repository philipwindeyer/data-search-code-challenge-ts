import { expect, test } from '@oclif/test';

import cmd = require('../src');
import { welcome } from '../src/constants';

describe('data-search', () => {
  xdescribe('when -h arg present', () => {
    test
      .stdout()
      .do(() => cmd.run(['-h']))
      .it('displays help message', (ctx) => {
        expect(ctx.stdout).to.contain('wot');
      });
  });

  xdescribe('when started', () => {
    test
      .stdout()
      .do(() => cmd.run([]))
      .it('displays welcome message', (ctx) => {
        expect(ctx.stdout).to.contain(welcome);
      });
  });
});
