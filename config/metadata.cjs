const {
  author,
  name,
  repository,
  version,
} = require("../package.json");

module.exports = {
  name: {
    "": name,
    "zh-CN": "搜索结果侧栏显示 ChatGPT 回答",
  },
  description: {
    "": "Display ChatGPT response alongside Search results(Google/Bing/Baidu/DuckDuckGo)",
    "zh-CN":
      "在搜索结果侧栏显示 ChatGPT 回答（Google、Bing、百度和DuckDuckGo）",
  },
  namespace: "https://greasyfork.org/scripts/456077",
  version: version,
  author: author,
  source: repository.url,
  license: "MIT",
  match: [
    "https://www.google.com/search*",
    "https://www.google.com.hk/search*",
    "https://www.google.co.jp/search*",
    "https://www.bing.com/search*",
    "https://cn.bing.com/search*",
    "https://www.baidu.com/s*",
    "https://duckduckgo.com/*",
  ],
  require: [],
  grant: ["GM.xmlHttpRequest", "GM.setValue", "GM.getValue", "GM.deleteValue"],
  connect: ["chat.openai.com"],
  "run-at": "document-end",
};
