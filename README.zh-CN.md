# ChatGPT 搜索（油猴脚本）
<img align="right" src="https://github.com/zhengbangbo/oss/raw/main/logo/chat-gpt-userscript.png" width="17%" alt="Application Icon"/>

[![](https://img.shields.io/static/v1?label=%20&message=GreasyFork&style=flat&labelColor=5D5D5D&color=000000&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=)](https://greasyfork.org/scripts/456077)
[![GitHubStar](https://img.shields.io/github/stars/zhengbangbo/chat-gpt-userscript?style=social)](https://github.com/zhengbangbo/chat-gpt-userscript)
[![Issues](https://img.shields.io/github/issues/zhengbangbo/chat-gpt-userscript)](https://github.com/zhengbangbo/chat-gpt-userscript/issues)
[![PR](https://img.shields.io/github/issues-pr/zhengbangbo/chat-gpt-userscript)](https://github.com/zhengbangbo/chat-gpt-userscript/pulls)
[![license](https://img.shields.io/github/license/zhengbangbo/chat-gpt-userscript?color=blue)](https://github.com/zhengbangbo/chat-gpt-userscript/blob/main/LICENSE)
[![](https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true)](https://chat.imzbb.cc)

> **Warning**
> 由于长期未使用该油猴脚本，加上网络问题较为复杂，因此我决定不再维护这个项目。

[English Version](https://github.com/zhengbangbo/chat-gpt-userscript/blob/main/README.md)

显示 ChatGPT 回答的油猴脚本
- 搜索引擎 ([Google](https://www.google.com/search?q=chatgpt)/[Bing](https://www.bing.com/search?q=who+am+i)/[Baidu](https://www.baidu.com/s?wd=Where%20am%20I%20from%3F)/[DuckDuckGo](https://duckduckgo.com/?q=Where+am+I+going%3F))
- 翻译器 ([DeepL](https://www.deepl.com/translator#zh/en/%E5%9C%A8%E5%B9%B3%E5%9D%A6%E7%9A%84%E9%81%93%E8%B7%AF%E4%B8%8A%E6%9B%B2%E6%8A%98%E5%89%8D%E8%A1%8C))

<table>
    <tr>
        <td>搜索引擎旁边
        </td>
        <td>DeepL
        </td>
    </tr>
    <tr>
        <td><img src=https://github.com/zhengbangbo/chat-gpt-userscript/raw/main/img/example1.png width=600/></td>
        <td><img src=https://github.com/zhengbangbo/chat-gpt-userscript/raw/main/img/example2.png width=600/></td>
    </tr>
    <tr>
        <td>搜索引擎顶部
        </td>
        <td>修改容器位置方法(仅搜索引擎可用)
        </td>
    </tr>
    <tr>
        <td><img src=https://github.com/zhengbangbo/chat-gpt-userscript/raw/main/img/example3.png width=600/></td>
        <td><img src=https://github.com/zhengbangbo/chat-gpt-userscript/raw/main/img/example4.png width=600/></td>
    </tr>
</table>

## 安装

1. 阅读 [这篇帮助文档](https://greasyfork.org/help/installing-user-scripts) 去安装合适的脚本管理器。

2. 去 [Greasy Fork](https://greasyfork.org/scripts/456077) 安装脚本。

## 兼容性
> 如果你有能力解决兼容性问题，欢迎 PR。

|                       | **Chrome** | **Microsoft Edge** | **Firefox** | **Safari** |
|-----------------------|:----------:|:------------------:|:-----------:|:----------:|
| **Tampermonkey**      |     OK     |         OK         |      OK     |     NG     |
| **Violentmonkey(*)**  |     OK     |         OK         |      OK     |      -     |
| **Greasemonkey**      |      -     |          -         |      NG     |      -     |
| **Userscripts**       |      -     |          -         |      -      |     NG     |
| **ScriptCat(*)**      |     OK     |         OK         |      OK     |      -     |

*: ViolentMoney 和 ScriptCat 无法逐字打印，因为不支持 stream 响应类型[^vm][^sc]。

[^vm]: https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
[^sc]: https://github.com/scriptscat/scriptcat/blob/88a6d4a3ad24bef64ba37035b02a50ad8ece8c38/src/types/main.d.ts#L20

## 贡献
本项目现在使用 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) 构建，开发过程相关问题在[该项目的文档](https://github.com/lisonge/vite-plugin-monkey#some-note)中都有解答。

```
pnpm i
pnpm dev
```

## 致谢

- 本项目受 [wong2/chat-gpt-google-extension](https://github.com/wong2/chat-gpt-google-extension) 启发。
- 感谢 [@duck123ducker](https://github.com/duck123ducker) 贡献的对 DeepL 翻译器的支持([#9](https://github.com/zhengbangbo/chat-gpt-userscript/pull/9)).
- 感谢 [bigonion](https://greasyfork.org/users/827969)，本项目接收处理 stream 类型数据部分借鉴了 [chatGPT tools Plus ++](https://greasyfork.org/scripts/456131/code?version=1127217)。
- 感谢 [@devinmugen](https://github.com/devinmugen) 贡献的搜索页面顶部模式([#13](https://github.com/zhengbangbo/chat-gpt-userscript/pull/13)).
