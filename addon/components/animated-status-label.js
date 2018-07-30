import Component from '@ember/component'
import Fadable from '../mixins/fadable'
import layout from '../templates/components/animated-status-label'
import { computed, get, set } from '@ember/object'
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
    set(this, 'status', get(this, 'promise') ? StatusLabelState.PENDING : StatusLabelState.SETTLED)
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
      return yield get(this, '_transitionToStateTask').perform(StatusLabelState.SETTLED)
    }
    yield get(this, '_transitionToStateTask').perform(StatusLabelState.PENDING)
    try {
      yield promise
      yield get(this, '_transitionToStateTask').perform(StatusLabelState.CONFIRMING)
      yield timeout(get(this, 'confirmationDuration'))
      yield get(this, '_transitionToStateTask').perform(StatusLabelState.SETTLED)
    } catch (error) {
      yield get(this, '_transitionToStateTask').perform(StatusLabelState.SETTLED)
    }
  }).restartable(),

  _transitionToStateTask: task(function* (state) {
    if (get(this, 'status') === state) {
      return
    }
    yield this.fadeOut()
    if (get(this, 'status') === StatusLabelState.CONFIRMING && state === StatusLabelState.SETTLED) {
      this.onConfirmationFinished()
    }
    set(this, 'status', state)
    yield this.fadeIn()
  }).enqueue()

})
