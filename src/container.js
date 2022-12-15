
const container = document.createElement("div");

export function getContainer() {
  return container
}

export function initContainer() {
  const container = getContainer()
  container.className = "chat-gpt-container";
  container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>';
}

export function containerShow(answer) {
  const container = getContainer()
  container.innerHTML = '<p><span class="prefix">Chat GPT</span><pre></pre></p>';
  container.querySelector("pre").textContent = answer;
}

function containerAlert(htmlStr) {
  const container = getContainer()
  container.innerHTML = htmlStr
}

export function alertLogin() {
  containerAlert('<p>Please login at <a href="https://chat.openai.com" target="_blank" rel="noreferrer">chat.openai.com</a> first</p>')
}

export function alertBlockedByCloudflare() {
  containerAlert('<p>Please pass Cloudflare security check at <a href="https://chat.openai.com" target="_blank" rel="noreferrer">chat.openai.com</a></p>')
}

export function alertFrequentRequests() {
  containerAlert('<p>Too many requests in 1 hour. Try again later.</p>')
}

export function alertUnknowError() {
  containerAlert('<p>Oops, maybe it is a bug, please check or submit <a href="https://github.com/zhengbangbo/chat-gpt-userscript/issues" target="_blank">https://github.com/zhengbangbo/chat-gpt-userscript/issues</a>.</p>')
}

export function alertNetworkException() {
  containerAlert('<p>Network exception, please refresh the page</p>')
}
