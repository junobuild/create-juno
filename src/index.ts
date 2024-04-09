import {grey, red} from 'kleur';
import {version} from '../package.json';
import {installCli} from './services/cli.services';
import {checkForExistingProject, initNewProject} from './services/project.services';
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

  const {initProject} = await checkForExistingProject();

  if (initProject) {
    const args = process.argv.slice(2);
    await initNewProject(args);
  }

  const {installed} = await installCli();

  if (!initProject && !installed) {
    console.log('');
    console.log(grey('All set, coolio. 👍'));
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  try {
    await run();
  } catch (err: unknown) {
    console.log(`${red('An unexpected error happened 😫.')}`, err);
  }
})();
