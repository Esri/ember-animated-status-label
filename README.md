# Ember Animated Status Label
[![Build Status](https://travis-ci.org/Esri/ember-animated-status-label.svg?branch=master)](https://travis-ci.org/Esri/ember-animated-status-label) [![Ember Observer Score](https://emberobserver.com/badges/ember-animated-status-label.svg)](https://emberobserver.com/addons/ember-animated-status-label) [![Dependency Status](https://david-dm.org/esri/ember-animated-status-label.svg)](https://david-dm.org/esri/ember-animated-status-label) [![Code Climate](https://codeclimate.com/github/Esri/ember-animated-status-label/badges/gpa.svg)](https://codeclimate.com/github/Esri/ember-animated-status-label)

The ember-animated-status-label addon provides a component that will show different labels that correspond to the pending, recently-settled, and settled promise states. This component also provides a subtle animated transition between each state.

The component transitions between three states to reflect the state of the promise: `Pending`, `Confirming`, and `Settled`.  When provided with a new promise, the component will transition to the `Pending` state.  If the promise resolves, it will transition to the `Confirming` state for a short time to show some confirmation content.  After showing the confirmation, or if the original promise rejects, the component will transition to the `Settled` state.

The component yields a hash that indicates the current state, through `isPending`, `isConfirming`, and `isSettled` properties.  The host app must supply the content that will be shown in each of those states.

## Demo

![alt text](https://raw.githubusercontent.com/esri/ember-animated-status-label/master/blob/demo.gif "Animated Status Label Demo")

## Including in an application

Here is the simplest way to get started with ember-animated-status-label:

```sh
ember install ember-animated-status-label
```

**application.hbs**
```htmlbars
{{#animated-status-label promise=promise as |label|}}
  {{#if label.isPending}}
    <span>This text displays before the promise has resolved.</span>
  {{else if label.isConfirming}}
    <span>This text displays for a short time after the promise has resolved.</span>
  {{else if label.isSettled}}
    <span>This text displays when the promise has settled.</span>
  {{/if}}
{{/animated-status-label}}
```

## Configurable Properties

### animated-status-label

The animated-status-label component supports the following properties:

Property               | Purpose
---------------------  | -------------
`promise`              | A [Promises/A+](https://promisesaplus.com/) compliant implementation.
`confirmationDuration` | The amount of time we should show the confirmation content after the promise resolves, in milliseconds.  Defaults to 1500.
`onConfirmationFinished`| An action to be called after the confirmation animation has completed.

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
