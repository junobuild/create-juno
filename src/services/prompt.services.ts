import {isNullish} from '@junobuild/utils';
import {red} from 'kleur';
import prompts from 'prompts';
import {GeneratorInput} from '../types/generator';
import type {Template} from '../types/template';
import {assertAnswerCtrlC} from '../utils/prompts.utils';

const WEBSITE_TEMPLATES: Template[] = [];

const APP_TEMPLATES: Template[] = [{title: `Next.js`, key: `nextjs`}];

export const promptTemplate = async (type: 'app' | 'website'): Promise<Template> => {
  const collection = type === 'app' ? APP_TEMPLATES : WEBSITE_TEMPLATES;

  const {template}: {template: string} = await prompts({
    type: 'select',
    name: 'template',
    message: 'Which template do you want to use?',
    choices: collection.map(({title, key}) => ({title, value: key}))
  });

  assertAnswerCtrlC(template);

  const item = collection.find(({key}) => key === template);

  if (isNullish(item)) {
    console.log(red(`Invalid ${type} template: ${template}`));
    process.exit(1);
  }

  return item;
};

export const promptStarter = async () => {
  const {starter}: {starter: 'blank' | 'tutorial'} = await prompts({
    type: 'select',
    name: 'starter',
    message: 'Which starter template would you like to use?',
    choices: [
      {
        title: 'Blank (A blank starter with "just" a customized index page)',
        value: 'blank'
      },
      {
        title: 'Tutorial (the "diary" example app)',
        value: 'tutorial'
      }
    ]
  });

  assertAnswerCtrlC(starter);

  return starter;
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
