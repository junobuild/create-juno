import {isNullish, nonNullish} from '@dfinity/utils';
import {cyan, green, grey, magenta, red} from 'kleur';
// eslint-disable-next-line import/no-relative-parent-imports
import {version} from '../package.json';
import {installCli} from './services/cli.services';
import {checkForExistingProject, initNewProject} from './services/project.services';
import type {GeneratorInput} from './types/generator';
import {checkNodeVersion} from './utils/env.utils';
import {whichPMRuns} from './utils/pm.utils';

const JUNO_LOGO = `  __  __ __  __  _  ____ 
__) ||  |  ||  \\| |/    \\
\\___/ \\___/ |_|\\__|\\____/`;

const WELCOME = `${JUNO_LOGO} ${grey(`v${version}`)}

Welcome 👋
`;

const outro = ({
  input: {destination, localDevelopment, serverlessFunctions}
}: {
  input: GeneratorInput;
}) => {
  const emptyDestination = isNullish(destination) || destination === '';

  const pm = whichPMRuns();

  const enterYourProjectDirectory = `Enter your project directory by running ${cyan(`cd ${destination}`)}`;
  const startDevServer = `Run ${cyan(`${pm} run dev`)} to start your frontend dev server (CTRL+C to stop)`;
  const runJunoInit = `Connect your satellite to the project by executing ${cyan('juno init')}`;

  const liveReload =
    nonNullish(serverlessFunctions) && ['ts', 'js'].includes(serverlessFunctions) ? ' --watch' : '';
  const startCmd = `juno emulator start${liveReload}`;
  const runJunoDevStart = `In another terminal, run ${cyan(startCmd)} to quickstart the local development emulator`;

  const runs = (index: number): string =>
    localDevelopment
      ? `${index}. ${startDevServer}
${index + 1}. ${runJunoDevStart}`
      : `${index}. ${runJunoInit}
${index + 1}. ${startDevServer}`;

  const commands = emptyDestination
    ? runs(1)
    : `1. ${enterYourProjectDirectory}
${runs(2)}`;

  console.log(`\n✅ ${green('Project initialized.')} Ready to explore !

${commands}

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

  const args = process.argv.slice(2);

  let input: GeneratorInput | undefined = undefined;

  if (initProject) {
    input = await initNewProject(args);
  }

  const {installed} = await installCli(args);

  if (!initProject && !installed) {
    console.log('');
    console.log(grey('All set, coolio. 👍'));
  }

  if (initProject && nonNullish(input)) {
    outro({input});
  }
};

(async () => {
  try {
    await run();
  } catch (err: unknown) {
    console.log(red('An unexpected error happened 😫.'), err);
  }
})();
