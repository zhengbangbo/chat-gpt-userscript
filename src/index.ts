import "./style/main.less";

import { fetchSSE } from "./fetch-see";
import { localAccessToken, reloadAccessToken } from "./access-token";
import { v4 as uuidv4 } from "uuid";

const container: HTMLElement = document.createElement("div");
let siderbarcontainer: HTMLElement = null;

async function main() {
  initField();

  const question = getQuestion();
  try {
    await fetchAnswer(question, (answer: any) => {
      throttle(showAnswer(answer), 1000);
    });
  } catch (error) {}
}

async function fetchAnswer(question: string, callback: any) {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await localAccessToken()}`,
  };
  const jsonData = {
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
  };
  const body = JSON.stringify(jsonData);
  const options = { method, headers, body };

  try {
    await fetchSSE("https://chat.openai.com/backend-api/conversation", {
      ...options,
      onMessage(message: any) {
        console.debug("sse message", message);
        if (message === "[DONE]") {
          return;
        }
        const data = JSON.parse(message);
        const text = data.message?.content?.parts?.[0];
        if (text) {
          callback(text);
        }
      },
    });
  } catch (error) {
    if (error.message === "401") {
      reloadAccessToken();
      showLoginLinkMessage();
    } else {
      showUnknowErrorMessage();
    }
  }
}

function getSearchEngine() {
  if (location.hostname.startsWith("www.google.")) {
    return "google";
  }
  switch (location.hostname) {
    case "www.bing.com":
    case "cn.bing.com":
      return "bing";
    case "www.baidu.com":
      return "baidu";
    case "duckduckgo.com":
      return "duckduckgo";
    default:
      return "unknow";
  }
}

function getQuestion() {
  switch (getSearchEngine()) {
    case "baidu":
      return new URL(window.location.href).searchParams.get("wd");
    default:
      return new URL(window.location.href).searchParams.get("q");
  }
}

function initField() {
  container.className = "chat-gpt-container";
  container.innerHTML =
    '<p class="loading">Waiting for ChatGPT response...</p>';

  switch (getSearchEngine()) {
    case "google":
      siderbarcontainer = document.getElementById("rhs");
      if (siderbarcontainer) {
        siderbarcontainer.prepend(container);
      } else {
        container.classList.add("sidebar-free");
        document.getElementById("rcnt").appendChild(container);
      }
      break;
    case "bing":
      siderbarcontainer = document.getElementById("b_context");
      siderbarcontainer.prepend(container);
      break;
    case "baidu":
      siderbarcontainer = document.getElementById("content_right");
      siderbarcontainer.prepend(container);
      break;
    case "duckduckgo":
      document.getElementsByClassName("results--sidebar")[0].prepend(container);
      break;
  }
}

function throttle(func: any, wait: any) {
  let lastTime = 0;
  return function (...args: any[]) {
    const currentTime = Date.now();
    if (currentTime - lastTime >= wait) {
      lastTime = currentTime;
      func.apply(this, args);
    }
  };
}

function showAnswer(answer: string) {
  container.innerHTML =
    '<p><span class="prefix">Chat GPT</span><pre></pre></p>';
  container.querySelector("pre").textContent = answer;
}

function showLoginLinkMessage() {
  container.innerHTML =
    '<p>Please login at <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> first</p>';
}

function showUnknowErrorMessage() {
  container.innerHTML =
    '<p>Maybe it is a bug, please check or submit at <a href="https://github.com/zhengbangbo/chat-gpt-userscript/issues" target="_blank">Github Issue</a>.</p>';
}

main().catch((e) => {
  console.log(e);
});
