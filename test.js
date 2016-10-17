import test from 'ava'
import makeThenction from '.'

const thenction = makeThenction(Promise)

const id = value => value
const twice = value => value * 2
const wait = value => new Promise(resolve => setTimeout(resolve, 0, value))
const raise = value => {
  throw value
}

test('thenction() is callable', t => {
  t.is(typeof thenction, 'function')
  t.is(typeof thenction(twice), 'function')
})

test('thenction() has methods like Promise', t => {
  t.is(typeof thenction(twice).then, 'function')
  t.is(typeof thenction(twice).catch, 'function')
})

test('thenction().then() works like Promise', async t => {
  t.is(await Promise.resolve(2).then(thenction(twice).then(twice)), 8)
  t.is(await thenction(twice).then(twice)(2), 8)
  t.is(await Promise.resolve(2).then(thenction(twice).then(wait)), 4)
  t.is(await Promise.resolve(2).then(thenction(twice).then(raise).then(id, twice)), 8)
  t.is(await Promise.resolve(2).then(thenction(twice).then(thenction(raise).then(id, twice))), 8)
})

test('thenction().catch() works like Promise', async t => {
  t.is(await Promise.resolve(2).then(thenction(twice).then(raise).catch(twice)), 8)
  t.is(await Promise.resolve(2).then(thenction(twice).then(thenction(raise).catch(twice))), 8)
})
