import {nonNullish} from '@junobuild/utils';
import {grey, red} from 'kleur';
import {version} from '../package.json';
import {initArgs} from './services/args.services';
import {installCli} from './services/cli.services';
import {dependencies} from './services/deps.services';
import {generate} from './services/generate.services';
import {promptDestination, promptGitHubAction} from './services/prompt.services';
import {initTemplate} from './services/template.services';
import {checkNodeVersion} from './utils/env.utils';

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

  const args = process.argv.slice(2);

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

  await installCli();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  try {
    await run();
  } catch (err: unknown) {
    console.log(`${red('An unexpected error happened 😫.')}`, err);
  }
})();
