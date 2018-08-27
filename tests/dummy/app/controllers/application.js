import Controller from '@ember/controller'
import RSVP from 'rsvp'
import { get, set } from '@ember/object'

export default Controller.extend({

  deferred: undefined,

  actions: {
    startTask() {
      set(this, 'deferred', RSVP.defer())
    },

    resolve() {
      get(this, 'deferred').resolve()
    },

    reject() {
      get(this, 'deferred').reject()
    }
  }

})
