// This is a wrapper around primevue usetoast
// For auto import
import type { Validation } from '@vuelidate/core'
import { useToast } from 'primevue/usetoast'
import { AxiosError } from 'axios'

export default function () {
  const toast = useToast()

  const life = 3000

  const info = (summary: string, detail?: string) => {
    toast.add({ severity: 'info', summary, detail, life })
  }

  const success = (summary: string, detail?: string) => {
    toast.add({ severity: 'success', summary, detail, life })
  }

  const warn = (summary: string, detail?: string) => {
    toast.add({ severity: 'warn', summary, detail, life })
  }

  const error = (summary: string, detail?: string) => {
    toast.add({ severity: 'error', summary, detail, life })
  }

  // Cant put Validation type on the arg as it will trigger error when passing in validation obj
  const validateForm = (validate: unknown, callback: { (): unknown }) => {
    if ((validate as Validation).$validate) {
      ;(validate as Validation).$validate().then((result: boolean) => {
        if (result) {
          if (callback) callback()
        } else {
          warn('Please check your form input')
        }
      })
    } else {
      error('Validation Error', 'Invalid validator type')
    }
  }

  const response = (errResponse: unknown, printField = false) => {
    const castError = <AxiosError>errResponse
    if (castError?.response && castError.response?.data?.messages?.length > 0) {
      castError.response.data.messages.forEach((value: errorMsg) => {
        if (!value.field || (value.field && printField)) {
          let printMessage = value.message
          if (value.field) {
            printMessage = value.field + ': ' + value.message
          }
          switch (value.level) {
            case 'INFO':
              info(printMessage)
              break
            case 'WARN':
              warn(printMessage)
              break
            case 'SUCCESS':
              success(printMessage)
              break
            case 'ERROR':
            case 'FATAL':
              error(printMessage)
              break
            default:
              error(printMessage)
          }
        }
      })
    } else if ((<Error>errResponse).message) {
      error((<Error>errResponse).message)
    }
  }

  return { add: toast.add, removeGroup: toast.removeGroup, removeAllGroup: toast.removeAllGroups, info, success, warn, error, validateForm, response }
}
