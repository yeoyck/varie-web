// Compile Available Build Profiles
import dev from './build/dev'
import staging from './build/staging'

interface buildType {
  [key: string]: string
}

const compileBuilds: { [key: string]: buildType } = { dev, staging }
export default compileBuilds[process.env.BUILD_PROFILE || 'dev'] ?? {}

// Cant use import.meta.globEager here (outside of vite runtime)
// const availableProfiles = import.meta.globEager?.('./build/*.ts')
// const compileProfiles: Record<string, Record<string, string>> = {}
// if (availableProfiles) {
//   Object.keys(availableProfiles).forEach((key) => {
//     const extractKey = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.ts'))
//     compileProfiles[extractKey] = availableProfiles[key].default
//   })
// }

// export default compileProfiles[process.env.BUILD_PROFILE || 'dev'] ?? {}
