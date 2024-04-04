export interface Template {
  key: string;
  framework: TemplateFramework;
  type: TemplateType;
  description: string;
}

export type TemplateFramework = 'Next.js' | 'Astro';

export type TemplateType = 'Starter' | 'Demo';
