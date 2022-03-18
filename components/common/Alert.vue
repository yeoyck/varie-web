<template>
  <div :id="uniqueId" ref="msgDiv">
    <transition-group name="p-message" tag="div">
      <Message v-for="(message, i) of messages" :key="message.message + i" :severity="message.level">
        {{ message.message }}
      </Message>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { AxiosError } from 'axios'

// Using setup method instead of script setup to prevent lint/ts error
// as "response" is called outside this method (ref.response)
export default defineComponent({
  setup() {
    const random = useRandom()
    const uniqueId = random.generateUUID()

    type IMessageLevel = 'success' | 'info' | 'warn' | 'error' | undefined
    interface IMessage {
      level: IMessageLevel
      message: string
    }
    const messages = ref<IMessage[]>([])
    const msgDiv = ref()

    function navigateToAlert(): void {
      if (process.client) {
        // Cannot use uniqueId here as there seems to be a bug
        // setup is ran twice, on server and client
        document.getElementById(msgDiv.value?.id || uniqueId)?.scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    function clear() {
      messages.value = []
    }

    function msg(level: IMessageLevel, message: string, navigate = true) {
      messages.value.push({ level, message })
      if (navigate) {
        navigateToAlert()
      }
    }

    function info(message: string, navigate = true) {
      msg('info', message, navigate)
    }

    function warn(message: string, navigate = true) {
      msg('warn', message, navigate)
    }

    function error(message: string, navigate = true) {
      msg('error', message, navigate)
    }

    function success(message: string, navigate = true) {
      msg('success', message, navigate)
    }

    function response(errResponse: unknown, printField = false, navigate = true) {
      clear()
      nextTick(() => {
        const castError = errResponse as AxiosError
        if (castError?.response && castError.response.data?.messages?.length > 0) {
          castError.response.data.messages.forEach((value: errorMsg) => {
            if (!value.field || (value.field && printField)) {
              let printMessage = value.message
              if (value.field) {
                printMessage = value.field + ': ' + value.message
              }
              switch (value.level) {
                case 'INFO':
                  info(printMessage, navigate)
                  break
                case 'WARN':
                  warn(printMessage, navigate)
                  break
                case 'SUCCESS':
                  success(printMessage, navigate)
                  break
                case 'ERROR':
                case 'FATAL':
                  error(printMessage, navigate)
                  break
                default:
                  error(printMessage, navigate)
              }
            }
          })
        } else {
          const genericError = errResponse as Error
          if (genericError.message) {
            error(genericError.message)
          } else {
            error(errResponse + '')
          }
        }
      })
    }
    return { uniqueId, messages, clear, msg, info, warn, error, success, response, msgDiv }
  }
})
</script>
