import Component from '@ember/component'
import Fadable from '../mixins/fadable'
import layout from '../templates/components/animated-status-label'
import { get, set } from '@ember/object'
import { task, timeout } from 'ember-concurrency'

export const SETTLED = 'settled'
export const PENDING = 'pending'
export const CONFIRMING = 'confirming'

export default Component.extend(Fadable, {
  layout,

  classNames: [ 'animated-status-label' ],

  confirmationDuration: 1500,
  promise: undefined,

  labelState: undefined,
  fadeOutAnimationName: 'animated-status-label-fade-out',
  fadeInAnimationName: 'animated-status-label-fade-in',

  _activePromise: undefined,

  onConfirmationFinished() {},

  init() {
    this._super(...arguments)
    set(this, 'labelState', get(this, 'promise') ? PENDING : SETTLED)
  },

  didReceiveAttrs() {
    this._super(...arguments)
    if (get(this, 'promise') !== get(this, '_activePromise')) {
      get(this, '_animateTask').perform(get(this, 'promise'))
    }
  },

  _animateTask: task(function* (promise) {
    set(this, '_activePromise', promise)
    if (!promise) {
      return yield get(this, '_transitionToStateTask').perform(SETTLED)
    }
    yield get(this, '_transitionToStateTask').perform(PENDING)
    try {
      yield promise
      yield get(this, '_transitionToStateTask').perform(CONFIRMING)
      yield timeout(get(this, 'confirmationDuration'))
      this.onConfirmationFinished()
      yield get(this, '_transitionToStateTask').perform(SETTLED)
    } catch (error) {
      yield get(this, '_transitionToStateTask').perform(SETTLED)
    }
  }).restartable(),

  _transitionToStateTask: task(function* (state) {
    if (get(this, 'labelState') === state) {
      return
    }
    yield this.fadeOut()
    set(this, 'labelState', state)
    yield this.fadeIn()
  }).enqueue()

})
