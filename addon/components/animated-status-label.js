import Component from '@ember/component'
import Fadable from '../mixins/fadable'
import layout from '../templates/components/animated-status-label'
import { computed, get, observer, set } from '@ember/object'

const StatusLabelState = {
  SETTLED: 0,
  PENDING: 1,
  CONFIRMING: 2
}

export default Component.extend(Fadable, {

  layout,

  classNames: [ 'animated-status-label' ],

  confirmationDuration: 1500,

  promise: null,

  pendingText: '',
  pendingClassName: '',

  confirmationText: '',
  confirmationClassName: '',
  confirmationIconName: 'check-circle',

  isSettled: computed.equal('status', StatusLabelState.SETTLED),
  isPending: computed.equal('status', StatusLabelState.PENDING),
  isConfirming: computed.equal('status', StatusLabelState.CONFIRMING),

  _promiseChanged: observer('promise', function() {
    this._animatePromise(get(this, 'promise'))
  }),

  init() {
    this._super(...arguments)
    if (get(this, 'promise')) {
      this._animatePromise(get(this, 'promise'))
    }
  },

  _animatePromise(promise) {
    if (promise) {
      this._fadeInPendingText()
        .then(() => promise)
        .then(() => this._fadeInConfirmationForTimePeriod(get(this, 'confirmationDuration')))
        .then(() => {
          if (get(this, 'confirmationAnimationFinished')) {
            get(this, 'confirmationAnimationFinished')()
          }
        })
        .catch(() => {
          this.fadeOut().then(() => {
            if (!get(this, 'isDestroyed')) {
              set(this, 'status', StatusLabelState.SETTLED)
              this.fadeIn()
            }
          })
        })
    } else {
      set(this, 'status', StatusLabelState.SETTLED)
    }
  },

  _fadeInPendingText() {
    set(this, 'status', StatusLabelState.PENDING)
    return this.fadeIn()
  },

  _fadeInConfirmationForTimePeriod(timePeriod) {
    return this.fadeOut()
      .then(() => set(this, 'status', StatusLabelState.CONFIRMING))
      .then(() => this.fadeIn())
      .then(() => this._showConfirmationForTimePeriod(timePeriod))
  },

  _showConfirmationForTimePeriod(timePeriod) {
    return this._delay(timePeriod)
      .then(() => this.fadeOut())
      .then(() => set(this, 'status', StatusLabelState.SETTLED))
      .then(() => this.fadeIn())
  },

  status: StatusLabelState.SETTLED,

})
