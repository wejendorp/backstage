import { createPlugin } from '@spotify-backstage/core';
import ExampleComponent from './components/ExampleComponent';

export default createPlugin({
  id: 'roll',
  register({ router }) {
    router.registerRoute('/roll', ExampleComponent);
  },
});
