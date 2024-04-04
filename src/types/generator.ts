import type {Template, TemplateStarter} from './template';

export interface GeneratorInput {
  kind: 'website' | 'app';
  destination: string | '';
  template: Template;
  starter: TemplateStarter | null;
}
