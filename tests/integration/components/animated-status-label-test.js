import RSVP from 'rsvp'
import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | animated-status-label', function(hooks) {
  setupRenderingTest(hooks)

  hooks.beforeEach(function() {
    this.set('pendingText', 'PENDING')
    this.set('confirmationText', 'CONFIRMATION')
  })

  test('it renders', async function(assert) {
    await render(hbs`{{animated-status-label}}`)
    assert.equal(this.element.textContent.trim(), '')

    await render(hbs`
      {{#animated-status-label}}
        template block text
      {{/animated-status-label}}
    `)
    assert.equal(this.element.textContent.trim(), 'template block text')
  })

  test('when the promise is null, the component yields', async function(assert) {
    assert.expect(1)

    await render(hbs`
     {{#animated-status-label}}
       yielded content
     {{/animated-status-label}}
    `)

    assert.equal(this.element.textContent.trim(), 'yielded content')
  })

  test('pending text shown when promise is pending', async function(assert) {
    assert.expect(1)

    this.set('promise', new RSVP.Promise(() => {}))

    await render(hbs`
     {{#animated-status-label
       promise=promise
       pendingText=pendingText}}
       yielded content
     {{/animated-status-label}}
    `)
    assert.equal(this.element.textContent.trim(), 'PENDING')
  })

  test('confirmation text shown when promise is resolved', async function(assert) {
    assert.expect(1)

    this.set('promise', RSVP.resolve())

    await render(hbs`
     {{#animated-status-label
       promise=promise
       pendingText=pendingText
       confirmationText=confirmationText
       fadeAnimationDuration=0}}
       yielded content
     {{/animated-status-label}}
    `)
    assert.equal(this.element.textContent.trim(), 'CONFIRMATION')
  })

  test('label yields after confirmation is complete', async function(assert) {
    assert.expect(1)

    this.set('promise', RSVP.resolve())

    await render(hbs`
     {{#animated-status-label
       promise=promise
       pendingText=pendingText
       confirmationText=confirmationText
       fadeAnimationDuration=0
       confirmationDuration=0}}
       yielded content
     {{/animated-status-label}}
    `)
    assert.equal(this.element.textContent.trim(), 'yielded content')
  })

  test('label yields when promise is rejected', async function(assert) {
    assert.expect(1)

    this.set('promise', RSVP.reject())

    await render(hbs`
     {{#animated-status-label
       promise=promise
       pendingText=pendingText
       confirmationText=confirmationText
       fadeAnimationDuration=0}}
       yielded content
     {{/animated-status-label}}
    `)
    assert.equal(this.element.textContent.trim(), 'yielded content')
  })
})
