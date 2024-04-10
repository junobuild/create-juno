import {isNullish, nonNullish} from '@junobuild/utils';
import {cyan, green, grey, magenta, red, yellow} from 'kleur';
import {version} from '../package.json';
import {installCli} from './services/cli.services';
import {checkForExistingProject, initNewProject} from './services/project.services';
import {GeneratorInput} from './types/generator';
import {checkNodeVersion} from './utils/env.utils';

const JUNO_LOGO = `  __  __ __  __  _  ____ 
__) ||  |  ||  \\| |/    \\
\\___/ \\___/ |_|\\__|\\____/`;

const WELCOME = `${JUNO_LOGO} ${grey(`v${version}`)}

Welcome 👋
`;

const outro = ({input: {destination, localDevelopment}}: {input: GeneratorInput}) => {
  const emptyDestination = isNullish(destination) || destination === '';

  const startDevServer = `Run ${cyan('npm run dev')} to start your frontend dev server (CTRL+C to stop)`;

  const nonEmptyDestinationNext = `1. Enter your project directory using ${cyan(`cd ${destination}`)}
2. ${startDevServer}`;

  const localDev = `In another terminal, run ${yellow('juno dev start')} to quickstart the local development emulator`;

  const mainnetDev = `To connect your satellite with the project, run ${yellow('juno init')}`;

  console.log(`\n✅ ${green('Project initialized.')} Ready to explore !

${emptyDestination ? startDevServer : nonEmptyDestinationNext}

• ${localDevelopment ? localDev : mainnetDev}

Stuck? Join us at ${magenta('https://discord.gg/wHZ57Z2RAG')}

⭐️⭐️⭐️ stars are also much appreciated: visit ${magenta('https://github.com/junobuild/juno')} and show your support!

Have fun building! 🚀`);
};

export const run = async () => {
  const {valid} = checkNodeVersion();

  if (!valid) {
    return;
  }

  console.log(WELCOME);

  const {initProject} = await checkForExistingProject();

  let input: GeneratorInput | undefined;

  if (initProject) {
    const args = process.argv.slice(2);

    input = await initNewProject(args);
  }

  const {installed} = await installCli();

  if (!initProject && !installed) {
    console.log('');
    console.log(grey('All set, coolio. 👍'));
  }

  if (initProject && nonNullish(input)) {
    outro({input});
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
