import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startApp from '../../helpers/start-app';

const { RSVP, run } = Ember;

moduleForComponent('animated-status-label', 'Integration | Component | animated status label', {
  integration: true,
  beforeEach() {
    window.APP = startApp();

    this.set('pendingText', 'PENDING');
    this.set('confirmationText', 'CONFIRMATION');
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{animated-status-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#animated-status-label}}
      template block text
    {{/animated-status-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('when the promise is null, the component yields', function(assert) {
  assert.expect(1);

  this.render(hbs`
   {{#animated-status-label}}
     yielded content
   {{/animated-status-label}}
  `);

  assert.equal(this.$().text().trim(), 'yielded content');
});

test('pending text shown when promise is pending', function(assert) {
  assert.expect(1);

  this.set('promise', new RSVP.Promise(() => {}));

  this.render(hbs`
   {{#animated-status-label
     promise=promise
     pendingText=pendingText}}
     yielded content
   {{/animated-status-label}}
  `);

  andThen(() => {
    assert.equal(this.$().text().trim(), 'PENDING');
  });
});

test('confirmation text shown when promise is resolved', function(assert) {
  assert.expect(1);

  this.set('promise', RSVP.resolve());

  this.render(hbs`
   {{#animated-status-label
     promise=promise
     pendingText=pendingText
     confirmationText=confirmationText
     fadeAnimationDuration=0}}
     yielded content
   {{/animated-status-label}}
  `);

  andThen(() => {
    assert.equal(this.$().text().trim(), 'CONFIRMATION');
  });
});

test('label yields after confirmation is complete', function(assert) {
  assert.expect(1);

  this.set('promise', RSVP.resolve());

  this.render(hbs`
   {{#animated-status-label
     promise=promise
     pendingText=pendingText
     confirmationText=confirmationText
     fadeAnimationDuration=0
     confirmationDuration=0}}
     yielded content
   {{/animated-status-label}}
  `);

  andThen(() => {
    assert.equal(this.$().text().trim(), 'yielded content');
  });
});

test('label yields when promise is rejected', function(assert) {
  assert.expect(1);

  this.set('promise', RSVP.reject());

  this.render(hbs`
   {{#animated-status-label
     promise=promise
     pendingText=pendingText
     confirmationText=confirmationText
     fadeAnimationDuration=0}}
     yielded content
   {{/animated-status-label}}
  `);

  let done = assert.async();
  run.next(() => {
    assert.equal(this.$().text().trim(), 'yielded content');
    done();
  });
});
