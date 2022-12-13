export function isBlockedbyCloudflare(resp) {
  try {
    const html = new DOMParser().parseFromString(resp, "text/html")
    // cloudflare html be like: https://github.com/zhengbangbo/chat-gpt-userscript/blob/512892caabef2820a3dc3ddfbcf5464fc63c405a/parse.js
    const title = html.querySelector('title')
    return title.innerText === 'Just a moment...'
  } catch (error) {
    return false
  }
}
