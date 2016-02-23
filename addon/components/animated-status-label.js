import Ember from 'ember';
import Fadable from '../mixins/fadable';
import layout from '../templates/components/animated-status-label';

const { Component, computed, observer } = Ember;

const StatusLabelState = {
  SETTLED: 0,
  PENDING: 1,
  CONFIRMING: 2
};

export default Component.extend(Fadable, {

  layout,

  classNames: ['animated-status-label'],

  confirmationDuration: 1500,

  promise: null,

  pendingText: '',
  pendingClassName: '',

  confirmationText: '',
  confirmationClassName: '',
  confirmationIconName: 'check-circle',

  status: StatusLabelState.SETTLED,

  isSettled:    computed.equal('status', StatusLabelState.SETTLED),
  isPending:    computed.equal('status', StatusLabelState.PENDING),
  isConfirming: computed.equal('status', StatusLabelState.CONFIRMING),

  init() {
    this._super(...arguments);
    if (this.get('promise')) {
      this._animatePromise(this.get('promise'));
    }
  },

  _promiseChanged: observer('promise', function() {
    this._animatePromise(this.get('promise'));
  }),

  _animatePromise(promise) {
    if (promise) {
      this._fadeInPendingText()
        .then(() => promise)
        .then(() => this._fadeInConfirmationForTimePeriod(this.get('confirmationDuration')))
        .then(() => {
          if (this.attrs.confirmationAnimationFinished) {
            this.attrs.confirmationAnimationFinished();
          }
        })
        .catch(() => {
          this.fadeOut().then(() => {
            if (!this.get('isDestroyed')) {
              this.set('status', StatusLabelState.SETTLED);
              this.fadeIn();
            }
          });
        });
    } else {
      this.set('status', StatusLabelState.SETTLED);
    }
  },

  _fadeInPendingText() {
    this.set('status', StatusLabelState.PENDING);
    return this.fadeIn();
  },

  _fadeInConfirmationForTimePeriod(timePeriod) {
    return this.fadeOut()
      .then(() => this.set('status', StatusLabelState.CONFIRMING))
      .then(() => this.fadeIn())
      .then(() => this._showConfirmationForTimePeriod(timePeriod));
  },

  _showConfirmationForTimePeriod(timePeriod) {
    return this._delay(timePeriod)
      .then(() => this.fadeOut())
      .then(() => this.set('status', StatusLabelState.SETTLED))
      .then(() => this.fadeIn());
  }

});
