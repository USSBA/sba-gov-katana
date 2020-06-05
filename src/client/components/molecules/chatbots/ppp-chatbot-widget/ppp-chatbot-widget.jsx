import React from 'react'
import axios from 'axios'

import clientConfig from '../../../../services/client-config.js'

class PppChatbotWidget extends React.Component {
  async componentDidMount() {
    // const result = await axios.get('/api/borrowerbot')

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `var loaderOpts = {
        baseUrl: 'https://${clientConfig.pppChatbotBaseUrl}',
        configUrl: '${clientConfig.pppChatbotConfig}',
        shouldLoadMinDeps: true
      };
      var loader = new ChatBotUiLoader.IframeLoader(loaderOpts);
      loader.load()
        .catch(function (error) { console.error(error); });`
    this.instance.appendChild(script)
  }

  render() {
    return <div ref={element => (this.instance = element)} />
  }
}

export default PppChatbotWidget
