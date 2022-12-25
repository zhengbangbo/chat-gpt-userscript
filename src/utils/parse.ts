export function isBlockedByCloudflare(resp: string) {
  try {
    const html = new DOMParser().parseFromString(resp, 'text/html')
    // cloudflare html be like: https://github.com/zhengbangbo/chat-gpt-userscript/blob/512892caabef2820a3dc3ddfbcf5464fc63c405a/parse.js
    const title = html.querySelector('title')
    if (!title) return false
    return title.innerText === 'Just a moment...'
  }
  catch (error) {
    return false
  }
}

export function isTokenExpired(text: string) {
  try {
    return JSON.parse(text).detail.code === 'token_expired'
  }
  catch (error) {
    return false
  }
}
