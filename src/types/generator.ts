import type {Template} from './template';

export interface GeneratorInput {
  destination: string | '';
  template: Template;
  gitHubAction: boolean;
  localDevelopment: boolean;
}

export type ProjectKind = 'website' | 'app';
