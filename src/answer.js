import { getAccessToken } from './token.js'
import { GM_xmlhttpRequest } from '$'
import { getUserscriptManager } from './user-manager.js'
import { uuidv4 } from './uuid.js'
import { containerShow, alertLogin } from './container.js'

export async function getAnswer(question) {
  function responseType() {
    // violentmonkey don't support stream responseType
    // https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
    if (getUserscriptManager() === "Violentmonkey") {
      return 'text'
    } else {
      return 'stream'
    }
  }
  function onloadend() {
    if (getUserscriptManager() === "Violentmonkey") {
      return function (event) {
        if (event.status === 401) {
          GM_deleteValue("accessToken")
          location.reload()
        }
        if (event.status === 403) {
          // alertNetworkException()
          // maybe feel better
          GM_deleteValue("accessToken")
          alertLogin()
        }
        if (event.status != 401 && event.status != 200) {
          // alertUnknowError()
          // too...
          GM_deleteValue("accessToken")
          alertLogin()
        }
        if (event.response) {
          const answer = JSON.parse(event.response.split("\n\n").slice(-3, -2)[0].slice(6)).message.content.parts[0]
          containerShow(answer)
        }
      }
    } else {
      return function () { }
    }
  }
  function isTokenExpired(text) {
    try {
      return JSON.parse(text).detail.code === 'token_expired'
    } catch (error) {
      return false
    }
  }
  function isBlockedbyCloudflare(resp) {
    try {
      const html = new DOMParser().parseFromString(resp, "text/html")
      // cloudflare html be like: https://github.com/zhengbangbo/chat-gpt-userscript/blob/512892caabef2820a3dc3ddfbcf5464fc63c405a/parse.js
      const title = html.querySelector('title')
      return title.innerText === 'Just a moment...'
    } catch (error) {
      return false
    }
  }
  function onloadstart() {
    if (getUserscriptManager() === "Violentmonkey") {
      return function () { }
    } else {
      return function (stream) {
        const reader = stream.response.getReader();
        reader.read().then(function processText({ done, value }) {
          if (done) {
            return;
          }
          let responseItem = String.fromCharCode(...Array.from(value))
          const items = responseItem.split('\n\n')
          if (isTokenExpired(items[0])) {
            GM_deleteValue("accessToken")
            alertLogin()
            return
          }
          if (isBlockedbyCloudflare(responseItem)) {
            GM_deleteValue("accessToken")
            alertLogin()
            return
          }
          console.log("items: ", items)
          // Sometimes receive more than one message at a time.
          // Pick the last item
          if (items.length > 2) {
            console.log("responseItem: ", responseItem);
            const lastItem = items.slice(-3, -2)[0]
            console.log("lastItem: ", lastItem);
            if (lastItem.startsWith('data: [DONE]')) {
              responseItem = items.slice(-4, -3)[0]
            } else {
              responseItem = lastItem
            }
          }
          // Recieve data like:
          // data: {"message": {"id": "62f92567-4ce0-4fe3-800f-3d5b82aa0e4d", "role": "assistant", "user": null, "create_time": null, "update_time": null, "content": {"content_type": "text", "parts": ["Pro"]}, "end_turn": null, "weight": 1.0, "metadata": {}, "recipient": "all"}, "conversation_id": "5d8777ca-cd79-4756-857e-c5c21339f57c", "error": null}
          // data: [DONE]
          if (responseItem.startsWith('data: {')) {
            console.log("responseItem.slice(6): ", responseItem.slice(6));
            const answer = JSON.parse(responseItem.slice(6)).message.content.parts[0]
            containerShow(answer)
          } else if (responseItem.startsWith('data: [DONE]')) {
            console.log("receive [DONE]")
            return
          }
          return reader.read().then(processText);
        });
      }
    }
  }
  try {
    const accessToken = await getAccessToken()
    GM_xmlhttpRequest({
      method: "POST",
      url: "https://chat.openai.com/backend-api/conversation",
      headers: {
        "Content-Type": "	application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: responseType(),
      data: JSON.stringify({
        action: "next",
        messages: [
          {
            id: uuidv4(),
            role: "user",
            content: {
              content_type: "text",
              parts: [question],
            },
          },
        ],
        model: "text-davinci-002-render",
        parent_message_id: uuidv4(),
      }),
      onloadstart: onloadstart(),
      onloadend: onloadend(),
      onerror: function (event) {
        console.log("getAnswer onerror: ", event)
      },
      ontimeout: function (event) {
        console.log("getAnswer ontimeout: ", event)
      }
    })
  } catch (error) {
    if (error === "UNAUTHORIZED") {
      GM_deleteValue("accessToken")
      alertLogin()
    }
    console.log("getAnswer error: ", error)
  }

}
