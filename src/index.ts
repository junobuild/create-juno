import {red} from 'kleur';
import prompts from 'prompts';
import {exploreExample} from './commands/example';
import {installCli} from './commands/install';
import {checkNodeVersion} from './utils/env.utils';
import {assertAnswerCtrlC} from './utils/prompts.utils';

export const run = async () => {
  const {valid} = checkNodeVersion();

  if (!valid) {
    return;
  }

  const {action}: {action: string} = await prompts({
    type: 'select',
    name: 'action',
    message: 'Hey there 👋! What you wanna do?',
    choices: [
      {title: `Install Juno's CLI on your machine`, value: `cli`},
      {title: `Explore an example`, value: `example`}
    ]
  });

  assertAnswerCtrlC(action);

  if (action === 'cli') {
    await installCli();
    return;
  }

  await exploreExample();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  try {
    await run();
  } catch (err: unknown) {
    console.log(`${red('An unexpected error happened 😫.')}`, err);
  }
})();
