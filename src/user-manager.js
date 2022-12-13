import { GM_info } from '$'

export function getUserscriptManager() {
  // Greasemonkey Tampermonkey Violentmonkey
  return GM_info.scriptHandler
}
