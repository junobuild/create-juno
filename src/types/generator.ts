import type {Template} from './template';

export interface GeneratorInput {
  destination: string | '';
  template: Template;
  gitHubAction: boolean;
  localDevelopment: boolean;
  verbose?: boolean;
}

export type ProjectKind = 'website' | 'app';

export type PopulateInput = {
  where: string | null;
} & Omit<GeneratorInput, 'destination'>;
