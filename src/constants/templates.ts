import type {Template} from '../types/template';

export const WEBSITE_TEMPLATES: Template[] = [
  {
    framework: `Astro`,
    key: `astro-starter`,
    type: 'Starter',
    description: 'Opt for a barebones scaffolding to kickstart your website'
  }
];

export const APP_TEMPLATES: Template[] = [
  {
    framework: `Next.js`,
    key: `nextjs-starter`,
    type: 'Starter',
    description: 'Opt for a barebones scaffolding to kickstart your app'
  }
];
