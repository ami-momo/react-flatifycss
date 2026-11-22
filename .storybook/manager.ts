import { addons } from 'storybook/manager-api';
import FlatifyCSSTheme from './flatifycss.theme';

addons.setConfig({
  theme: FlatifyCSSTheme,
});
