import i18n from './i18n.js'

const container = document.createElement('div')

export function getContainer() {
  return container
}

export function initContainer() {
  const container = getContainer()
  container.className = 'chat-gpt-container'
  container.innerHTML = `<p class="loading">${i18n('waitingResponse')}</p>`
}

export function containerShow(answer) {
  const container = getContainer()
  container.innerHTML = '<p><span class="prefix">ChatGPT</span><pre></pre></p>'
  container.querySelector('pre').textContent = answer
}

function containerAlert(htmlStr) {
  const container = getContainer()
  container.innerHTML = htmlStr
}

export function alertLogin() {
  containerAlert(`<p>${i18n('login')}<a href="https://chat.openai.com" target="_blank" rel="noreferrer">chat.openai.com</a></p>`)
}

export function alertBlockedByCloudflare() {
  containerAlert(`<p>${i18n('checkClouflare')}<a href="https://chat.openai.com" target="_blank" rel="noreferrer">chat.openai.com</a></p>`)
}

export function alertFrequentRequests() {
  containerAlert(`<p>${i18n('tooManyRequests')}</p>`)
}

export function alertUnknowError() {
  containerAlert(`<p>${i18n('unknowError')}<a href="https://github.com/zhengbangbo/chat-gpt-userscript/issues" target="_blank">https://github.com/zhengbangbo/chat-gpt-userscript/issues</a>.</p>`)
}

export function alertNetworkException() {
  containerAlert(`<p>${i18n('networkException')}</p>`)
}
