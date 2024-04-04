import {grey, red} from 'kleur';
import {version} from '../package.json';
import {installCliIfNecessary} from './services/cli.services';
import {generate} from './services/generate.services';
import {promptDestination, promptProjectKind, promptTemplate} from './services/prompt.services';
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

  const {destination} = await promptDestination();

  const projectKind = await promptProjectKind();

  const template = await promptTemplate(projectKind);

  await generate({
    destination,
    template
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
