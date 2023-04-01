<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import ChatGPTCard from './components/ChatGPTCard.vue'
import { getUserscriptManager, getWebsite, isBlockedByCloudflare, uuid } from './utils'

import { GM_deleteValue, GM_getValue, GM_setValue, GM_xmlhttpRequest } from '$'

enum CardStatus {
  'Loading',
  'Answering',
  'BlockedByCloudflare',
  'PleaseLogin',
  'UnknownError',
  'TooManyRequests',
  'GeneralError',
}
const answer = ref(null)
const cardStatus = ref<CardStatus>()

function removeAccessToken() {
  GM_deleteValue('accessToken')
}

async function getAccessToken() {
  const accessToken = await GM_getValue('accessToken', undefined)
  if (accessToken) return accessToken

  GM_xmlhttpRequest({
    url: 'https://chat.openai.com/api/auth/session',
    onload(response) {
      if (isBlockedByCloudflare(response.responseText))
        cardStatus.value = 'BlockedByCloudflare'

      const accessToken = JSON.parse(response.responseText).accessToken
      if (!accessToken)
        throw new Error('UNAUTHORIZED')

      GM_setValue('accessToken', accessToken)
      // location.reload()
      return accessToken
    },
    onerror: (error) => {
      throw new Error(`${error}`)
    },
    ontimeout: () => {
      throw new Error('getAccessToken timeout!')
    },
  })
}

async function getAnswer(question: string, callback) {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) {
      cardStatus.value = 'PleaseLogin'
      throw new Error('empty token')
    }

    GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://chat.openai.com/backend-api/conversation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      responseType: responseType(),
      data: JSON.stringify({
        action: 'next',
        messages: [
          {
            id: uuid(),
            role: 'user',
            content: {
              content_type: 'text',
              parts: [question],
            },
          },
        ],
        model: 'text-davinci-002-render',
        parent_message_id: uuid(),
      }),
      onloadstart: onloadstart(),
      onload: onload(),
      onerror(event) {
        console.error('getAnswer error: ', event)
      },
      ontimeout(event) {
        console.error('getAnswer timeout: ', event)
      },

    })
    function responseType() {
      // Violentmonkey don't support stream responseType
      // https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
      if (getUserscriptManager() === 'Tampermonkey')
        return 'stream'
      else
        return 'text'
    }
    function onloadstart() {
      if (getUserscriptManager() === 'Tampermonkey') {
        return function (stream) {
          const reader = stream.response.getReader()
          reader.read().then(function processText({
            done,
            value,
          }) {
            if (done)
              return

            let responseItem = String.fromCharCode(...Array.from(value))
            const items = responseItem.split('\n\n')
            if (items.length > 2) {
              const lastItem = items.slice(-3, -2)[0]
              if (lastItem.startsWith('data: [DONE]'))
                responseItem = items.slice(-4, -3)[0]
              else
                responseItem = lastItem
            }
            if (responseItem.startsWith('data: {')) {
              if (answer.value && answer.value.length >= 4) cardStatus.value = 'Answering'
              answer.value = JSON.parse(responseItem.slice(6)).message.content.parts[0]
            }
            else if (responseItem.startsWith('data: [DONE]')) {
              return
            }

            return reader.read().then(processText)
          })
        }
      }
    }
    function onload() {
      function finish() {
        if (typeof callback === 'function')
          return callback('finish')
      }
      finish()
      return function (event) {
        if (event.status === 401) {
          removeAccessToken()
          cardStatus.value = 'PleaseLogin'
        }
        if (event.status === 403)
          cardStatus.value = 'BlockedByCloudflare'

        if (event.status === 429)
          cardStatus.value = 'TooManyRequests'
        
        if (event.status !== 200)
          cardStatus.value = 'GeneralError'

        if (getUserscriptManager() !== 'Tampermonkey') {
          if (event.response)
            answer.value = JSON.parse(event.response.split('\n\n').slice(-3, -2)[0].slice(6)).message.content.parts[0]
        }
      }
    }
  }
  catch (e) {
    console.error(e)
  }
}

function getQuestion() {
  switch (getWebsite().name) {
    case 'startpage':
      return document.getElementById("q").value;
    case 'baidu':
      return new URL(window.location.href).searchParams.get('wd')
    case 'deepl': {
      const outLang = document.querySelectorAll('strong[data-testid=\'deepl-ui-tooltip-target\']')[0].innerHTML
      return `Translate the following paragraph into ${outLang} and only ${outLang}\n\n${document.getElementById('source-dummydiv').innerHTML}`
    }
    default:
      return new URL(window.location.href).searchParams.get('q')
  }
}

onBeforeMount(async () => {
  if (getWebsite().name === 'deepl') {
    const button = document.getElementsByClassName('chat-gpt-translate-button')[0]
    button.addEventListener('click', () => {
      cardStatus.value = 'Loading'
      answer.value = null
      button.disabled = true
      getAnswer(getQuestion(), () => {
        button.disabled = false
      })
    })
  }
  else {
    await getAnswer(getQuestion())
  }
})
</script>

<template>
  <ChatGPTCard :answer="answer" :status="cardStatus" />
</template>
