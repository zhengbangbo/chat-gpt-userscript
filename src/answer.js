import { getAccessToken, removeAccessToken } from './token.js'
import { GM_xmlhttpRequest } from '$'
import { getUserscriptManager } from './user-manager.js'
import { uuidv4 } from './uuid.js'
import { containerShow, alertLogin, alertBlockedByCloudflare, alertFrequentRequests } from './container.js'
import { isTokenExpired, isBlockedbyCloudflare } from './parse.js'

export async function getAnswer(question, callback) {
  function responseType() {
    // Violentmonkey don't support stream responseType
    // https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
    if (getUserscriptManager() === "Tampermonkey") {
      return 'stream'
    } else {
      return 'text'
    }
  }
  function onload() {
    function finish() {
      if (typeof callback === 'function') {
        return callback("finish")
      }
    }
    finish()
    return function (event) {
      console.log(event.status)
      if (event.status === 401) {
        removeAccessToken()
        alertLogin()
      }
      if (event.status === 403) {
        // alertNetworkException()
        // maybe feel better
        alertLogin()
      }
      if (event.status === 429) {
        alertFrequentRequests()
      }
      if (getUserscriptManager() !== "Tampermonkey") {
        if (event.response) {
          const answer = JSON.parse(event.response.split("\n\n").slice(-3, -2)[0].slice(6)).message.content.parts[0]
          containerShow(answer)
        }
      }
    }
  }
  function onloadstart() {
    if (getUserscriptManager() === "Tampermonkey") {
      return function (stream) {
        const reader = stream.response.getReader();
        reader.read().then(function processText({ done, value }) {
          if (done) {
            return;
          }
          let responseItem = String.fromCharCode(...Array.from(value))
          const items = responseItem.split('\n\n')
          // Sometimes receive more than one message at a time.
          // Pick the last item
          if (items.length > 2) {
            const lastItem = items.slice(-3, -2)[0]
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
            const answer = JSON.parse(responseItem.slice(6)).message.content.parts[0]
            containerShow(answer)
          } else if (responseItem.startsWith('data: [DONE]')) {
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
      onload: onload(),
      onerror: function (event) {
        console.error("getAnswer error: ", event)
      },
      ontimeout: function (event) {
        console.error("getAnswer timeout: ", event)
      }
    })
  } catch (error) {
    if (error === "UNAUTHORIZED") {
      removeAccessToken()
      alertLogin()
    }
    console.error("getAnswer error: ", error)
  }
}
