import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat'
import axios from 'axios'
import classNames from 'classnames'

import styles from './bizzie-chatbot-widget.scss'

const BizzieChatbotWidget = () => {
  const [token, setToken] = useState(null)
  const [minimized, setMinimized] = useState(true)

  const directLine = useMemo(() => createDirectLine({ token }), [token])
  const store = useMemo(() => createStore(), [])

  const toggleChatWindowVisibility = useCallback(
    () => setMinimized(prevMinimizedState => !prevMinimizedState),
    [setMinimized]
  )

  useEffect(() => {
    ;(async function() {
      const response = await axios.get('https://sba-assistant-dev-bizzie.azurewebsites.net/api/token')
      const { Token: webChatToken } = await JSON.parse(response.data)

      setToken(webChatToken)
    })()
  }, [])

  const className = classNames({
    bizzieChatbotWidget: true,
    [styles.windowMaximized]: !minimized,
    [styles.windowMinimized]: minimized
  })
  // className="bizzie-web-chat"

  return (
    <div
      className={className + ' ' + styles.bizzieWebChatContainer}
      data-testid="bizzie-web-chat-container"
    >
      <div
        className={styles.bizzieWebChatTitleBar}
        data-testid="bizzie-web-chat-title-bar"
        onClick={toggleChatWindowVisibility}
      >
        <p className={styles.bizzieWebChatTitleBarText} data-testid="bizzie-web-chat-title-bar-text">
          Bizzie
        </p>
      </div>
      <ReactWebChat
        className={classNames(
          'bizzie-web-chat',
          styles.bizzieWebChat,
          minimized ? styles.bizzieWebChatHidden : styles.bizzieWebChatVisible
        )}
        directLine={directLine}
        store={store}
      />
    </div>
  )
}

export default BizzieChatbotWidget
