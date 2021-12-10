import Controller from '@ember/controller'
import RSVP from 'rsvp'
import { action, get, set } from '@ember/object'

export default Controller.extend({

  deferred: undefined,

  startTask: action(function() {
    set(this, 'deferred', RSVP.defer())
  }),

  resolve: action(function() {
    get(this, 'deferred').resolve()
  }),

  reject: action(function() {
    get(this, 'deferred').reject()
  }),

})
