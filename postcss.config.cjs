// postcss.config.js
// 具体配置可以去 postcss-pxtorem 仓库看看文档
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        // 特别注意：如果用vant官网示例 `file.indexOf('vant')` 来匹配，请确保你的项目名或文件名没有包含'vant'
        // 建议改为 `file.indexOf('node_modules/vant')`
        return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      unitPrecision: 5,
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}
