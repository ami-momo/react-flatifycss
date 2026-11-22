import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        // GitHub style tables in the MDX pages
        mdxPluginOptions: {
          mdxCompileOptions: { remarkPlugins: [remarkGfm] },
        },
      },
    },
    '@storybook/addon-links',
  ],
  staticDirs: [{ from: '../website/public', to: '/brand' }],
  typescript: {
    // react-docgen-typescript follows the props interfaces, so props tables
    // show the FlatifyCSS props. Props inherited from HTML attributes are hidden.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
