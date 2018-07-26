import Controller from '@ember/controller'
import { get, set, setProperties } from '@ember/object'
import { task, waitForProperty } from 'ember-concurrency'

export default Controller.extend({

  testTaskInstance: undefined,

  actions: {
    startTask() {
      set(this, 'isSettled', false)
      set(this, 'testTaskInstance', get(this, '_testTask').perform())
    },

    resolve() {
      setProperties(this, {
        isSettled: true,
        shouldError: false
      })
    },

    reject() {
      setProperties(this, {
        isSettled: true,
        shouldError: true
      })
    }
  },

  _testTask: task(function* () {
    yield waitForProperty(this, 'isSettled', true)
    if (get(this, 'shouldError')) {
      throw 'error!'
    }
  }).restartable(),

})
