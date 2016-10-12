# thenction [![npm](https://img.shields.io/npm/v/thenction.svg?style=flat-square)](https://www.npmjs.com/package/thenction) [![Travis](https://img.shields.io/travis/MakeNowJust/thenction.svg?style=flat-square)](https://travis-ci.org/MakeNowJust/thenction)

> thenction is an abbreviation of thenable function.

## Install

```console
$ npm i -S thenction
```

## Usage

```javascript
const thenction = require('thenction')(Promise)
// or: const thenction = require('thenction')(require('your-favorite-promise-lib'))

const twiceLog = thenction(value => value * 2).then(value => (console.log(value), value))

Promise.resolve(2).then(twiceLog)
//=> 4

twiceLog(2).then(value => console.log(value))
//=> 4
//=> 4

Promise.resolve(2).then(twiceLog.then(twiceLog))
//=> 4
//=> 8

const twiceLogSleep = twiceLog
  .then(value => new Promise(resolve => setTimeout(resolve, 1000, value)))

Promise.resolve(2).then(twiceLogSleep).then(twiceLog)
//=> 4
// after 1s
//=> 8

const twiceLogError = twiceLog
  .then(value => { throw new Error('wow') })
  .catch(error => console.log(error))

Promise.resolve(2).then(twiceLogError)
//=> 4
//=> Error: wow
```

## API

### thenction(baseFn)

Returns a **thenable function**.

#### baseFn

Type: `Function`

Base function to be composed by `then` and `catch`.

### thenableFunction.then(onFullfilled, [onRejected])

#### onFullfilled

Type: `Function`

#### onRejected

Type: `Function`

### thenableFunction.catch(onRejected)

#### onRejected

Type: `Function`

## License

MIT © [TSUYUSATO Kitsune](https://quine.codes)
