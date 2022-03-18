// TODO to replace this with nuxtjs/axios when the module is ready for nuxt3
// https://stackoverflow.com/questions/42999765/add-a-method-to-an-existing-class-in-typescript
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import URITemplate from 'urijs/src/URITemplate'
import URI from 'urijs'
declare module 'axios' {
  interface AxiosInstance {
    $request: { <T = unknown, D = unknown>(config: AxiosRequestConfig<D>): Promise<T> }
    $delete: { <T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> }
    $get: { <T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> }
    $head: { <T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> }
    $options: { <T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> }
    $post: { <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> }
    $put: { <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> }
    $patch: { <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> }
    expand: { (url: string, val: URITemplate.URITemplateInput): string }
    filter: { (url: string, filters: IFilter[], sort?: string): string }
    links: { (links: links): Record<string, string> }
  }
}
interface IFilter {
  key: string
  value: string | number | Date | boolean | Array<string> | Array<number> | Array<Date>
  type: 'STRING' | 'INTEGER' | 'DECIMAL' | 'DATE' | 'DATETIME' | 'BOOLEAN' | 'MULTIPLE'
}
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const axiosInstance: AxiosInstance = axios.create({
    timeout: 30000,
    baseURL: config.build.API_URL
  })

  /**
   * Similar function to nuxtjs/axios at extracting the data
   * https://github.com/nuxt-community/axios-module/blob/main/lib/plugin.js
   */
  axiosInstance.$request = function (...args) {
    return axiosInstance.request.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }
  axiosInstance.$delete = function (...args) {
    return axiosInstance.delete.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }
  axiosInstance.$get = function (...args) {
    return axiosInstance.get.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }
  axiosInstance.$head = function (...args) {
    return axiosInstance.head.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }
  axiosInstance.$options = function (...args) {
    return axiosInstance.options.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }
  axiosInstance.$post = function (...args) {
    return axiosInstance.post.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }
  axiosInstance.$put = function (...args) {
    return axiosInstance.put.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }
  axiosInstance.$patch = function (...args) {
    return axiosInstance.patch.apply(this, args).then((res) => {
      const tmpres = res as AxiosResponse
      return tmpres && tmpres.data
    })
  }

  /*
  expand('http://localhost/test/{id}{?page,size}', {
    id: 100 + '',
    page: 0 + '',
    size: 10 + ''
  })
  */
  axiosInstance.expand = (uri: string, val: URITemplate.URITemplateInput): string => {
    return new URITemplate(uri).expand(val) + ''
  }

  axiosInstance.filter = (uri: string, filters: IFilter[], sort?: string): string => {
    if (filters) {
      const url = new URI(uri)

      filters.forEach((filter) => {
        let val = filter.value
        switch (filter.type) {
          case 'DATE':
            if (useDate().isDate(val)) {
              val = useDate().formatDate(val as Date)
            }
            break
          case 'DATETIME':
            if (useDate().isDate(val)) {
              val = useDate().formatDateTime(val as Date)
            }
            break
          case 'DECIMAL':
            useNum().parseNumber(val + '')
            break
          case 'MULTIPLE':
            if (filter.value && Array.isArray(filter.value) && filter.value.length > 0) {
              val = ''
              for (const tempVal of filter.value) {
                if (val !== '') {
                  val += ',' + tempVal
                } else {
                  val = tempVal
                }
              }
            }
            break
        }
        url.addSearch(filter.key, val + '')
      })
      if (sort) {
        url.addSearch('sort', sort)
      }

      return url.valueOf()
    } else {
      return uri
    }
  }

  axiosInstance.links = (links: links): Record<string, string> => {
    const menu = {}
    if (links) {
      Object.keys(links).forEach(function (key) {
        Object.assign(menu, {
          [key]: links[key].href
        })
      })
    }
    return menu
  }

  return {
    provide: {
      api: axiosInstance
    }
  }
})
