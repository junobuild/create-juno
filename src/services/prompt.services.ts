import {isNullish} from '@junobuild/utils';
import {red} from 'kleur';
import prompts from 'prompts';
import {GeneratorInput, ProjectKind} from '../types/generator';
import type {Template} from '../types/template';
import {assertAnswerCtrlC} from '../utils/prompts.utils';

const WEBSITE_TEMPLATES: Template[] = [
  {
    framework: `Astro`,
    key: `astro-starter`,
    type: 'Starter',
    description: 'Opt for a barebones scaffolding to kickstart your website'
  }
];

const APP_TEMPLATES: Template[] = [
  {
    framework: `Next.js`,
    key: `nextjs-starter`,
    type: 'Starter',
    description: 'Opt for a barebones scaffolding to kickstart your app'
  }
];

export const promptTemplate = async (kind: ProjectKind): Promise<Template> => {
  const allTemplates = Object.groupBy(
    kind === 'app' ? APP_TEMPLATES : WEBSITE_TEMPLATES,
    ({framework}) => framework
  );

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
    process.exit(1);
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
    process.exit(1);
  }

  return {destination};
};

export const promptProjectKind = async (): Promise<ProjectKind> => {
  const {kind}: {kind: ProjectKind | undefined} = await prompts({
    type: 'select',
    name: 'kind',
    message: 'What kind of project are you starting?',
    choices: [
      {title: `Website`, value: `website`},
      {title: `Application`, value: `app`}
    ]
  });

  assertAnswerCtrlC(kind);

  return kind;
};
