import {expect, test} from '@oclif/test'

import cmd = require('../src');

describe('data-search', () => {
  test
  .stdout()
  .do(() => cmd.run([]))
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello from ./src/index.ts')
  })
})
