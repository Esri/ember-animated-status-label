import Mixin from '@ember/object/mixin'
import { get, set } from '@ember/object'
import { on } from '@ember/object/evented'
import { task, waitForProperty } from 'ember-concurrency'

export default Mixin.create({

  classNameBindings: [ '_isFadingIn:fade-in', '_isFadingOut:fade-out' ],
  _isFadingIn: false,
  _isFadingOut: false,

  fadeInAnimationName: undefined,
  fadeOutAnimationName: undefined,

  _observeAnimationEnd: on('didInsertElement', function() {
    this.element.addEventListener('animationend', event => {
      if (event.animationName === get(this, 'fadeInAnimationName')) {
        set(this, '_isFadingIn', false)
      } else if (event.animationName === get(this, 'fadeOutAnimationName')) {
        set(this, '_isFadingOut', false)
      }
    })
  }),

  fadeOut() {
    return get(this, '_fadeOutTask').perform()
  },

  fadeIn() {
    return get(this, '_fadeInTask').perform()
  },

  _fadeOutTask: task(function* () {
    set(this, '_isFadingOut', true)
    yield waitForProperty(this, '_isFadingOut', false)
  }),

  _fadeInTask: task(function* () {
    set(this, '_isFadingIn', true)
    yield waitForProperty(this, '_isFadingIn', false)
  })

})
