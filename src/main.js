import './style.css'
import { GM_xmlhttpRequest, GM_setValue, GM_getValue, GM_deleteValue, GM_info} from '$';
import { uuidv4 } from './utils/uuid'

const container = document.createElement("div");
function getContainer() {
  return container
}

function getUserscriptManager() {
  // Greasemonkey Tampermonkey Violentmonkey
  return GM_info.scriptHandler
}

function getWebsite() {
  function configRequestImmediately(name) {
    return {
      name,
      type: "immediately"
    }
  }
  function configRequestAfterClickButton(name) {
    return {
      name,
      type: "after-click-button"
    }
  }
  if (location.hostname.indexOf(".google.") !== -1) {
    return configRequestImmediately("google")
  }
  switch (location.hostname) {
    case 'www.bing.com':
    case 'cn.bing.com':
      return configRequestImmediately("bing")
    case 'www.baidu.com':
      return configRequestImmediately("baidu")
    case 'duckduckgo.com':
      return configRequestImmediately("duckduckgo")
    case 'www.deepl.com':
      return configRequestAfterClickButton("deepl")
    default:
      return 'unknow'
  }
}

function getQuestion() {
  switch (getWebsite().name) {
    case 'baidu':
      return new URL(window.location.href).searchParams.get("wd");
    default:
      return new URL(window.location.href).searchParams.get("q");
  }
}

function initUI() {
  function initContainer() {
    const container = getContainer()
    container.className = "chat-gpt-container";
    container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>';
  }
  function googleInjectContainer() {
    const container = getContainer()
    const siderbarContainer = document.getElementById("rhs");
    if (siderbarContainer) {
      siderbarContainer.prepend(container);
    } else {
      container.classList.add("sidebar-free");
      document.getElementById("rcnt").appendChild(container);
    }
  }
  function bingInjectContainer() {
    const container = getContainer()
    const siderbarContainer = document.getElementById("b_context");
    siderbarContainer.prepend(container);
  }
  function baiduInjectContainer() {
    const container = getContainer()
    const siderbarContainer = document.getElementById("content_right");
    siderbarContainer.prepend(container);
  }
  function duckduckgoInjectContainer() {
    const container = getContainer()
    const siderbarContainer = document.getElementsByClassName("results--sidebar")[0]
    siderbarContainer.prepend(container);
  }
  function deeplInjectContainer() {
    const container = getContainer()
    container.style.maxWidth = '1000px';
    const button = document.createElement("button");
    button.innerHTML = "Chat GPT Translate";
    button.className = "chat-gpt-translate-button"
    document.getElementsByClassName("lmt__textarea_container")[0].appendChild(button);
    button.addEventListener("click", function () {
      initContainer()
      try {
        document.getElementsByClassName("lmt__raise_alternatives_placement")[0].insertBefore(container, document.getElementsByClassName("lmt__translations_as_text")[0]);
      }
      catch {
        document.getElementsByClassName("lmt__textarea_container")[1].insertBefore(container, document.getElementsByClassName("lmt__translations_as_text")[0]);
      }
      let outlang = document.querySelectorAll("strong[data-testid='deepl-ui-tooltip-target']")[0].innerHTML
      let question = 'Translate the following paragraph into ' + outlang + ' and only ' + outlang + '\n\n' + document.getElementById('source-dummydiv').innerHTML
      getAnswer(question)
    });
  }

  initContainer()

  switch (getWebsite().name) {
    case 'google':
      googleInjectContainer()
      break
    case 'bing':
      bingInjectContainer()
      break
    case 'baidu':
      baiduInjectContainer()
      break
    case 'duckduckgo':
      duckduckgoInjectContainer()
      break
    case 'deepl':
      deeplInjectContainer()
      break
    default:
      alertUnknowError()
  }
}

function containerShow(answer) {
  const container = getContainer()
  container.innerHTML = '<p><span class="prefix">Chat GPT</span><pre></pre></p>';
  container.querySelector("pre").textContent = answer;
}

function containerAlert(htmlStr) {
  const container = getContainer()
  container.innerHTML = htmlStr
}

function alertLogin() {
  GM_deleteValue("accessToken")
  containerAlert('<p>Please login at <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> first</p>')
}

function alertUnknowError() {
  containerAlert('<p>Oops, maybe it is a bug, please submit <a href="https://github.com/zhengbangbo/chat-gpt-userscript/issues" target="_blank">https://github.com/zhengbangbo/chat-gpt-userscript/issues</a> with follow log of event</p>')
}

function alertNetworkException() {
  containerAlert('<p>Network exception, please refresh the page</p>')
}


function getAccessToken() {
  return new Promise((resolve, rejcet) => {
    let accessToken = GM_getValue("accessToken")
    if (!accessToken) {
      GM_xmlhttpRequest({
        url: "https://chat.openai.com/api/auth/session",
        onload: function (response) {
          const accessToken = JSON.parse(response.responseText).accessToken
          if (!accessToken) {
            rejcet("UNAUTHORIZED")
          }
          GM_setValue("accessToken", accessToken)
          resolve(accessToken)
        },
        onerror: function (error) {
          rejcet(error)
        },
        ontimeout: () => {
          console.log("getAccessToken timeout!")
        }
      })
    } else {
      resolve(accessToken)
    }
  })
}

async function getAnswer(question) {
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
        if (event.status != 401 && event.status != 200) {
          alertUnknowError()
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
      const html = new DOMParser.parseFromString(resp, "text/html")
      return html !== undefined
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
            alertLogin()
            return
          }
          if (isBlockedbyCloudflare(responseItem)) {
            alertNetworkException()
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
      alertLogin()
    }
    console.log("getAccessToken error: ", error)
  }

}

async function main() {
  initUI()
  if (getWebsite().type === "immediately") {
    getAnswer(getQuestion())
  }
}

main().catch((e) => {
  console.log(e);
});
