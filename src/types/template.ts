import type {ProjectKind} from './generator';

export type TemplateKey = string;

export interface TemplateKeyOption {
  key: TemplateKey;
  language: TemplateLanguage;
}

export type TemplateKeys = TemplateKeyOption[];

export interface Template {
  keys: TemplateKeys;
  framework: TemplateFramework;
  type: TemplateType;
  description: string;
  kind: ProjectKind;
}

export type TemplateFramework =
  | 'Angular'
  | 'Astro'
  | 'Next.js'
  | 'React'
  | 'SvelteKit'
  | 'Vue'
  | 'Vanilla JavaScript';

export type TemplateType = 'Starter' | 'Example' | 'Workshop';

export type TemplateLanguage = 'JavaScript' | 'TypeScript';
