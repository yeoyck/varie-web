# Admin Template

## Dev Features

- [Nuxt 3](https://v3.nuxtjs.org) (Vite), [Vue 3](https://vuejs.org/) (Composition API)
- Typescript
- SCSS/SASS
- Eslint / Stylelint / Prettier formatter

## 3rd Party Package/Library/Module/Plugin

- [Pinia](https://pinia.esm.dev/) - State Management
- [PrimeVue](https://www.primefaces.org/primevue/) - UI Framework | [PrimeFlex](https://www.primefaces.org/primeflex/) - Atomic CSS Framework | [PrimeIcon](https://www.primefaces.org/primevue/#/icons)
- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs
- [Vuelidate](https://vuelidate-next.netlify.app/) - Form Validation Utility
- [UnoCSS](https://github.com/antfu/unocss) - Only using it for the [Icon sets](https://icon-sets.iconify.design/)
- [DateFns](https://github.com/date-fns/date-fns) - Its [faster and smaller](https://github.com/you-dont-need/You-Dont-Need-Momentjs/blob/master/README.md) than moment

## Functional Features

- Build / White label profiling
- Menu / Module / Breadcrumb resolver
- Global search
- PrimeVue Input Wrapper (with vuelidate validation and shortcuts - also for consistency)

## To Do

- Axios interceptor n retries
- Add PWA
- Add auth
- API format standardization (listing request and error feedback)
- Add websocket handling
- UI / UX (Layout for listing, common pages, mobile ui etc)

## Prerequisite

- [Node](https://nodejs.org/en/) >= 14
- [Pnpm](https://pnpm.io/installation) - npm install -g pnpm

## IDE

We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (Disable Vetur if you have it).

After installing Volar, you need to enable ["Take Over Mode"](https://github.com/johnsoncodehk/volar/discussions/471)

- Press F1
- Type in `Extensions: Show Built-in Extensions`
- Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
- Reload VS Code

## Usage

### Clone

- [Create a repo from this template on GitHub](https://github.com/ionyxsg/admin-template/generate)
- [Clone for template development](https://github.com/ionyxsg/admin-template)

### Development

Just run and visit http://localhost:3000

```bash
pnpm dev
```
