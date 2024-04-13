import type {ProjectKind} from './generator';

export interface Template {
  key: string;
  framework: TemplateFramework;
  type: TemplateType;
  description: string;
  kind: ProjectKind;
}

export type TemplateFramework = 'Angular' | 'Astro' | 'Next.js' | 'React' | 'SvelteKit' | 'Vue';

export type TemplateType = 'Starter' | 'Example';
