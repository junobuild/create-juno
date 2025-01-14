import type {Template} from '../types/template';

const APP_DESCRIPTION_STARTER = 'Barebones scaffolding for your new app';
const APP_DESCRIPTION_EXAMPLE =
  'An example featuring authentication, data persistence, and image storage';

export const TEMPLATES: Template[] = [
  {
    framework: `Astro`,
    keys: [
      {
        key: 'astro-starter',
        language: 'TypeScript'
      }
    ],
    type: 'Starter',
    description: 'Barebones scaffolding for your new website',
    kind: 'website'
  },
  {
    framework: `Next.js`,
    keys: [
      {
        key: 'nextjs-starter',
        language: 'TypeScript'
      }
    ],
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Next.js`,
    keys: [
      {
        key: 'nextjs-example',
        language: 'TypeScript'
      }
    ],
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `React`,
    keys: [
      {
        key: 'react-starter',
        language: 'JavaScript'
      },
      {
        key: 'react-ts-starter',
        language: 'TypeScript'
      }
    ],
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `React`,
    keys: [
      {
        key: 'react-example',
        language: 'JavaScript'
      }
    ],
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `React`,
    keys: [
      {
        key: 'react-workshop',
        language: 'JavaScript'
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
        language: 'TypeScript'
      }
    ],
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `SvelteKit`,
    keys: [
      {
        key: 'sveltekit-example',
        language: 'TypeScript'
      }
    ],
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Vue`,
    keys: [
      {
        key: 'vue-starter',
        language: 'TypeScript'
      }
    ],
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Vue`,
    keys: [
      {
        key: 'vue-example',
        language: 'TypeScript'
      }
    ],
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Angular`,
    keys: [
      {
        key: 'angular-starter',
        language: 'TypeScript'
      }
    ],
    type: 'Starter',
    description: APP_DESCRIPTION_STARTER,
    kind: 'app'
  },
  {
    framework: `Angular`,
    keys: [
      {
        key: 'angular-example',
        language: 'TypeScript'
      }
    ],
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  },
  {
    framework: `Vanilla JavaScript`,
    keys: [
      {
        key: 'vanilla-js-example',
        language: 'JavaScript'
      }
    ],
    type: 'Example',
    description: APP_DESCRIPTION_EXAMPLE,
    kind: 'app'
  }
];
