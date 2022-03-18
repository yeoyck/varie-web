// https://v3.nuxtjs.org/docs/directory-structure/middleware
// middleware does not work in layout (route level) yet
// follow: https://github.com/nuxt/framework/discussions/2468
export default defineNuxtRouteMiddleware((to: any, from: any) => {
  // If undefined means its using the default layout
  // if (to.meta?.layout === undefined) {
  //   const context = useNuxtApp()
  //   console.log('guarding')
  //   console.log(from)
  //   console.log(to)
  // }
})
