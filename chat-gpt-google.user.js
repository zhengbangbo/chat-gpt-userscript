// ==UserScript==
// @name               chat-gpt-search-sidebar
// @name:zh-CN         搜索结果侧栏显示 ChatGPT 回答
// @version            0.4.1
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

function getWebsite() {
  if (location.hostname.startsWith("www.google.")) {
    return 'google'
  }
  switch (location.hostname) {
    case 'www.bing.com':
    case 'cn.bing.com':
      return 'bing'
    case 'www.baidu.com':
      return 'baidu'
    case 'duckduckgo.com':
      return 'duckduckgo'
    case 'www.deepl.com':
      return 'deepl'
    default:
      return 'unknow'
  }
}

function getQuestion() {
  switch (getWebsite()) {
    case 'baidu':
      return new URL(window.location.href).searchParams.get("wd");
    default:
      return new URL(window.location.href).searchParams.get("q");
  }
}

function initContainer() {
  container.className = "chat-gpt-container";
  container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>';
}

function initField() {
  initContainer()
  let siderbarContainer = ''

  switch (getWebsite()) {
    case 'google':
      siderbarContainer = document.getElementById("rhs");
      if (siderbarContainer) {
        siderbarContainer.prepend(container);
      } else {
        container.classList.add("sidebar-free");
        document.getElementById("rcnt").appendChild(container);
      }
      break
    case 'bing':
      siderbarContainer = document.getElementById("b_context");
      siderbarContainer.prepend(container);
      break
    case 'baidu':
      siderbarContainer = document.getElementById("content_right");
      siderbarContainer.prepend(container);
      break
    case 'duckduckgo':
      siderbarContainer = document.getElementsByClassName("results--sidebar")[0]
      siderbarContainer.prepend(container);
      break
    case 'deepl':
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
        let question = 'Translate the following paragraph into ' + outlang + ' and only '+ outlang +'\n\n' + document.getElementById('source-dummydiv').innerHTML
        getAnswer(question)
      });
      break
  }

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

function refreshFiled(answer) {
  container.innerHTML = '<p><span class="prefix">Chat GPT</span><pre></pre></p>';
  container.querySelector("pre").textContent = answer;
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
  try {
    const accessToken = await getAccessToken()
    GM_xmlhttpRequest({
      method: "POST",
      url: "https://chat.openai.com/backend-api/conversation",
      headers: {
        "Content-Type": "	application/json",
        Authorization: `Bearer ${accessToken}`,
      },
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
      // onloadstart: function (event) {
      //   GM_log("getAnswer onloadstart: ", event)
      // },
      onloadend: function (event) {
        // GM_log("getAnswer onloadend: ", event)
        if (event.status === 401) {
          GM_deleteValue("accessToken")
          location.reload()
        }
        if (event.status != 401 && event.status != 200) {
          GM_log('Oops, maybe it is a bug, please submit https://github.com/zhengbangbo/chat-gpt-userscript/issues with follow log of event')
          GM_log('event: ', event)
        }
        if (event.response) {
          const answer = JSON.parse(event.response.split("\n\n").slice(-3, -2)[0].slice(6)).message.content.parts[0]
          refreshFiled(answer)
        }
      },
      // onprogress: function (event) {
      //   GM_log("getAnswer onprogress: ", event)
      // },
      // onreadystatechange: function (event) {
      //   GM_log("getAnswer onreadystatechange: ", event)
      // },
      // onload: function (event) {
      //   GM_log("getAnswer onload: ", event)
      // },
      onerror: function (event) {
        GM_log("getAnswer onerror: ", event)
      },
      ontimeout: function (event) {
        GM_log("getAnswer ontimeout: ", event)
      }
    })
  } catch (error) {
    if (error === "UNAUTHORIZED") {
      container.innerHTML =
        '<p>Please login at <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> first</p>';
    }
    GM_log("getAccessToken error: ", error)
  }
}

(async function () {
  initField()
  if (getWebsite() != 'deepl') {
    // TODO: Deal with it this way for the time being and reconstruct it later.
    getAnswer(getQuestion())
  }
})();
