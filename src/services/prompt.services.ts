import {isNullish} from '@dfinity/utils';
import {red} from 'kleur';
import prompts from 'prompts';
import {TEMPLATES} from '../constants/templates';
import type {GeneratorInput, PopulateTemplate, ProjectKind} from '../types/generator';
import type {Template, TemplateFramework, TemplateKeyOption} from '../types/template';
import {assertAnswerCtrlC, confirm} from '../utils/prompts.utils';

export const promptTemplate = async (projectKind: ProjectKind): Promise<PopulateTemplate> => {
  const allTemplates = TEMPLATES.filter(({kind}) => kind === projectKind).reduce<
    Partial<Record<TemplateFramework, Template[]>>
  >((acc, {framework, ...rest}) => {
    return {
      ...acc,
      [framework]: [
        ...(acc[framework] ?? []),
        {
          framework,
          ...rest
        }
      ]
    };
  }, {});

  const frameworks = Object.keys(allTemplates);

  const {framework}: Pick<Template, 'framework'> = await prompts({
    type: 'select',
    name: 'framework',
    message: 'Which framework do you want to use?',
    choices: frameworks.map((framework) => ({title: framework, value: framework}))
  });

  assertAnswerCtrlC(framework);

  // We exclude workshop which is a material that serves a particular use case
  const templates = allTemplates[framework]?.filter(({type}) => type !== 'Workshop');

  if (isNullish(templates) || templates.length === 0) {
    console.log(`No template(s) found for ${red(framework)}. This is unexpected.`);
    process.exit(1);
  }

  if (templates.length === 1) {
    return await promptLanguage(templates[0]);
  }

  const {template}: {template: Template | undefined} = await prompts({
    type: 'select',
    name: 'template',
    message: 'Choose your starting point?',
    choices: templates.map((value) => ({
      title: value.type,
      description: value.description,
      value
    }))
  });

  if (isNullish(template)) {
    process.exit(0);
  }

  return await promptLanguage(template);
};

export const promptLanguage = async ({
  keys,
  ...templateRest
}: Template): Promise<PopulateTemplate> => {
  // If the template is provided with a sole language, we can auto select it.
  if (keys.length === 1) {
    return {
      ...templateRest,
      ...keys[0]
    };
  }

  const {key}: {key: TemplateKeyOption | undefined} = await prompts({
    type: 'select',
    name: 'key',
    message: 'Which language do you prefer?',
    choices: keys.map((key) => ({
      title: key.language,
      value: key
    }))
  });

  if (isNullish(key)) {
    process.exit(0);
  }

  return {
    ...templateRest,
    ...key
  };
};

export const promptDestination = async (): Promise<Pick<GeneratorInput, 'destination'>> => {
  const {destination}: {destination?: string} = await prompts({
    type: 'text',
    name: 'destination',
    message: 'Where should we create your project?'
  });

  // We do not use assertAnswerCtrlC here because we allow Return
  if (isNullish(destination)) {
    process.exit(0);
  }

  return {destination};
};

export const promptProjectKind = async (): Promise<ProjectKind> => {
  const {kind}: {kind: ProjectKind | undefined} = await prompts({
    type: 'select',
    name: 'kind',
    message: 'What kind of project are you starting?',
    choices: [
      {
        title: `Static website or blog`,
        value: `website`,
        description: 'Ideal for blogs, portfolios, and informational websites'
      },
      {
        title: `Application`,
        value: `app`,
        description: 'Suited for interactive, dynamic experiences with user authentication'
      }
    ]
  });

  assertAnswerCtrlC(kind);

  return kind;
};

export const promptGitHubAction = async (): Promise<boolean> => {
  return await confirm(`Would you like to set up a GitHub Action for deployment?`);
};

export const promptLocalDevelopment = async (): Promise<boolean> => {
  return await confirm(
    `Do you want to configure the project to use the local development emulator?`
  );
};
