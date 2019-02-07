import React from 'react'

import { getLanguageOverride } from 'client/services/utils'

describe('utils', () => {
  describe('getLanguageOverride', () => {
    beforeAll(() => {
      history.pushState({}, null, '?lang=en-US')
    })

    it('returns the correct lang code and variant', () => {
      expect(getLanguageOverride()).toBe('en-US')
    })

    it('returns the correct lang code without the variant', () => {
      expect(getLanguageOverride(true)).toBe('en')
    })
  })
})
