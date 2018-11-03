# RequireAsync

RequireAsync è una piccola utility per l'importazione asincrona di moduli per NodeJs.

## Introduzione

Il problema che questa piccola libreria cerca di risolvere è quello di minimizzare il costo dell'avvio di servizi sviluppati in NodeJs posticipando l'esecuzione e l'importazione di moduli.

## Utlizzo

Al fine di utilizzare l'import dinamico è necessario creare un istanza di RequireAsync passando il percorso del modulo che si desidera importare relativo al file nel quale si chiama il costruttore

```javascript
const RequireAsync = require('../index');
const moduleReq = new RequireAsync('../your/module');

// do stuff

moduleReq
  .require()
  .then(module => {
    // do stuff with your module
  })
  .catch(err => {
    // handle error
  });
```

Questo tipo di approccio permette anche la creazone di import multipli in contemporanea

```javascript
const RequireAsync = require('../index');
const module1Req = new RequireAsync('../your/module1');
const module2Req = new RequireAsync('../your/module2');
const module3Req = new RequireAsync('../your/module3');
const module4Req = new RequireAsync('../your/module4');

Promise.all([
  module1Req.require(),
  module2Req.require(),
  module3Req.require(),
  module4Req.require()
])
  .then([...module1, ...module2, ...module3, ...module4] => {
    // do stuff with your modules
  })
  .catch(err => {
    // handle error
  });
```

## Sviluppo

TODO:

- [ ] Implementare un sistema di cacheing di moduli pre caricati

## Struttura

Il sorgente è contenuto per la sua totalità in index.js e i test sono contenuti in test/index.js

## Autori

- **Jacopo Martinelli** - _Initial work_ - [JacopoPatroclo](https://github.com/JacopoPatroclo)
