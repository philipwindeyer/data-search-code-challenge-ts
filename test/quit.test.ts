import { use, expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import { captureSigInt, quit } from '../src/quit';

use(require('sinon-chai'));

describe('quit', () => {
  describe('#quit', () => {
    let logStub: SinonStub;
    let exitStub: SinonStub;

    before(() => {
      logStub = stub(console, 'log');
      exitStub = stub(process, 'exit');
      quit();
    });

    after(() => {
      logStub.restore();
      exitStub.restore();
    });

    it('prints a good bye message', () => {
      expect(logStub).to.have.been.calledOnceWith('Bye! 👋\n\n');
    });

    it('exits', () => {
      expect(exitStub).to.have.been.calledOnce;
    });
  });

  describe('#captureSigInt', () => {
    let onStub: SinonStub;

    before(() => {
      onStub = stub(process, 'on');
      captureSigInt();
    });

    after(() => {
      onStub.restore();
    });

    it('invokes #quit on SIGINT', () => {
      expect(onStub).to.have.been.calledWith('beforeExit', quit);
    });
  });
});
