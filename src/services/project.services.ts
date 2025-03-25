import {nonNullish} from '@dfinity/utils';
import {fileExists, hasArgs} from '@junobuild/cli-tools';
import {join} from 'node:path';
import type {GeneratorInput} from '../types/generator';
import {confirm} from '../utils/prompts.utils';
import {initArgs} from './args.services';
import {dependencies} from './deps.services';
import {generate} from './generate.services';
import {promptDestination, promptGitHubAction, promptLocalDevelopment} from './prompt.services';
import {initTemplate} from './template.services';

export const checkForExistingProject = async (): Promise<{initProject: boolean}> => {
  const pkgJsonExists = await fileExists(join(process.cwd(), 'package.json'));

  if (!pkgJsonExists) {
    return {initProject: true};
  }

  const initProject = await confirm(
    'Existing project detected. Would you like to create an additional project in the same directory?'
  );

  return {initProject};
};

const generateProject = async ({destination, ...rest}: GeneratorInput) => {
  const input = {
    where: ['.', ''].includes(destination) ? null : destination,
    ...rest
  };

  await generate(input);

  await dependencies(input);
};

export const initNewProject = async (args: string[]): Promise<GeneratorInput> => {
  const userInputs = initArgs(args);

  const {destination} = nonNullish(userInputs.destination)
    ? {destination: userInputs.destination}
    : await promptDestination();

  const template = nonNullish(userInputs.template) ? userInputs.template : await initTemplate();

  const localDevelopment = await promptLocalDevelopment();

  const gitHubAction = await promptGitHubAction();

  const input = {
    destination,
    template,
    gitHubAction,
    localDevelopment,
    verbose: hasArgs({args, options: ['-v', '--verbose']})
  };

  await generateProject(input);

  return input;
};
