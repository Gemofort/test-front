module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },

  // Uncomment the next line for proxy purposes
  // ,devServer: { disableHostCheck: true }
};
