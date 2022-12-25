import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { getPosition, getWebsite, i18n, initMenu } from './utils'
import { GM_addStyle } from '$'

initMenu()
const app = createApp(App)
const container: HTMLDivElement = document.createElement('div')
initUI(container)
app.mount(
  (() => {
    return container
  })(),
)

function initUI(container: HTMLDivElement) {
  switch (getWebsite().name) {
    case 'google':
      googleInjectContainer(container)
      break
    case 'bing':
      bingInjectContainer(container)
      break
    case 'baidu':
      baiduInjectContainer(container)
      break
    case 'duckduckgo':
      duckduckgoInjectContainer(container)
      break
    case 'deepl':
      deeplInjectContainer(container)
      break
    default:
      throw new Error('Unknown Website')
  }

  function googleInjectContainer(container: HTMLDivElement) {
    if (getPosition() === 1) {
      let ChatGPTCard = document.getElementById('rhs')
      if (ChatGPTCard) {
        ChatGPTCard.prepend(container)
      }
      else {
        container.classList.add('sidebar-free')
        ChatGPTCard = document.getElementById('rcnt')
        if (!ChatGPTCard) throw new Error('Google Search Not detect container.')
        ChatGPTCard.appendChild(container)
      }
    }
    else {
      GM_addStyle('.chat-gpt-container{max-width: 100%!important}')
      const ChatGPTCard = document.querySelector('#search')
      if (ChatGPTCard)
        ChatGPTCard.prepend(container)
    }
  }
  function bingInjectContainer(container: HTMLDivElement) {
    if (getPosition() === 1) {
      const ChatGPTCard: HTMLElement | null = document.getElementById('b_context')
      if (!ChatGPTCard) throw new Error('ChatGPTCard is null')
      ChatGPTCard.prepend(container)
    }
    else {
      GM_addStyle('.chat-gpt-container{max-width: 100%!important}')
      GM_addStyle('.chat-gpt-container{width: 70vw}')
      const ChatGPTCard: HTMLElement | null = document.querySelector('main')
      if (!ChatGPTCard) throw new Error('ChatGPTCard is null')
      ChatGPTCard.prepend(container)
    }
  }
  function baiduInjectContainer(container: HTMLDivElement) {
    if (getPosition() === 1) {
      const ChatGPTCard: HTMLElement | null = document.getElementById('content_right')
      if (!ChatGPTCard) throw new Error('ChatGPTCard is null')
      ChatGPTCard.prepend(container)
    }
    else {
      GM_addStyle('.chat-gpt-container{max-width: 100%!important}')
      const ChatGPTCard: HTMLElement | null = document.querySelector('#content_left')
      if (!ChatGPTCard) throw new Error('ChatGPTCard is null')
      ChatGPTCard.prepend(container)
    }
  }
  function duckduckgoInjectContainer(container: HTMLDivElement) {
    const ChatGPTCard: Element = document.getElementsByClassName('results--sidebar')[0]
    ChatGPTCard.prepend(container)
  }
  function deeplInjectContainer(container: HTMLDivElement) {
    const button = document.createElement('button')
    button.innerHTML = i18n('chatGPTTranslate')
    button.className = 'chat-gpt-translate-button'
    document.getElementsByClassName('lmt__textarea_container')[0].appendChild(button)
    container.style.maxWidth = '1000px'
    try {
      document.getElementsByClassName('lmt__raise_alternatives_placement')[0].insertBefore(container, document.getElementsByClassName('lmt__translations_as_text')[0])
    }
    catch {
      document.getElementsByClassName('lmt__textarea_container')[1].insertBefore(container, document.getElementsByClassName('lmt__translations_as_text')[0])
    }
  }
}

