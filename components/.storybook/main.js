const { pathToFileURL } = require('url')

const path = require('path')

module.exports = {
  stories: [
    '../stories/docs/*.stories.mdx',
    '../stories/components/**/*.stories.@(ts|tsx|mdx)',
    '../stories/typography/**/*.stories.@(ts|tsx|mdx)',
    '../stories/pages/**/*.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-css-modules-preset'],
  webpackFinal: async (config) => {
    // Respect the baseUrl from tsconfig
    config.resolve.modules.push(path.resolve(__dirname, '../components'))
    config.resolve.alias['@components'] = path.resolve(__dirname, '../src')
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../utils')
    return config
  },
}
