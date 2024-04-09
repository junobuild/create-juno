import {nonNullish} from '@junobuild/utils';
import {join} from 'node:path';
import {fileExists} from '../utils/fs.utils';
import {confirm} from '../utils/prompts.utils';
import {initArgs} from './args.services';
import {dependencies} from './deps.services';
import {generate} from './generate.services';
import {promptDestination, promptGitHubAction} from './prompt.services';
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

export const initNewProject = async (args: string[]) => {
  const userInputs = initArgs(args);

  const {destination} = nonNullish(userInputs?.destination)
    ? {destination: userInputs.destination}
    : await promptDestination();

  const template = nonNullish(userInputs.template) ? userInputs.template : await initTemplate();

  const gitHubAction = await promptGitHubAction();

  await generate({
    destination,
    template,
    gitHubAction
  });

  await dependencies();
};