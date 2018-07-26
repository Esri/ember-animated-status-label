import Component from '@ember/component'
import layout from '../templates/components/animated-status-label'
import { get, set } from '@ember/object'
import { task, timeout, waitForProperty } from 'ember-concurrency'

export const SETTLED = 'settled'
export const PENDING = 'pending'
export const CONFIRMING = 'confirming'

export default Component.extend({
  layout,

  classNames: [ 'animated-status-label' ],
  classNameBindings: [ '_isFadingIn:fade-in', '_isFadingOut:fade-out' ],

  confirmationDuration: 1500,

  promise: undefined,

  labelState: SETTLED,

  _activePromise: undefined,
  _isFadingIn: false,
  _isFadingOut: false,

  didReceiveAttrs() {
    this._super(...arguments)
    if (get(this, 'promise') !== get(this, '_activePromise')) {
      this._animateTask.perform(get(this, 'promise'))
    }
  },

  didInsertElement() {
    this._super(...arguments)
    this.element.addEventListener('animationend', event => {
      if (event.animationName === 'animated-status-label-fade-in') {
        set(this, '_isFadingIn', false)
      } else if (event.animationName === 'animated-status-label-fade-out') {
        set(this, '_isFadingOut', false)
      }
    })
  },

  _animateTask: task(function* (promise) {
    set(this, '_activePromise', promise)
    if (!promise) {
      return yield this._transitionToStateTask.perform(SETTLED)
    }
    yield this._transitionToStateTask.perform(PENDING)
    try {
      yield promise
    } catch (error) {
      yield this._transitionToStateTask.perform(SETTLED)
      throw error
    }
    yield this._transitionToStateTask.perform(CONFIRMING)
    yield timeout(get(this, 'confirmationDuration'))
    yield this._transitionToStateTask.perform(SETTLED)
  }).restartable(),

  _transitionToStateTask: task(function* (state) {
    if (get(this, 'labelState') === state) {
      return
    }
    yield this._fadeOutTask.perform()
    set(this, 'labelState', state)
    yield this._fadeInTask.perform()
  }).enqueue(),

  _fadeOutTask: task(function* () {
    set(this, '_isFadingOut', true)
    yield waitForProperty(this, '_isFadingOut', false)
  }),

  _fadeInTask: task(function* () {
    set(this, '_isFadingIn', true)
    yield waitForProperty(this, '_isFadingIn', false)
  })

})
