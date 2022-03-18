import buildProfile from './build'
import defaultProfile from './label/default'
import coyB from './label/coyB'

interface buildType {
  [key: string]: string | Record<string, string>
}
const compileBuilds: { [key: string]: buildType } = { default: defaultProfile, coyB }
export default compileBuilds[buildProfile?.LABEL_PROFILE || 'default'] ?? {}
