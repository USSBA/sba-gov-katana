import axios from 'axios'

const loadLexChatBotScript = async callback => {
  const result = await axios.get('/api/borrowerbot')
  const existingScript = document.getElementById('chatbot-web-ui-script')

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = `${result.data.baseUrl}/lex-web-ui-loader.min.js`
    script.id = 'chatbot-web-ui-script'
    document.body.appendChild(script)

    script.onload = () => {
      if (callback) {
        return callback()
      }
    }
  }

  if (existingScript && callback) {
    return callback()
  }
}

export default loadLexChatBotScript
