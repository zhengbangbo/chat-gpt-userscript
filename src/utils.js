export function isBlockedbyCloudflare(resp) {
  try {
    const html = new DOMParser().parseFromString(resp, 'text/html')
    // cloudflare html be like: https://github.com/zhengbangbo/chat-gpt-userscript/blob/512892caabef2820a3dc3ddfbcf5464fc63c405a/parse.js
    const title = html.querySelector('title')
    return title.innerText === 'Just a moment...'
  }
  catch (error) {
    return false
  }
}

export function isTokenExpired(text) {
  try {
    return JSON.parse(text).detail.code === 'token_expired'
  }
  catch (error) {
    return false
  }
}

export function uuid() {
  const t = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const e = []
  for (let n = 0; n < 36; n++)
    e[n] = n === 8 || n === 13 || n === 18 || n === 23 ? '-' : t[Math.ceil(Math.random() * t.length - 1)]
  return e.join('')
}
