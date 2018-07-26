import RSVP from 'rsvp'
import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, waitUntil } from '@ember/test-helpers'
import { setProperties } from '@ember/object'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | animated-status-label', function(hooks) {
  setupRenderingTest(hooks)

  hooks.beforeEach(function() {
    setProperties(this, {
      pendingContent: 'PENDING',
      confirmationContent: 'CONFIRMATION',
      settledContent: 'SETTLED',
      confirmationDuration: 0
    })
    this.renderComponent = async props => {
      setProperties(this, props)
      await render(hbs`
        {{#animated-status-label promise=promise confirmationDuration=confirmationDuration as |labelState|}}
          {{#if (eq labelState 'settled')}}
            {{settledContent}}
          {{else if (eq labelState 'pending')}}
            {{pendingContent}}
          {{else if (eq labelState 'confirming')}}
            {{confirmationContent}}
          {{/if}}
        {{/animated-status-label}}
      `)
    }
  })

  test('when the promise is undefined, the component shows settled text', async function(assert) {
    await this.renderComponent({ promise: undefined })
    assert.equal(this.element.textContent.trim(), this.settledContent)
  })

  test('it handles resolving promises', async function(assert) {
    await this.renderComponent({ promise: new RSVP.resolve() })
    assert.equal(this.element.textContent.trim(), this.settledContent, 'initially shows settled content')
    await waitUntil(() => this.element.textContent.trim() !== this.settledContent)
    assert.equal(this.element.textContent.trim(), this.pendingContent, 'transitions to pending content')
    await waitUntil(() => this.element.textContent.trim() !== this.pendingContent)
    assert.equal(this.element.textContent.trim(), this.confirmationContent, 'transitions to confirmation content')
    await waitUntil(() => this.element.textContent.trim() !== this.confirmationContent)
    assert.equal(this.element.textContent.trim(), this.settledContent, 'transitions to settled content')
  })

  test('it handles rejecting promises', async function(assert) {
    await this.renderComponent({ promise: new RSVP.reject() })
    assert.equal(this.element.textContent.trim(), this.settledContent, 'initially shows settled content')
    await waitUntil(() => this.element.textContent.trim() !== this.settledContent)
    assert.equal(this.element.textContent.trim(), this.pendingContent, 'transitions to pending content')
    await waitUntil(() => this.element.textContent.trim() !== this.pendingContent)
    assert.equal(this.element.textContent.trim(), this.settledContent, 'transitions to settled content')
  })
})
