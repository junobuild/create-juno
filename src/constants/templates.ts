import type {Template} from '../types/template';

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
    description: 'Opt for a barebones scaffolding to kickstart your app',
    kind: 'app'
  },
  {
    framework: `Next.js`,
    key: `nextjs-example`,
    type: 'Example',
    description:
      'Begin with an example app featuring authentication, document storage, and image handling',
    kind: 'app'
  }
];
