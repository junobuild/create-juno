import type {ProjectKind} from './generator';

export interface Template {
  key: string;
  framework: TemplateFramework;
  type: TemplateType;
  description: string;
  kind: ProjectKind;
}

export type TemplateFramework = 'Next.js' | 'Astro';

export type TemplateType = 'Starter' | 'Example';
