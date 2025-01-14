import type {Template, TemplateKeyOption} from './template';

export interface GeneratorInput {
  destination: string | '';
  template: PopulateTemplate;
  gitHubAction: boolean;
  localDevelopment: boolean;
  verbose?: boolean;
}

export type ProjectKind = 'website' | 'app';

export type PopulateInput = {
  where: string | null;
} & Omit<GeneratorInput, 'destination'>;

export type PopulateTemplate = Omit<Template, 'keys'> & TemplateKeyOption;
