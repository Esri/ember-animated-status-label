import Controller from '@ember/controller'
import RSVP from 'rsvp'
import { action, set } from '@ember/object'

export default Controller.extend({

  deferred: undefined,

  startTask: action(function() {
    set(this, 'deferred', RSVP.defer())
  }),

  resolve: action(function() {
    this.deferred.resolve()
  }),

  reject: action(function() {
    this.deferred.reject()
  }),

})
