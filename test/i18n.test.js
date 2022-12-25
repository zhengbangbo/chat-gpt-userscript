// @vitest-environment jsdom
import { config, i18n } from '../src/utils/i18n'

describe('i18n', () => {
  beforeEach(() => {
    // https://vitest.dev/api/#vi-fn
    const navigatorMock = vi.fn(() => ({
      appName: vi.fn(),
      language: vi.fn(),
    }))
    // https://vitest.dev/api/#vi-stubglobal
    vi.stubGlobal('navigator', navigatorMock)
  })

  it('appName: Netscape', () => {
    Object.defineProperty(navigator, 'appName', {
      get() { return 'Netscape' },
    })
    Object.defineProperty(navigator, 'language', {
      get() { return 'en-US' },
    })

    expect(navigator.appName).toMatchInlineSnapshot('"Netscape"')
    expect(navigator.language).toMatchInlineSnapshot('"en-US"')
    expect(i18n('login')).toMatchInlineSnapshot('"Please login at "')
  })

  it('language: zh-CN', () => {
    Object.defineProperty(navigator, 'appName', {
      get() { return 'Netscape' },
    })
    Object.defineProperty(navigator, 'language', {
      get() { return 'zh-CN' },
    })

    expect(navigator.appName).toMatchInlineSnapshot('"Netscape"')
    expect(navigator.language).toMatchInlineSnapshot('"zh-CN"')
    expect(i18n('login')).toMatchInlineSnapshot('"请在以下地址登录："')
  })

  it('language: zh-TW', () => {
    Object.defineProperty(navigator, 'appName', {
      get() { return 'Netscape' },
    })
    Object.defineProperty(navigator, 'language', {
      get() { return 'zh-TW' },
    })

    expect(navigator.appName).toMatchInlineSnapshot('"Netscape"')
    expect(navigator.language).toMatchInlineSnapshot('"zh-TW"')
    expect(i18n('login')).toMatchInlineSnapshot('"請在以下地址登錄："')
  })

  it('language: unknow', () => {
    Object.defineProperty(navigator, 'appName', {
      get() { return 'Netscape' },
    })
    Object.defineProperty(navigator, 'language', {
      get() { return 'unknow' },
    })

    expect(navigator.appName).toMatchInlineSnapshot('"Netscape"')
    expect(navigator.language).toMatchInlineSnapshot('"unknow"')
    expect(i18n('login')).toMatchInlineSnapshot('"Please login at "')
  })
})

describe('config', () => {
  const langs = [
    'zh-CN',
    'zh-SG',
    'zh-HK',
    'zh-TW',
    'en-US',
    'zh-XX',
  ]
  const configs = langs.map(lang => config(lang))

  it('lengths are all equal', () => {
    const lengthsAreAllEqual = array => array.every(item => item.length === array[0].length)

    expect(lengthsAreAllEqual(configs)).toBeTruthy()
  })

  it('key names are all the same', () => {
    const keyNamesAreAllTheSame = array => array.every(item => item.key === array[0].key)

    expect(keyNamesAreAllTheSame(configs)).toBeTruthy()
  })
})
