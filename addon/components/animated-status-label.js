/* eslint-disable ember/no-mixins */
import Component from '@ember/component'
import Fadable from '../mixins/fadable'
import layout from '../templates/components/animated-status-label'
import { computed, set } from '@ember/object'
import { task, timeout } from 'ember-concurrency'

const StatusLabelState = {
  SETTLED: 0,
  PENDING: 1,
  CONFIRMING: 2
}

export default Component.extend(Fadable, {
  layout,

  classNames: [ 'animated-status-label' ],

  confirmationDuration: 1500,
  promise: undefined,

  status: undefined,
  fadeOutAnimationName: 'animated-status-label-fade-out',
  fadeInAnimationName: 'animated-status-label-fade-in',

  _activePromise: undefined,

  onConfirmationFinished() {},

  isSettled: computed.equal('status', StatusLabelState.SETTLED),
  isPending: computed.equal('status', StatusLabelState.PENDING),
  isConfirming: computed.equal('status', StatusLabelState.CONFIRMING),

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
    yield this.fadeOut()
    if (this.status === StatusLabelState.CONFIRMING && state === StatusLabelState.SETTLED) {
      this.onConfirmationFinished()
    }
    set(this, 'status', state)
    yield this.fadeIn()
  }).enqueue()

})
