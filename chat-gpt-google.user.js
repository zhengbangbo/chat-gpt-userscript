// ==UserScript==
// @name               chat-gpt-search-sidebar
// @name:zh-CN         搜索结果侧栏显示 ChatGPT 回答
// @version            0.5.0
// @description        Display ChatGPT response alongside Search results(Google/Bing/Baidu/DuckDuckGo/DeepL)
// @description:zh-CN  在搜索结果侧栏显示 ChatGPT 回答（Google、Bing、百度、DuckDuckGo和DeepL）
// @author             Zheng Bang-Bo(https://github.com/zhengbangbo)
// @match              https://www.google.com/search*
// @match              https://www.google.com.hk/search*
// @match              https://www.google.co.jp/search*
// @match              https://www.bing.com/search*
// @match              https://cn.bing.com/search*
// @match              https://www.baidu.com/s*
// @match              https://duckduckgo.com/*
// @match              https://www.deepl.com/translator*
// @grant              GM_xmlhttpRequest
// @grant              GM_log
// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_deleteValue
// @grant              GM_addStyle
// @namespace          https://greasyfork.org/scripts/456077
// @require            https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/umd/uuidv4.min.js
// @updateURL          https://greasyfork.org/scripts/456077-chat-gpt-search-sidebar/code/chat-gpt-search-sidebar.user.js
// @downloadURL        https://greasyfork.org/scripts/456077-chat-gpt-search-sidebar/code/chat-gpt-search-sidebar.user.js
// @connect            chat.openai.com
// @license            MIT
// ==/UserScript==

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
  if (location.hostname.startsWith("www.google.")) {
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

function addStyle() {
  GM_addStyle(`
  .chat-gpt-container {
    max-width: 369px;
    margin-bottom: 30px;
    border-radius: 8px;
    border: 1px solid #dadce0;
    padding: 15px;
    flex-basis: 0;
    flex-grow: 1;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .chat-gpt-container p {
    margin: 0;
  }

  .chat-gpt-container .prefix {
    font-weight: bold;
  }

  .chat-gpt-container .loading {
    color: #b6b8ba;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .chat-gpt-container.sidebar-free {
    margin-left: 60px;
    height: fit-content;
  }

  .chat-gpt-container pre {
    white-space: pre-wrap;
    min-width: 0;
    margin-bottom: 0;
    line-height: 20px;
  }

  .chat-gpt-translate-button {
    border-radius: 8px;
    border: 1px solid #dadce0;
    padding: 5px;
  }

  .chat-gpt-translate-button:hover {
    color: #006494;
    transition: color 100ms ease-out;
  }
  `)
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
          GM_log("getAccessToken timeout!")
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
  function onloadstart() {
    if (getUserscriptManager() === "Violentmonkey") {
      return function () { }
    } else {
      return function (stream) {
        const reader = stream.response.getReader();
        reader.read().then(function processText({ done, value }) {
          if (done) {
            alertNetworkException()
            return;
          }
          let responseItem = String.fromCharCode(...Array.from(value))
          const items = responseItem.split('\n\n')
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
        GM_log("getAnswer onerror: ", event)
      },
      ontimeout: function (event) {
        GM_log("getAnswer ontimeout: ", event)
      }
    })
  } catch (error) {
    if (error === "UNAUTHORIZED") {
      alertLogin()
    }
    GM_log("getAccessToken error: ", error)
  }

}

async function main() {
  addStyle()
  initUI()
  if (getWebsite().type === "immediately") {
    getAnswer(getQuestion())
  }
}

main().catch((e) => {
  console.log(e);
});
