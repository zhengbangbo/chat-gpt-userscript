export const i18n = (name: string) => {
  const lang = navigator.appName === 'Netscape' ? navigator.language : navigator.userLanguage
  const result = config(lang)[name] ? config(lang)[name] : name
  return result
}

export function config(lang: string) {
  let result = {}
  switch (lang) {
    case 'zh-CN':
    case 'zh-SG':
      result = {
        waitingResponse: '等待 ChatGPT 响应...',
        login: '请在以下地址登录：',
        tooManyRequests: '1小时内请求太多。请稍后再试。',
        checkCloudflare: '请通过 Cloudflare 安全检查，地址为',
        unknownError: '哦，可能是个错误，请检查或提交到',
        networkException: '网络异常，请刷新页面。',
        containerPosition: '容器位置 - 侧面(1)/顶部(0): ',
        chatGPTTranslate: 'ChatGPT 翻译',
        generalError: "NEEDS TRANSLATING: Error... Failed to get valid response from ChatGPT",
      }
      break
    case 'zh-TW':
    case 'zh-HK':
      result = {
        waitingResponse: '等待 ChatGPT 回應...',
        login: '請在以下地址登錄：',
        tooManyRequests: '1小時內請求太多。請稍後再試。',
        checkCloudflare: '請通過 Cloudflare 安全檢查，地址為',
        unknownError: '哦，可能是個錯誤，請檢查或提交到',
        networkException: '網路異常，請刷新頁面。',
        containerPosition: '容器位置 - 側面(1)/頂部(0):',
        chatGPTTranslate: 'ChatGPT 翻譯',
        generalError: "NEEDS TRANSLATING: Error... Failed to get valid response from ChatGPT",
      }
      break
    default:
      result = {
        waitingResponse: 'Waiting for ChatGPT response...',
        login: 'Please login at ',
        tooManyRequests: 'Too many requests in 1 hour. Try again later.',
        checkCloudflare: 'Please pass Cloudflare security check at ',
        unknownError: 'Oops, maybe it is a bug, please check or submit ',
        networkException: 'Network exception, please refresh the page.',
        containerPosition: 'Container Position - Side(1)/Top(0): ',
        chatGPTTranslate: 'ChatGPT Translate',
        generalError: "Error... Failed to get valid response from ChatGPT",
      }
  }
  return result
}
