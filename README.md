# Ember Animated Status Label 
[![Build Status](https://travis-ci.org/Esri/ember-animated-status-label.svg?branch=master)](https://travis-ci.org/Esri/ember-animated-status-label) [![Ember Observer Score](http://emberobserver.com/badges/ember-animated-status-label.svg)](http://emberobserver.com/addons/ember-animated-status-label) [![Dependency Status](https://david-dm.org/esri/ember-animated-status-label.svg)](https://david-dm.org/esri/ember-animated-status-label) [![Code Climate](https://codeclimate.com/github/Esri/ember-animated-status-label/badges/gpa.svg)](https://codeclimate.com/github/Esri/ember-animated-status-label)

The ember-animated-status-label addon provides a component that will show different labels that correspond to the pending and recently-settled promise states. This component also provides a subtle animated transition between each state. If the promise has settled the component will yield.

At a high level, this component will produce the following markup for the aforementioned states:

![alt text](https://raw.githubusercontent.com/jrowlingson/ember-animated-status-label/master/blob/label-states.png "Label States")

## Demo

![alt text](https://raw.githubusercontent.com/jrowlingson/ember-animated-status-label/master/blob/demo.gif "Animated Status Label Demo")

## Including in an application

Here is the simplest way to get started with ember-animated-status-label:

```sh
ember install ember-animated-status-label
ember install ember-cli-sass
ember install ember-cli-font-awesome
```

*Note:* Ember CLI versions < 0.2.3 should use `ember install:addon` instead of `ember install`

**app.sass**
```sass
@import animated-status-label
```

**application.hbs**
```htmlbars
{{# animated-status-label
      promise=promise
      pendingText='operation pending'
      confirmationText='opeartion has completed' }}
  <p>This text displays when the promise has settled.</p>
{{/ animated-status-label }}
```

## Configurable Properties

### animated-status-label

The animated-status-label component supports the following properties:

Property               | Purpose
---------------------  | -------------
`promise`              | A [Promises/A+](https://promisesaplus.com/) compliant implementation.
`pendingText`          | Text that will display while the promise is in a pending state.
`confirmationText`     | Text that will display immediately after the promise enters a settled state.
`pendingClassName`     | CSS class name(s) to append to container span during pending state.
`confirmationClassName`| CSS class name(s) to append to container span immediately after the promise enters a settled state.
`confirmationAnimationFinished`| An action to be called after the confirmation animation has completed.
`confirmationIconName` | FontAwesome icon name to use for the confirmation icon.

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
