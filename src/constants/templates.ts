import type {Template} from '../types/template';

const APP_DESCRIPTION_STARTER = 'Barebones scaffolding for your new app';
const APP_DESCRIPTION_EXAMPLE =
  'An example featuring authentication, data persistence, and image storage';

export const TEMPLATES: Template[] = [
  {
    framework: `Astro`,
    key: `astro-starter`,
    type: 'Starter',
    description: 'Barebones scaffolding for your new website',
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
    framework: `React`,
    key: `react-workshop`,
    type: 'Workshop',
    description: 'Explore Juno in an interactive workshop',
    kind: 'app'
  },
  {
    framework: `SvelteKit`,
    key: `sveltekit-starter`,
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `SvelteKit`,
    key: `sveltekit-example`,
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
  },
  {
    framework: `Angular`,
    key: `angular-starter`,
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Angular`,
    key: `angular-example`,
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Vanilla JavaScript`,
    key: `vanilla-js-example`,
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  }
];
