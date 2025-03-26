import type {Template} from '../types/template';

const APP_DESCRIPTION_STARTER = 'Barebones scaffolding for your new app';
const APP_DESCRIPTION_EXAMPLE =
  'An example showcasing authentication, data persistence, and image handling.';

export const TEMPLATES: Template[] = [
  {
    framework: `Astro`,
    keys: [
      {
        key: 'astro-starter',
        typeChecking: true
      }
    ],
    type: 'Minimal',
    description: 'Barebones scaffolding for your new website',
    kind: 'website'
  },
  {
    framework: `Next.js`,
    keys: [
      {
        key: 'nextjs-starter',
        typeChecking: true
      }
    ],
    type: 'Minimal',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Next.js`,
    keys: [
      {
        key: 'nextjs-example',
        typeChecking: true
      }
    ],
    type: 'Demo',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `React`,
    keys: [
      {
        key: 'react-starter',
        typeChecking: false
      },
      {
        key: 'react-ts-starter',
        typeChecking: true
      }
    ],
    type: 'Minimal',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `React`,
    keys: [
      {
        key: 'react-example',
        typeChecking: false
      },
      {
        key: 'react-ts-example',
        typeChecking: true
      }
    ],
    type: 'Demo',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `React`,
    keys: [
      {
        key: 'react-workshop',
        typeChecking: false
      }
    ],
    type: 'Workshop',
    description: 'Explore Juno in an interactive workshop',
    kind: 'app'
  },
  {
    framework: `SvelteKit`,
    keys: [
      {
        key: 'sveltekit-starter',
        typeChecking: true
      }
    ],
    type: 'Minimal',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `SvelteKit`,
    keys: [
      {
        key: 'sveltekit-example',
        typeChecking: true
      }
    ],
    type: 'Demo',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Vue`,
    keys: [
      {
        key: 'vue-starter',
        typeChecking: true
      }
    ],
    type: 'Minimal',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Vue`,
    keys: [
      {
        key: 'vue-example',
        typeChecking: true
      }
    ],
    type: 'Demo',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Angular`,
    keys: [
      {
        key: 'angular-starter',
        typeChecking: true
      }
    ],
    type: 'Minimal',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Angular`,
    keys: [
      {
        key: 'angular-example',
        typeChecking: true
      }
    ],
    type: 'Demo',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Vanilla JavaScript`,
    keys: [
      {
        key: 'vanilla-js-example',
        typeChecking: false
      }
    ],
    type: 'Demo',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  }
];
