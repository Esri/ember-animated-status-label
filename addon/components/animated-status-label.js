/* eslint-disable ember/no-classic-components */
/* eslint-disable ember/no-classic-classes */
/* eslint-disable ember/no-component-lifecycle-hooks */
/* eslint-disable ember/require-tagless-components */
import Component from '@ember/component'
import layout from '../templates/components/animated-status-label'
import { equal } from '@ember/object/computed'
import { set } from '@ember/object'
import { task, timeout, waitForProperty } from 'ember-concurrency'

const StatusLabelState = {
  SETTLED: 0,
  PENDING: 1,
  CONFIRMING: 2
}

export default Component.extend({
  layout,

  classNames: [ 'animated-status-label' ],
  classNameBindings: [ '_isFadingIn:fade-in', '_isFadingOut:fade-out' ],

  confirmationDuration: 1500,
  promise: undefined,

  status: undefined,
  fadeOutAnimationName: 'animated-status-label-fade-out',
  fadeInAnimationName: 'animated-status-label-fade-in',

  _activePromise: undefined,
  _isFadingIn: false,
  _isFadingOut: false,

  onConfirmationFinished() {},

  isSettled: equal('status', StatusLabelState.SETTLED),
  isPending: equal('status', StatusLabelState.PENDING),
  isConfirming: equal('status', StatusLabelState.CONFIRMING),

  init() {
    this._super(...arguments)
    set(this, 'status', this.promise ? StatusLabelState.PENDING : StatusLabelState.SETTLED)
  },

  didReceiveAttrs() {
    this._super(...arguments)
    if (this.promise !== this._activePromise) {
      this._animateTask.perform(this.promise)
    }
  },

  didInsertElement() {
    this._super(...arguments)
    this.element.addEventListener('animationend', event => {
      if (this._isFadingIn && event.animationName === this.fadeInAnimationName) {
        set(this, '_isFadingIn', false)
      } else if (this._isFadingOut && event.animationName === this.fadeOutAnimationName) {
        set(this, '_isFadingOut', false)
      }
    })
  },

  _fadeInTask: task(function* () {
    set(this, '_isFadingIn', true)
    yield waitForProperty(this, '_isFadingIn', false)
  }),

  _fadeOutTask: task(function* () {
    set(this, '_isFadingOut', true)
    yield waitForProperty(this, '_isFadingOut', false)
  }),

  _animateTask: task(function* (promise) {
    set(this, '_activePromise', promise)
    if (!promise) {
      return yield this._transitionToStateTask.perform(StatusLabelState.SETTLED)
    }
    yield this._transitionToStateTask.perform(StatusLabelState.PENDING)
    try {
      yield promise
      yield this._transitionToStateTask.perform(StatusLabelState.CONFIRMING)
      yield timeout(this.confirmationDuration)
      yield this._transitionToStateTask.perform(StatusLabelState.SETTLED)
    } catch (error) {
      yield this._transitionToStateTask.perform(StatusLabelState.SETTLED)
    }
  }).restartable(),

  _transitionToStateTask: task(function* (state) {
    if (this.status === state) {
      return
    }
    yield this._fadeOutTask.perform()
    if (this.status === StatusLabelState.CONFIRMING && state === StatusLabelState.SETTLED) {
      this.onConfirmationFinished()
    }
    set(this, 'status', state)
    yield this._fadeInTask.perform()
  }).enqueue()

})
