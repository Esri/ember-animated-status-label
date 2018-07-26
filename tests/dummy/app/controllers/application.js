import Controller from '@ember/controller'
import { get, set } from '@ember/object'
import { task, timeout } from 'ember-concurrency'

export default Controller.extend({

  testTaskInstance: undefined,

  actions: {
    testSuccess() {
      set(this, 'testTaskInstance', get(this, '_testTask').perform(true))
    },

    testError() {
      set(this, 'testTaskInstance', get(this, '_testTask').perform(false))
    }
  },

  _testTask: task(function* (shouldSucceed) {
    yield timeout(2000)
    if (!shouldSucceed) {
      throw 'error!'
    }
  }),

})
