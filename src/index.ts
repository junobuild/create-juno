import {grey, red} from 'kleur';
import {version} from '../package.json';
import {installCliIfNecessary} from './services/cli.services';
import {generate} from './services/generate.services';
import {
  promptDestination,
  promptKind,
  promptStarter,
  promptTemplate
} from './services/prompt.services';
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

  const {kind} = await promptKind();

  if (kind === 'website') {
    console.warn('🚧 This feature is not yet implemented. Please try again later.');
    return;
  }
  const template = await promptTemplate(kind);
  const starter = kind === 'app' ? await promptStarter() : null;

  await generate({
    kind: kind,
    destination,
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
