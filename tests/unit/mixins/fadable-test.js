import Ember from 'ember'
import FadableMixin from '../../../mixins/fadable'
import { module, test } from 'qunit'

const { Object: EmberObject } = Ember

module('Unit | Mixin | fadable')

// Replace this with your real tests.
test('it works', function(assert) {
  let FadableObject = EmberObject.extend(FadableMixin)
  let subject = FadableObject.create()
  assert.ok(subject)
})
