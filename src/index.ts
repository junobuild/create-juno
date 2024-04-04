import {red} from 'kleur';
import prompts from 'prompts';
import {installCliIfNecessary} from './services/cli.services';
import {generate} from './services/generate.services';
import {promptProjectName, promptStarter, promptTemplate} from './services/prompt.services';
import type {GeneratorInput} from './types/generator';
import {checkNodeVersion} from './utils/env.utils';
import {assertAnswerCtrlC} from './utils/prompts.utils';
import {grey} from 'kleur';
import {version} from '../package.json';

const JUNO_LOGO = `  __  __ __  __  _  ____ 
__) ||  |  ||  \\| |/    \\
\\___/ \\___/ |_|\\__|\\____/`;

const WELCOME = `${JUNO_LOGO} CLI ${grey(`v${version}`)}

Welcome 👋
`;

export const run = async () => {
  const {valid} = checkNodeVersion();

  if (!valid) {
    return;
  }

  console.log(WELCOME);

  // TODO: Welcome text "Hey 👋! Welcome to Juno blahblahblah..."

  const {action}: Pick<GeneratorInput, 'action'> = await prompts({
    type: 'select',
    name: 'action',
    message: 'What type of project do you want to initiate?',
    choices: [
      {title: `A static website`, value: `website`},
      {title: `An application`, value: `app`}
    ]
  });

  assertAnswerCtrlC(action);

  if (action === 'website') {
    console.warn('🚧 This feature is not yet implemented. Please try again later.');
    return;
  }

  const template = await promptTemplate(action);
  const starter = action === 'app' ? await promptStarter() : null;
  const name = await promptProjectName();

  await generate({
    action,
    name,
    template,
    starter
  });

  await installCliIfNecessary();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  try {
    await run();
  } catch (err: unknown) {
    console.log(`${red('An unexpected error happened 😫.')}`, err);
  }
})();
