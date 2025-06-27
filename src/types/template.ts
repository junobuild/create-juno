import type {ProjectKind} from './generator';

export type TemplateKey = string;

export interface TemplateKeyOption {
  key: TemplateKey;
  typeChecking: boolean;
}

export interface TemplateKeyJavaScript extends Omit<TemplateKeyOption, 'typeChecking'> {
  typeChecking: false;
}

export interface TemplateKeyTypeScript extends Omit<TemplateKeyOption, 'typeChecking'> {
  typeChecking: true;
}

export type TemplateKeys =
  | [TemplateKeyJavaScript]
  | [TemplateKeyTypeScript]
  | [TemplateKeyTypeScript, TemplateKeyJavaScript]
  | [TemplateKeyJavaScript, TemplateKeyTypeScript];

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

export type TemplateType = 'Minimal' | 'Demo';
