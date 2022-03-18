import { acceptHMRUpdate, defineStore } from 'pinia'
import { useMenuStore } from './menu'

export interface IUser {
  name: string
}
export const useUserStore = defineStore('user', () => {
  const authorities = ref(<string[]>['crm', 'admin'])
  const user = ref(<IUser | null>{
    name: 'Wee Kiat'
  })

  function checkAccess(paramAuths: string[] = []) {
    if (paramAuths?.length > 0) {
      if (authorities?.value?.length > 0) {
        for (const checkAuth of paramAuths) {
          if (authorities.value.find((myAuthority) => myAuthority === checkAuth)) {
            return true
          }
        }
      }
    } else {
      return true
    }
    return false
  }

  // Done after authentication
  function postAuthInit() {
    // Compile Modules
    useMenuStore().compileModules()
  }

  return {
    authorities,
    user,
    postAuthInit,
    checkAccess
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
