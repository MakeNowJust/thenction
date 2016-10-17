'use strict'

function bind(thenction) {
  thenction.then = thenMethod
  thenction.catch = catchMethod
  return thenction
}

function thenMethod(onFulfilled, onRejected) {
  return bind(value => this(value).then(onFulfilled, onRejected))
}

function catchMethod(onRejected) {
  return bind(value => this(value).catch(onRejected))
}

module.exports = Promise =>
  baseFn => bind(value => new Promise(resolve => resolve(baseFn(value))))
