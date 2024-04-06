import {grey, red} from 'kleur';
import {version} from '../package.json';
import {installCli} from './services/cli.services';
import {dependencies} from './services/deps.services';
import {generate} from './services/generate.services';
import {promptDestination} from './services/prompt.services';
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

  const [_cmd, ...args] = process.argv.slice(2);

  const {destination} = await promptDestination();

  const template = await initTemplate(args);

  await generate({
    destination,
    template
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
