<script setup lang="ts">
import { i18n } from '../utils'
defineProps(['status', 'answer'])
</script>

<template>
  <div v-if="status === 'Loading'" class="chat-gpt-container">
    <p class="loading">
      {{ i18n('waitingResponse') }}
    </p>
  </div>
  <div v-else-if="status === 'Answering'" class="chat-gpt-container">
    <span class="prefix">ChatGPT</span>
    <pre>{{ answer }}</pre>
  </div>
  <div v-else-if="status === 'BlockedByCloudflare'" class="chat-gpt-container">
    <p>{{ i18n('checkCloudflare') }}<a href="https://chat.openai.com" target="_blank" rel="noreferrer"> chat.openai.com</a></p>
  </div>
  <div v-else-if="status === 'PleaseLogin'" class="chat-gpt-container">
    <p>{{ i18n('login') }}<a href="https://chat.openai.com" target="_blank" rel="noreferrer">chat.openai.com</a></p>
  </div>
  <div v-else-if="status === 'UnknownError'" class="chat-gpt-container">
    <p>{{ i18n('unknownError') }}<a href="https://github.com/zhengbangbo/chat-gpt-userscript/issues" target="_blank">https://github.com/zhengbangbo/chat-gpt-userscript/issues</a>.</p>
  </div>
  <div v-else-if="status === 'TooManyRequests'" class="chat-gpt-container">
    <p>{{ i18n('tooManyRequests') }}</p>
  </div>
</template>
