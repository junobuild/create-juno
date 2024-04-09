import {isNullish} from '@junobuild/utils';
import {grey, red} from 'kleur';
import prompts from 'prompts';
import {TEMPLATES} from '../constants/templates';
import type {GeneratorInput, ProjectKind} from '../types/generator';
import type {Template, TemplateFramework} from '../types/template';
import {NEW_CMD_LINE, assertAnswerCtrlC, confirm} from '../utils/prompts.utils';

export const promptTemplate = async (projectKind: ProjectKind): Promise<Template> => {
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

  const templates = allTemplates[framework];

  if (isNullish(templates) || templates.length === 0) {
    console.log(`No template(s) found for ${red(framework)}. This is unexpected.`);
    process.exit(1);
  }

  if (templates.length === 1) {
    return templates[0];
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

  return template;
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
        title: `Static website`,
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
  return await confirm(
    `Would you like to set up a GitHub Action for deployment?${NEW_CMD_LINE}${grey("Remember, you'll need to configure a controller afterward. Check our documentation for more details")}`
  );
};
