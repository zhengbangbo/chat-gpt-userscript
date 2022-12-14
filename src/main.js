import { GM_addStyle, GM_getValue, GM_registerMenuCommand, GM_setValue, GM_unregisterMenuCommand } from '$'
import { getAnswer } from './answer.js'
import { getContainer, initContainer } from './container.js'
import './style/default.css'

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

function getPosition() {
  return GM_getValue('containerPosition', 1)
}
function setPosition(newPosition) {
  GM_setValue('containerPosition', newPosition)
}

function initUI() {
  function googleInjectContainer() {
    if (getPosition() === 1) {
      // side
      const container = getContainer()
      const siderbarContainer = document.getElementById("rhs");
      if (siderbarContainer) {
        siderbarContainer.prepend(container);
      } else {
        container.classList.add("sidebar-free");
        document.getElementById("rcnt").appendChild(container);
      }
    } else {
      GM_addStyle('.chat-gpt-container{max-width: 100%!important}')
      const container2 = getContainer();
      const mainContainer = document.querySelector("#search")
      if (mainContainer) {
        mainContainer.prepend(container2);
      }
    }
  }
  function bingInjectContainer() {
    if (getPosition() === 1) {
      // side
      const container = getContainer()
      const siderbarContainer = document.getElementById("b_context");
      siderbarContainer.prepend(container);
    } else {
      GM_addStyle('.chat-gpt-container{max-width: 100%!important}')
      GM_addStyle('.chat-gpt-container{width: 70vw}')
      const container2 = getContainer();
      const mainBarContainer = document.querySelector("main");
      mainBarContainer.prepend(container2);
    }
  }
  function baiduInjectContainer() {
    if (getPosition() === 1) {
      const container = getContainer()
      const siderbarContainer = document.getElementById("content_right");
      siderbarContainer.prepend(container);
    } else {
      GM_addStyle('.chat-gpt-container{max-width: 100%!important}')
      const container2 = getContainer();
      const siderbarContainer = document.querySelector("#content_left");
      siderbarContainer.prepend(container2);
    }
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
      button.disabled = true
      try {
        document.getElementsByClassName("lmt__raise_alternatives_placement")[0].insertBefore(container, document.getElementsByClassName("lmt__translations_as_text")[0]);
      }
      catch {
        document.getElementsByClassName("lmt__textarea_container")[1].insertBefore(container, document.getElementsByClassName("lmt__translations_as_text")[0]);
      }
      let outlang = document.querySelectorAll("strong[data-testid='deepl-ui-tooltip-target']")[0].innerHTML
      let question = 'Translate the following paragraph into ' + outlang + ' and only ' + outlang + '\n\n' + document.getElementById('source-dummydiv').innerHTML
      getAnswer(question, (t) => {
        console.log(t)
        button.disabled = false
      })
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

function initMenu() {
  let position_id = GM_registerMenuCommand("Container Position - Side(1)/Top(0): " + getPosition(), position_switch, "M");

  function position_switch() {
    GM_unregisterMenuCommand(position_id);
    setPosition((getPosition() + 1) % 2)
    position_id = GM_registerMenuCommand("Container Position - Side(1)/Top(0): " + getPosition(), position_switch, "M");
    location.reload()
  }
}

async function main() {
  initUI();
  initMenu();
  if (getWebsite().type === "immediately") {
    getAnswer(getQuestion())
  }
}

main().catch((e) => {
  console.log(e);
});
