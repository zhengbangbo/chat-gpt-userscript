'use strict';
// ==UserScript==
// @name         chat-gpt-goole
// @version      0.1
// @description  Display ChatGPT response alongside Google Search results
// @author       Zheng Bang-Bo(https://github.com/zhengbangbo)
// @match        https://www.google.com/search*
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// @namespace    https://greasyfork.org/users/950555
// @require      https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv4.min.js
// ==/UserScript==

const container = document.createElement("div");

(async function () {
  const question = new URL(window.location.href).searchParams.get("q");
  initField()
  getAnswer(question)
})();

function initField() {
  container.className = "chat-gpt-container";
  container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>';

  const siderbarContainer = document.getElementById("rhs");
  if (siderbarContainer) {
    siderbarContainer.prepend(container);
  } else {
    container.classList.add("sidebar-free");
    document.getElementById("rcnt").appendChild(container);
  }

}

function refreshFiled(answer) {
  container.innerHTML = '<p><span class="prefix">Chat GPT</span><pre></pre></p>';
  container.querySelector("pre").textContent = answer;
}

function getAccessToken() {
  return new Promise(resolve => {
    let accessToken = GM_getValue("accessToken")
    if (!accessToken) {
      GM_log('get: ', accessToken)
      GM_xmlhttpRequest({
        method: "GET",
        url: "https://httpbin.org/get",
        onload: function (response) {
          const responseData = JSON.parse(response.responseText)
          accessToken = responseData.headers["X-Amzn-Trace-Id"]
          GM_setValue("accessToken", accessToken)
          resolve(accessToken)
        }
      })
    } else {
      resolve(accessToken)
    }
  })
}

function getAnswer(question) {
  getAccessToken().then(
    accessToken => {
      GM_xmlhttpRequest({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        url: "https://httpbin.org/anything",
        data: JSON.stringify({
          hello: question
        }),
        onload: function (response) {
          const responseData = JSON.parse(response.responseText)
          GM_log(responseData)
          refreshFiled(JSON.stringify(responseData.json))
        }
      })
    }
  )
}
