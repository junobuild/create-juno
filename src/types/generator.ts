import type {Template} from './template';

export interface GeneratorInput {
  destination: string | '';
  template: Template;
  gitHubAction: boolean;
}

export type ProjectKind = 'website' | 'app';
