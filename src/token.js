import { GM_setValue, GM_getValue, GM_xmlhttpRequest } from '$'
import { isBlockedbyCloudflare } from './parse.js'
import { alertLogin } from './container.js'

export function getAccessToken() {
  return new Promise((resolve, rejcet) => {
    let accessToken = GM_getValue("accessToken")
    if (!accessToken) {
      GM_xmlhttpRequest({
        url: "https://chat.openai.com/api/auth/session",
        onload: function (response) {
          if (isBlockedbyCloudflare(response.responseText)) {
            alertLogin()
            return
          }
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
