# Ember Animated Status Label

The ember-animated-status-label addon provides a component that will show different labels that correspond to the pending recently-settled promise states. This component also provides a subtle animated transition between each state. If the promise has settled the component will yield.

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

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Contributing

Find an issue? Let us know! Contributions from anyone and everyone are welcome. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2015 [Esri](http://www.esri.com/)

Licensed under The MIT License(MIT);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE.md](LICENSE.md) file.

## Credits

Contributions from @timmorey and @jrowlingson.

[](Esri Tags: Web HTML Ember Promise)
[](Esri Language: JavaScript)