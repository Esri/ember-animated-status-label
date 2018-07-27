import Component from '@ember/component'
import FadableMixin from 'ember-animated-status-label/mixins/fadable'
import hbs from 'htmlbars-inline-precompile'
import { module, test } from 'qunit'
import { render } from '@ember/test-helpers'
import { setupRenderingTest } from 'ember-qunit'

module('Unit | Mixin | fadable', function(hooks) {
  setupRenderingTest(hooks)

  test('it works', async function (assert) {
    this.owner.register('component:fadable-component', Component.extend(FadableMixin))
    await render(hbs`{{fadable-component}}`)
    assert.equal(this.element.textContent.trim(), '')
  })
})
