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

  taskInstance: undefined,

  labelState: SETTLED,

  _activeTaskInstance: undefined,
  _isFadingIn: false,
  _isFadingOut: false,

  didReceiveAttrs() {
    this._super(...arguments)
    if (get(this, 'taskInstance') !== get(this, '_activeTaskInstance')) {
      this._animateTask.perform(get(this, 'taskInstance'))
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

  _animateTask: task(function* (taskInstance) {
    set(this, '_activeTaskInstance', taskInstance)
    if (!taskInstance) {
      return yield this._transitionToStateTask.perform(SETTLED)
    }
    if (!get(taskInstance, 'isFinished')) {
      yield this._transitionToStateTask.perform(PENDING)
      yield waitForProperty(taskInstance, 'isFinished', true)
    }
    if (get(taskInstance, 'isSuccessful')) {
      yield this._transitionToStateTask.perform(CONFIRMING)
      yield timeout(get(this, 'confirmationDuration'))
    }
    yield this._transitionToStateTask.perform(SETTLED)
    set(this, '_activeTaskInstance', undefined)
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
