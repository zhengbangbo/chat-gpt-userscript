import { i18n } from './i18n'
import { GM_getValue, GM_registerMenuCommand, GM_setValue, GM_unregisterMenuCommand } from '$'

export function initMenu() {
  let position_id = GM_registerMenuCommand(i18n('containerPosition') + getPosition(), position_switch)

  function position_switch() {
    GM_unregisterMenuCommand(position_id)
    setPosition((getPosition() + 1) % 2)
    position_id = GM_registerMenuCommand(i18n('containerPosition') + getPosition(), position_switch)
    location.reload()
  }
}

export function getPosition() {
  return GM_getValue('containerPosition', 1)
}

function setPosition(newPosition: number) {
  GM_setValue('containerPosition', newPosition)
}
