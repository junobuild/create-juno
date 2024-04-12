import type {Template} from '../types/template';

const APP_DESCRIPTION_STARTER = 'Opt for a barebones scaffolding to kickstart your app';
const APP_DESCRIPTION_EXAMPLE =
  'Begin with an example app featuring authentication, document storage, and image handling';

export const TEMPLATES: Template[] = [
  {
    framework: `Astro`,
    key: `astro-starter`,
    type: 'Starter',
    description: 'Opt for a barebones scaffolding to kickstart your website',
    kind: 'website'
  },
  {
    framework: `Next.js`,
    key: `nextjs-starter`,
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Next.js`,
    key: `nextjs-example`,
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `React`,
    key: `react-starter`,
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `React`,
    key: `react-example`,
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Vue`,
    key: `vue-starter`,
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Vue`,
    key: `vue-example`,
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  }
];
