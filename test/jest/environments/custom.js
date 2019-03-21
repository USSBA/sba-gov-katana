const JsDomEnvironment = require('jest-environment-jsdom')

class CustomEnvironment extends JsDomEnvironment {
  constructor (config, context) {
    super(
      {
        ...config,
        testEnvironmentOptions: {
          beforeParse(window) {
            // address "Not implemented: window.scrollTo" error
            /* eslint-disable-next-line no-param-reassign */
            window.scrollTo = () => {}
          }
        }
      },
      context
    )

    // modify jsdom environment through jest
    this.global.jsdom = this.dom
  }

  teardown () {
    this.global.jsdom = null
    return super.teardown()
  }
}

module.exports = CustomEnvironment
