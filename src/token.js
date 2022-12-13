import { GM_setValue, GM_getValue } from '$'

export function getAccessToken() {
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
          console.log("getAccessToken timeout!")
        }
      })
    } else {
      resolve(accessToken)
    }
  })
}
