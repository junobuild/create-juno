import type {Template, TemplateStarter} from './template';

export interface GeneratorInput {
  action: 'website' | 'app';
  destination: string | "";
  template: Template;
  starter: TemplateStarter | null;
}
