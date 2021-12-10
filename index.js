'use strict'

module.exports = {
  name: require('./package').name,

  included(app) {
    app.import('vendor/animated-status-label.css')
  },
}
