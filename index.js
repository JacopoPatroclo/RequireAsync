const { readFile } = require('fs');
const vm = require('vm');
const pat = require('path');

class RequireAsync {
  constructor(path = '') {
    this.path = path;
    let prev = Error.prepareStackTrace;
    Error.prepareStackTrace = (err, callSite) => {
      this.basePath = pat.resolve(
        pat.dirname(callSite[1].getFileName()),
        this.path
      );
      return callSite;
    };
    let error = new Error();
    error.stack;
    Error.prepareStackTrace = prev;
  }

  resolve() {
    return new Promise((res, rej) => {
      if (this.resolved) {
        res(this.resolved);
      } else {
        try {
          if (this.path.indexOf('/') !== -1) {
            readFile(this.basePath + '.js', (err, data) => {
              if (err) {
                rej(new Error('Error loading module ' + this.path));
              } else {
                const sandbox = vm.createContext({ module: {} });
                vm.runInContext(data, sandbox);
                this.resolved = sandbox.module.exports;
                res(sandbox.module.exports);
              }
            });
          } else {
            let standardModule = require(this.path);
            res(standardModule);
          }
        } catch (error) {
          rej(new Error('Error loading module ' + this.path));
        }
      }
    });
  }
}

module.exports = RequireAsync;
