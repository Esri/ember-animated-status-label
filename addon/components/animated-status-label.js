import Component from '@ember/component'
import layout from '../templates/components/animated-status-label'
import { computed, get, set, setProperties } from '@ember/object'
import { task, timeout } from 'ember-concurrency'

const StatusLabelState = {
  SETTLED: 0,
  PENDING: 1,
  CONFIRMING: 2
}

export default Component.extend({
  layout,

  classNames: [ 'animated-status-label' ],
  classNameBindings: [ 'isFadingIn:fade-in', 'isFadingOut:fade-out' ],

  fadeAnimationDuration: 200,
  confirmationDuration: 1500,

  taskInstance: undefined,

  _activeTaskInstance: undefined,

  isSettled: computed.equal('_labelState', StatusLabelState.SETTLED),
  isPending: computed.equal('_labelState', StatusLabelState.PENDING),
  isConfirming: computed.equal('_labelState', StatusLabelState.CONFIRMING),

  didReceiveAttrs() {
    this._super(...arguments)
    if (get(this, 'taskInstance') !== get(this, '_activeTaskInstance')) {
      this._animateTask.perform(get(this, 'taskInstance'))
    }
  },

  _animateTask: task(function* (taskInstance) {
    set(this, '_activeTaskInstance', taskInstance)
    if (!taskInstance) {
      yield this._fadeToStateTask.perform(StatusLabelState.SETTLED)
      return
    }
    if ((get(taskInstance, 'state') === 'waiting' || get(taskInstance, 'state') === 'running')) {
      yield this._fadeToStateTask.perform(StatusLabelState.PENDING)
    }
    try {
      yield taskInstance
      yield this._fadeToStateTask.perform(StatusLabelState.CONFIRMING)
      yield timeout(get(this, 'confirmationDuration'))
    } finally {
      yield this._fadeToStateTask.perform(StatusLabelState.SETTLED)
      set(this, '_activeTaskInstance', undefined)
    }
  }).restartable(),

  _fadeToStateTask: task(function* (state) {
    if (get(this, '_labelState') === state) {
      return
    }
    setProperties(this, {
      isFadingIn: false,
      isFadingOut: true
    })
    yield timeout(this.fadeAnimationDuration)
    setProperties(this, {
      _labelState: state,
      isFadingIn: true,
      isFadingOut: false
    })
  }),

  _labelState: StatusLabelState.SETTLED,

})
