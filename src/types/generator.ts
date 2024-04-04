import type {Template} from './template';

export interface GeneratorInput {
  destination: string | '';
  template: Template;
}

export type ProjectKind = 'website' | 'app';
