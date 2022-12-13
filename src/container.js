
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
  containerAlert('<p>Please login at <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> first</p>')
}

export function alertUnknowError() {
  containerAlert('<p>Oops, maybe it is a bug, please check or submit <a href="https://github.com/zhengbangbo/chat-gpt-userscript/issues" target="_blank">https://github.com/zhengbangbo/chat-gpt-userscript/issues</a>.</p>')
}

export function alertNetworkException() {
  containerAlert('<p>Network exception, please refresh the page</p>')
}
