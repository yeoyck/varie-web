// Global App Interface/Type
import Alert from '@/components/common/Alert.vue'
declare global {
  interface link {
    href: string
  }
  type links = Record<string, link>

  interface errorMsg {
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' | 'FATAL'
    field?: string
    message: string
  }

  type alert = InstanceType<typeof Alert>
}
export {}
