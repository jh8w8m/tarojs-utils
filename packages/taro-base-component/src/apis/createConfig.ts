// 调用可以创建一个配置闭包，然后供其他组件使用
interface packageConfig {
    enableMonitorPerformance?: boolean,
    enableCatchErrorGlobal?: boolean
}

export let initPackageConfig: packageConfig = {
    enableMonitorPerformance: false,
    enableCatchErrorGlobal: false
}

export const createConfig = (config: packageConfig) => {
    initPackageConfig = {
      ...initPackageConfig,
      ...config
    }
    return initPackageConfig
}
