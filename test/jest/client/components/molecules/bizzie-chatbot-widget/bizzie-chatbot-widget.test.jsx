import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import userEvent from 'user-event'
import { fireEvent, render, wait } from 'react-testing-library'

import { BizzieChatbotWidget } from 'molecules'

describe('BizzieChatbotWidget', () => {
  it('should render Bizzie chatbot widget with title bar and title bar text', () => {
    const titleText = 'Bizzie'
    const { getByTestId, getByText, getByTitle } = render(<BizzieChatbotWidget />)

    const chatbotContainer = getByTestId('bizzie-web-chat-container')
    expect(chatbotContainer).toBeInTheDocument()
    expect(chatbotContainer.firstChild.classList.contains('bizzieWebChat'))

    const TitleBar = getByTestId('bizzie-web-chat-title-bar')
    expect(chatbotContainer).toBeInTheDocument()

    const TitleBarText = getByText(new RegExp(titleText, 'i'))
    expect(TitleBarText).toBeInTheDocument()

    const sendButton = getByTitle('Send')
    expect(sendButton).toBeInTheDocument()
  })
})
