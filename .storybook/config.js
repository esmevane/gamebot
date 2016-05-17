import { configure } from '@kadira/storybook';

const requirements = require.context('../', true, /-story\.js$/);

function loadStories() { requirements.keys().forEach(requirements) };

configure(loadStories, module);
