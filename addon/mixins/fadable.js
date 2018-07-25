import Ember from 'ember'
const { Mixin, run, RSVP: { Promise } } = Ember

export default Mixin.create({

  classNameBindings: [ 'shouldFadeIn:fade-in', 'shouldFadeOut:fade-out' ],
  shouldFadeIn: false,
  shouldFadeOut: false,

  fadeAnimationDuration: 200,

  fadeOut() {
    return this._fade({ fadeIn: false })
  },

  fadeIn() {
    return this._fade({ fadeIn: true })
  },

  _fade({ fadeIn }) {
    if (!Ember.get(this, 'isDestroyed')) {
      Ember.setProperties(this, { shouldFadeIn: fadeIn, shouldFadeOut: !fadeIn })
      return this._delay(Ember.get(this, 'fadeAnimationDuration')).then(() => {
        Ember.setProperties(this, { shouldFadeIn: false, shouldFadeOut: false })
      })
    }
  },

  _delay(timePeriod) {
    return new Promise(resolve => {
      // We only do a run.later if the timePeriod is > 0, which makes it easier
      // to test this component.  We can inject 0 delays when testing, which
      // makes code run synchronously.
      //
      if (timePeriod > 0) {
        run.later(resolve, timePeriod)
      } else {
        resolve()
      }
    })
  }

})
