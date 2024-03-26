import {red} from 'kleur';
import prompts from 'prompts';
import {generate, promptProjectName, promptStarter, promptTemplate} from './commands/generate';
import {installCliIfNecessary} from './commands/install';
import {checkNodeVersion} from './utils/env.utils';
import {assertAnswerCtrlC} from './utils/prompts.utils';

export const run = async () => {
  const {valid} = checkNodeVersion();

  if (!valid) {
    return;
  }

  const {action}: {action: 'website' | 'app'} = await prompts({
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
