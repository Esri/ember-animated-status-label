import EmberObject from '@ember/object'
import FadableMixin from '../../../mixins/fadable'
import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Mixin | fadable', function(hooks) {
  setupTest(hooks)

  test('it works', function(assert) {
    let FadableObject = EmberObject.extend(FadableMixin)
    let subject = FadableObject.create()
    assert.ok(subject)
  })
})
