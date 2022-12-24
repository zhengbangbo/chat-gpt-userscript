// ==UserScript==
// @name               ChatGPT Search
// @name:zh-CN         ChatGPT 搜索
// @name:zh-SG         ChatGPT 搜索
// @name:zh-TW         ChatGPT 搜索
// @name:zh-HK         ChatGPT 搜索
// @namespace          https://greasyfork.org/scripts/456077
// @version            0.8.0
// @author             Zheng Bang-Bo(https://github.com/zhengbangbo)
// @description        ChatGPT answers displayed in sidebar after search (Google, Bing, Baidu, DuckDuckGo and DeepL)
// @description:zh-CN  侧栏显示 ChatGPT 回答（Google、Bing、百度、DuckDuckGo和DeepL）
// @description:zh-SG  侧栏显示 ChatGPT 回答（Google、Bing、百度、DuckDuckGo和DeepL）
// @description:zh-TW  側欄顯示 ChatGPT 回答（Google、Bing、百度、DuckDuckGo和DeepL）
// @description:zh-HK  側欄顯示 ChatGPT 回答（Google、Bing、百度、DuckDuckGo和DeepL）
// @license            MIT
// @icon               https://github.com/zhengbangbo/oss/raw/main/logo/chat-gpt-userscript.png
// @downloadURL        https://greasyfork.org/scripts/456077-chat-gpt-search-sidebar/code/chat-gpt-search-sidebar.user.js
// @updateURL          https://greasyfork.org/scripts/456077-chat-gpt-search-sidebar/code/chat-gpt-search-sidebar.user.js
// @match              https://*.google.com/search*
// @match              https://*.google.ad/search*
// @match              https://*.google.ae/search*
// @match              https://*.google.com.af/search*
// @match              https://*.google.com.ag/search*
// @match              https://*.google.com.ai/search*
// @match              https://*.google.al/search*
// @match              https://*.google.am/search*
// @match              https://*.google.co.ao/search*
// @match              https://*.google.com.ar/search*
// @match              https://*.google.as/search*
// @match              https://*.google.at/search*
// @match              https://*.google.com.au/search*
// @match              https://*.google.az/search*
// @match              https://*.google.ba/search*
// @match              https://*.google.com.bd/search*
// @match              https://*.google.be/search*
// @match              https://*.google.bf/search*
// @match              https://*.google.bg/search*
// @match              https://*.google.com.bh/search*
// @match              https://*.google.bi/search*
// @match              https://*.google.bj/search*
// @match              https://*.google.com.bn/search*
// @match              https://*.google.com.bo/search*
// @match              https://*.google.com.br/search*
// @match              https://*.google.bs/search*
// @match              https://*.google.bt/search*
// @match              https://*.google.co.bw/search*
// @match              https://*.google.by/search*
// @match              https://*.google.com.bz/search*
// @match              https://*.google.ca/search*
// @match              https://*.google.cd/search*
// @match              https://*.google.cf/search*
// @match              https://*.google.cg/search*
// @match              https://*.google.ch/search*
// @match              https://*.google.ci/search*
// @match              https://*.google.co.ck/search*
// @match              https://*.google.cl/search*
// @match              https://*.google.cm/search*
// @match              https://*.google.cn/search*
// @match              https://*.google.com.co/search*
// @match              https://*.google.co.cr/search*
// @match              https://*.google.com.cu/search*
// @match              https://*.google.cv/search*
// @match              https://*.google.com.cy/search*
// @match              https://*.google.cz/search*
// @match              https://*.google.de/search*
// @match              https://*.google.dj/search*
// @match              https://*.google.dk/search*
// @match              https://*.google.dm/search*
// @match              https://*.google.com.do/search*
// @match              https://*.google.dz/search*
// @match              https://*.google.com.ec/search*
// @match              https://*.google.ee/search*
// @match              https://*.google.com.eg/search*
// @match              https://*.google.es/search*
// @match              https://*.google.com.et/search*
// @match              https://*.google.fi/search*
// @match              https://*.google.com.fj/search*
// @match              https://*.google.fm/search*
// @match              https://*.google.fr/search*
// @match              https://*.google.ga/search*
// @match              https://*.google.ge/search*
// @match              https://*.google.gg/search*
// @match              https://*.google.com.gh/search*
// @match              https://*.google.com.gi/search*
// @match              https://*.google.gl/search*
// @match              https://*.google.gm/search*
// @match              https://*.google.gr/search*
// @match              https://*.google.com.gt/search*
// @match              https://*.google.gy/search*
// @match              https://*.google.com.hk/search*
// @match              https://*.google.hn/search*
// @match              https://*.google.hr/search*
// @match              https://*.google.ht/search*
// @match              https://*.google.hu/search*
// @match              https://*.google.co.id/search*
// @match              https://*.google.ie/search*
// @match              https://*.google.co.il/search*
// @match              https://*.google.im/search*
// @match              https://*.google.co.in/search*
// @match              https://*.google.iq/search*
// @match              https://*.google.is/search*
// @match              https://*.google.it/search*
// @match              https://*.google.je/search*
// @match              https://*.google.com.jm/search*
// @match              https://*.google.jo/search*
// @match              https://*.google.co.jp/search*
// @match              https://*.google.co.ke/search*
// @match              https://*.google.com.kh/search*
// @match              https://*.google.ki/search*
// @match              https://*.google.kg/search*
// @match              https://*.google.co.kr/search*
// @match              https://*.google.com.kw/search*
// @match              https://*.google.kz/search*
// @match              https://*.google.la/search*
// @match              https://*.google.com.lb/search*
// @match              https://*.google.li/search*
// @match              https://*.google.lk/search*
// @match              https://*.google.co.ls/search*
// @match              https://*.google.lt/search*
// @match              https://*.google.lu/search*
// @match              https://*.google.lv/search*
// @match              https://*.google.com.ly/search*
// @match              https://*.google.co.ma/search*
// @match              https://*.google.md/search*
// @match              https://*.google.me/search*
// @match              https://*.google.mg/search*
// @match              https://*.google.mk/search*
// @match              https://*.google.ml/search*
// @match              https://*.google.com.mm/search*
// @match              https://*.google.mn/search*
// @match              https://*.google.ms/search*
// @match              https://*.google.com.mt/search*
// @match              https://*.google.mu/search*
// @match              https://*.google.mv/search*
// @match              https://*.google.mw/search*
// @match              https://*.google.com.mx/search*
// @match              https://*.google.com.my/search*
// @match              https://*.google.co.mz/search*
// @match              https://*.google.com.na/search*
// @match              https://*.google.com.ng/search*
// @match              https://*.google.com.ni/search*
// @match              https://*.google.ne/search*
// @match              https://*.google.nl/search*
// @match              https://*.google.no/search*
// @match              https://*.google.com.np/search*
// @match              https://*.google.nr/search*
// @match              https://*.google.nu/search*
// @match              https://*.google.co.nz/search*
// @match              https://*.google.com.om/search*
// @match              https://*.google.com.pa/search*
// @match              https://*.google.com.pe/search*
// @match              https://*.google.com.pg/search*
// @match              https://*.google.com.ph/search*
// @match              https://*.google.com.pk/search*
// @match              https://*.google.pl/search*
// @match              https://*.google.pn/search*
// @match              https://*.google.com.pr/search*
// @match              https://*.google.ps/search*
// @match              https://*.google.pt/search*
// @match              https://*.google.com.py/search*
// @match              https://*.google.com.qa/search*
// @match              https://*.google.ro/search*
// @match              https://*.google.ru/search*
// @match              https://*.google.rw/search*
// @match              https://*.google.com.sa/search*
// @match              https://*.google.com.sb/search*
// @match              https://*.google.sc/search*
// @match              https://*.google.se/search*
// @match              https://*.google.com.sg/search*
// @match              https://*.google.sh/search*
// @match              https://*.google.si/search*
// @match              https://*.google.sk/search*
// @match              https://*.google.com.sl/search*
// @match              https://*.google.sn/search*
// @match              https://*.google.so/search*
// @match              https://*.google.sm/search*
// @match              https://*.google.sr/search*
// @match              https://*.google.st/search*
// @match              https://*.google.com.sv/search*
// @match              https://*.google.td/search*
// @match              https://*.google.tg/search*
// @match              https://*.google.co.th/search*
// @match              https://*.google.com.tj/search*
// @match              https://*.google.tl/search*
// @match              https://*.google.tm/search*
// @match              https://*.google.tn/search*
// @match              https://*.google.to/search*
// @match              https://*.google.com.tr/search*
// @match              https://*.google.tt/search*
// @match              https://*.google.com.tw/search*
// @match              https://*.google.co.tz/search*
// @match              https://*.google.com.ua/search*
// @match              https://*.google.co.ug/search*
// @match              https://*.google.co.uk/search*
// @match              https://*.google.com.uy/search*
// @match              https://*.google.co.uz/search*
// @match              https://*.google.com.vc/search*
// @match              https://*.google.co.ve/search*
// @match              https://*.google.vg/search*
// @match              https://*.google.co.vi/search*
// @match              https://*.google.com.vn/search*
// @match              https://*.google.vu/search*
// @match              https://*.google.ws/search*
// @match              https://*.google.rs/search*
// @match              https://*.google.co.za/search*
// @match              https://*.google.co.zm/search*
// @match              https://*.google.co.zw/search*
// @match              https://*.google.cat/search*
// @match              https://www.bing.com/search*
// @match              https://cn.bing.com/search*
// @match              https://www.baidu.com/s*
// @match              https://duckduckgo.com/*
// @match              https://www.deepl.com/translator*
// @connect            chat.openai.com
// @grant              GM_addStyle
// @grant              GM_deleteValue
// @grant              GM_getValue
// @grant              GM_info
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              GM_unregisterMenuCommand
// @grant              GM_xmlhttpRequest
// ==/UserScript==

(e=>{const t=document.createElement("style");t.dataset.source="vite-plugin-monkey",t.innerText=e,document.head.appendChild(t)})(".chat-gpt-container{max-width:369px;margin-bottom:30px;border-radius:8px;border:1px solid #dadce0;padding:15px;flex-basis:0;flex-grow:1;word-wrap:break-word;white-space:pre-wrap}.chat-gpt-container p{margin:0}.chat-gpt-container .prefix{font-weight:700}.chat-gpt-container .loading{color:#b6b8ba;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.chat-gpt-container.sidebar-free{margin-left:60px;height:fit-content}.chat-gpt-container pre{white-space:pre-wrap;min-width:0;margin-bottom:0;line-height:20px}.chat-gpt-translate-button{border-radius:8px;border:1px solid #dadce0;padding:5px}.chat-gpt-translate-button:hover{color:#006494;transition:color .1s ease-out}.chat-gpt-translate-button[disabled]{color:#eee}");

(function() {
  "use strict";
  var monkeyWindow = window;
  var GM_info = /* @__PURE__ */ (() => monkeyWindow.GM_info)();
  var GM_setValue = /* @__PURE__ */ (() => monkeyWindow.GM_setValue)();
  var GM_deleteValue = /* @__PURE__ */ (() => monkeyWindow.GM_deleteValue)();
  var GM_addStyle = /* @__PURE__ */ (() => monkeyWindow.GM_addStyle)();
  var GM_registerMenuCommand = /* @__PURE__ */ (() => monkeyWindow.GM_registerMenuCommand)();
  var GM_unregisterMenuCommand = /* @__PURE__ */ (() => monkeyWindow.GM_unregisterMenuCommand)();
  var GM_xmlhttpRequest = /* @__PURE__ */ (() => monkeyWindow.GM_xmlhttpRequest)();
  var GM_getValue = /* @__PURE__ */ (() => monkeyWindow.GM_getValue)();
  function getUserscriptManager() {
    try {
      const userscriptManager = GM_info.scriptHandler;
      return userscriptManager;
    } catch (error) {
      return "other";
    }
  }
  function uuidv4() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }
  const lang = navigator.appName == "Netscape" ? navigator.language : navigator.userLanguage;
  let config = {};
  switch (lang) {
    case "zh-CN":
    case "zh-SG":
      config = {
        waitingResponse: "等待 ChatGPT 响应...",
        login: "请在以下地址登录：",
        tooManyRequests: "1小时内请求太多。请稍后再试。",
        checkClouflare: "请通过 Cloudflare 安全检查，地址为",
        unknowError: "哦，可能是个错误，请检查或提交到",
        networkException: "网络异常，请刷新页面。",
        containerPosition: "容器位置 - 侧面(1)/顶部(0): ",
        chatGPTTranslate: "ChatGPT 翻译"
      };
      break;
    case "zh-TW":
    case "zh-HK":
      config = {
        waitingResponse: "等待 ChatGPT 回應...",
        login: "請在以下地址登錄：",
        tooManyRequests: "1小時內請求太多。請稍後再試。",
        checkClouflare: "請通過 Cloudflare 安全檢查，地址為",
        unknowError: "哦，可能是個錯誤，請檢查或提交到",
        networkException: "網路異常，請刷新頁面。",
        containerPosition: "容器位置 - 側面(1)/頂部(0):",
        chatGPTTranslate: "ChatGPT 翻譯"
      };
      break;
    default:
      config = {
        waitingResponse: "Waiting for ChatGPT response...",
        login: "Please login at ",
        tooManyRequests: "Too many requests in 1 hour. Try again later.",
        checkClouflare: "Please pass Cloudflare security check at ",
        unknowError: "Oops, maybe it is a bug, please check or submit ",
        networkException: "Network exception, please refresh the page.",
        containerPosition: "Container Position - Side(1)/Top(0): ",
        chatGPTTranslate: "ChatGPT Translate"
      };
  }
  function i18n(name, param) {
    return config[name] ? config[name].replace("#t#", param) : name;
  }
  const container = document.createElement("div");
  function getContainer() {
    return container;
  }
  function initContainer() {
    const container2 = getContainer();
    container2.className = "chat-gpt-container";
    container2.innerHTML = `<p class="loading">${i18n("waitingResponse")}</p>`;
  }
  function containerShow(answer) {
    const container2 = getContainer();
    container2.innerHTML = '<p><span class="prefix">ChatGPT</span><pre></pre></p>';
    container2.querySelector("pre").textContent = answer;
  }
  function containerAlert(htmlStr) {
    const container2 = getContainer();
    container2.innerHTML = htmlStr;
  }
  function alertLogin() {
    containerAlert(`<p>${i18n("login")}<a href="https://chat.openai.com" target="_blank" rel="noreferrer">chat.openai.com</a></p>`);
  }
  function alertBlockedByCloudflare() {
    containerAlert(`<p>${i18n("checkClouflare")}<a href="https://chat.openai.com" target="_blank" rel="noreferrer">chat.openai.com</a></p>`);
  }
  function alertFrequentRequests() {
    containerAlert(`<p>${i18n("tooManyRequests")}</p>`);
  }
  function isBlockedbyCloudflare(resp) {
    try {
      const html = new DOMParser().parseFromString(resp, "text/html");
      const title = html.querySelector("title");
      return title.innerText === "Just a moment...";
    } catch (error) {
      return false;
    }
  }
  async function getAnswer(question, callback) {
    try {
      const accessToken = await getAccessToken();
      GM_xmlhttpRequest({
        method: "POST",
        url: "https://chat.openai.com/backend-api/conversation",
        headers: {
          "Content-Type": "	application/json",
          Authorization: `Bearer ${accessToken}`
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
                parts: [question]
              }
            }
          ],
          model: "text-davinci-002-render",
          parent_message_id: uuidv4()
        }),
        onloadstart: onloadstart(),
        onload: onload(),
        onerror: function(event) {
          console.error("getAnswer error: ", event);
        },
        ontimeout: function(event) {
          console.error("getAnswer timeout: ", event);
        }
      });
    } catch (error) {
      if (error === "UNAUTHORIZED") {
        removeAccessToken();
        alertLogin();
      }
      console.error("getAnswer error: ", error);
    }
    function responseType() {
      if (getUserscriptManager() === "Tampermonkey") {
        return "stream";
      } else {
        return "text";
      }
    }
    function onload() {
      function finish() {
        if (typeof callback === "function") {
          return callback("finish");
        }
      }
      finish();
      return function(event) {
        if (event.status === 401) {
          removeAccessToken();
          alertLogin();
        }
        if (event.status === 403) {
          alertBlockedByCloudflare();
        }
        if (event.status === 429) {
          alertFrequentRequests();
        }
        if (getUserscriptManager() !== "Tampermonkey") {
          if (event.response) {
            const answer = JSON.parse(event.response.split("\n\n").slice(-3, -2)[0].slice(6)).message.content.parts[0];
            containerShow(answer);
          }
        }
      };
    }
    function onloadstart() {
      if (getUserscriptManager() === "Tampermonkey") {
        return function(stream) {
          const reader = stream.response.getReader();
          reader.read().then(function processText({ done, value }) {
            if (done) {
              return;
            }
            let responseItem = String.fromCharCode(...Array.from(value));
            const items = responseItem.split("\n\n");
            if (items.length > 2) {
              const lastItem = items.slice(-3, -2)[0];
              if (lastItem.startsWith("data: [DONE]")) {
                responseItem = items.slice(-4, -3)[0];
              } else {
                responseItem = lastItem;
              }
            }
            if (responseItem.startsWith("data: {")) {
              const answer = JSON.parse(responseItem.slice(6)).message.content.parts[0];
              containerShow(answer);
            } else if (responseItem.startsWith("data: [DONE]")) {
              return;
            }
            return reader.read().then(processText);
          });
        };
      }
    }
  }
  function removeAccessToken() {
    GM_deleteValue("accessToken");
  }
  function getAccessToken() {
    return new Promise(async (resolve, rejcet) => {
      const accessToken = await GM_getValue("accessToken");
      if (!accessToken) {
        GM_xmlhttpRequest({
          url: "https://chat.openai.com/api/auth/session",
          onload: function(response) {
            if (isBlockedbyCloudflare(response.responseText)) {
              alertLogin();
              return;
            }
            const accessToken2 = JSON.parse(response.responseText).accessToken;
            if (!accessToken2) {
              rejcet("UNAUTHORIZED");
            }
            GM_setValue("accessToken", accessToken2);
            resolve(accessToken2);
          },
          onerror: function(error) {
            rejcet(error);
          },
          ontimeout: () => {
            console.error("getAccessToken timeout!");
          }
        });
      } else {
        resolve(accessToken);
      }
    });
  }
  const _default = "";
  function getWebsite() {
    if (location.hostname.indexOf(".google.") !== -1) {
      return configRequestImmediately("google");
    }
    switch (location.hostname) {
      case "www.bing.com":
      case "cn.bing.com":
        return configRequestImmediately("bing");
      case "www.baidu.com":
        return configRequestImmediately("baidu");
      case "duckduckgo.com":
        return configRequestImmediately("duckduckgo");
      case "www.deepl.com":
        return configRequestAfterClickButton("deepl");
      default:
        throw new Error(`unknow website: ${location.hostname}`);
    }
    function configRequestImmediately(name) {
      return {
        name,
        type: "immediately"
      };
    }
    function configRequestAfterClickButton(name) {
      return {
        name,
        type: "after-click-button"
      };
    }
  }
  function getQuestion() {
    switch (getWebsite().name) {
      case "baidu":
        return new URL(window.location.href).searchParams.get("wd");
      default:
        return new URL(window.location.href).searchParams.get("q");
    }
  }
  function getPosition() {
    return GM_getValue("containerPosition", 1);
  }
  function setPosition(newPosition) {
    GM_setValue("containerPosition", newPosition);
  }
  function initUI() {
    initContainer();
    switch (getWebsite().name) {
      case "google":
        googleInjectContainer();
        break;
      case "bing":
        bingInjectContainer();
        break;
      case "baidu":
        baiduInjectContainer();
        break;
      case "duckduckgo":
        duckduckgoInjectContainer();
        break;
      case "deepl":
        deeplInjectContainer();
        break;
      default:
        alertUnknowError();
    }
    function googleInjectContainer() {
      if (getPosition() === 1) {
        const container2 = getContainer();
        const siderbarContainer = document.getElementById("rhs");
        if (siderbarContainer) {
          siderbarContainer.prepend(container2);
        } else {
          container2.classList.add("sidebar-free");
          document.getElementById("rcnt").appendChild(container2);
        }
      } else {
        GM_addStyle(".chat-gpt-container{max-width: 100%!important}");
        const container2 = getContainer();
        const mainContainer = document.querySelector("#search");
        if (mainContainer) {
          mainContainer.prepend(container2);
        }
      }
    }
    function bingInjectContainer() {
      if (getPosition() === 1) {
        const container2 = getContainer();
        const siderbarContainer = document.getElementById("b_context");
        siderbarContainer.prepend(container2);
      } else {
        GM_addStyle(".chat-gpt-container{max-width: 100%!important}");
        GM_addStyle(".chat-gpt-container{width: 70vw}");
        const container2 = getContainer();
        const mainBarContainer = document.querySelector("main");
        mainBarContainer.prepend(container2);
      }
    }
    function baiduInjectContainer() {
      if (getPosition() === 1) {
        const container2 = getContainer();
        const siderbarContainer = document.getElementById("content_right");
        siderbarContainer.prepend(container2);
      } else {
        GM_addStyle(".chat-gpt-container{max-width: 100%!important}");
        const container2 = getContainer();
        const siderbarContainer = document.querySelector("#content_left");
        siderbarContainer.prepend(container2);
      }
    }
    function duckduckgoInjectContainer() {
      const container2 = getContainer();
      const siderbarContainer = document.getElementsByClassName("results--sidebar")[0];
      siderbarContainer.prepend(container2);
    }
    function deeplInjectContainer() {
      const container2 = getContainer();
      container2.style.maxWidth = "1000px";
      const button = document.createElement("button");
      button.innerHTML = i18n("chatGPTTranslate");
      button.className = "chat-gpt-translate-button";
      document.getElementsByClassName("lmt__textarea_container")[0].appendChild(button);
      button.addEventListener("click", function() {
        initContainer();
        button.disabled = true;
        try {
          document.getElementsByClassName("lmt__raise_alternatives_placement")[0].insertBefore(container2, document.getElementsByClassName("lmt__translations_as_text")[0]);
        } catch {
          document.getElementsByClassName("lmt__textarea_container")[1].insertBefore(container2, document.getElementsByClassName("lmt__translations_as_text")[0]);
        }
        let outlang = document.querySelectorAll("strong[data-testid='deepl-ui-tooltip-target']")[0].innerHTML;
        let question = "Translate the following paragraph into " + outlang + " and only " + outlang + "\n\n" + document.getElementById("source-dummydiv").innerHTML;
        getAnswer(question, (t) => {
          button.disabled = false;
        });
      });
    }
  }
  function initMenu() {
    let position_id = GM_registerMenuCommand(i18n("containerPosition") + getPosition(), position_switch, "M");
    function position_switch() {
      GM_unregisterMenuCommand(position_id);
      setPosition((getPosition() + 1) % 2);
      position_id = GM_registerMenuCommand(i18n("containerPosition") + getPosition(), position_switch, "M");
      location.reload();
    }
  }
  async function main() {
    initUI();
    initMenu();
    if (getWebsite().type === "immediately") {
      getAnswer(getQuestion());
    }
  }
  main().catch((e) => {
    console.error(e);
  });
})();
