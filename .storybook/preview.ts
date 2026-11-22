import type { Preview } from '@storybook/react-vite';
import 'flatifycss/dist/css/flatify-min.css';
import './custom.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    options: {
      storySort: {
        order: ['Documents', 'Content', 'Forms', 'Buttons', 'Components'],
      },
    },
  },
};

export default preview;
