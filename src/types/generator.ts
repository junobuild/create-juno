import type {Template, TemplateStarter} from './template';

export interface GeneratorInput {
  action: 'website' | 'app';
  name: string;
  template: Template;
  starter: TemplateStarter | null;
}
