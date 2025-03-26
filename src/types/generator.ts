import type {Template, TemplateKeyOption} from './template';

export interface GeneratorInput {
  destination: string | '';
  template: PopulateTemplate;
  gitHubAction: boolean;
  localDevelopment: boolean;
  serverlessFunctions: ServerlessFunctions | undefined;
  verbose?: boolean;
}

export type ProjectKind = 'website' | 'app';

export type ServerlessFunctions = 'rust' | 'ts' | 'js';

export type PopulateInput = {
  where: string | null;
} & Omit<GeneratorInput, 'destination'>;

export type PopulateTemplate = Omit<Template, 'keys'> & TemplateKeyOption;
