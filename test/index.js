let chai = require('chai');
let expect = chai.expect;

const RequireAsync = require('../index');

describe('Test generali', () => {
  it('Importare un modulo nativo correttamente', done => {
    const reqFs = new RequireAsync('fs');
    reqFs
      .resolve()
      .then(fs => {
        expect(fs).to.be.not.null;
        expect(fs).to.have.property('readFile');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Importare un modulo non nativo', done => {
    const reqMod = new RequireAsync('./module');
    reqMod
      .resolve()
      .then(mod => {
        expect(mod.pippo).to.be.eq('pippo');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Dovrebbe dare errore perchè il modulo non esiste', done => {
    const reqMod = new RequireAsync('./noExist');
    reqMod
      .resolve()
      .then(mod => {
        done();
      })
      .catch(err => {
        expect(err).to.not.be.null;
        done();
      });
  });
});
