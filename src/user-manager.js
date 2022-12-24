import { GM_info } from '$'

export function getUserscriptManager() {
  // Greasemonkey Tampermonkey Violentmonkey
  try {
    const userscriptManager = GM_info.scriptHandler
    return userscriptManager
  }
  catch (error) {
    return 'other'
  }
}
