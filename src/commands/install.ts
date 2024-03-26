import {cyan} from 'kleur';
import ora from 'ora';
import prompts from 'prompts';
import {spawn} from '../utils/cmd.utils';

const CLI_PACKAGE = '@junobuild/cli';

// Run this ahead of time in parallel of other choices
const pCliInstalled = detectIfCliIsInstalled();

const installCli = async () => {
  const spinner = ora(`Installing CLI...`).start();

  try {
    await spawn({
      command: 'npm',
      args: ['i', '--g', '--silent', '@junobuild/cli']
    });
  } finally {
    spinner.stop();
  }

  console.log(`\n✅ CLI installed. Run ${cyan('juno --help')} to display more information.`);
};

export async function installCliIfNecessary() {
  const isCliInstalled = await pCliInstalled;
  if (isCliInstalled) {
    console.info('The Juno CLI is already installed.');
    return;
  }
  const {performInstall}: {performInstall: boolean} = await prompts({
    name: 'performInstall',
    type: 'confirm',
    message: 'Install the Juno CLI?'
  });
  if (!performInstall) {
    return;
  }
  await installCli();
}

async function detectIfCliIsInstalled() {
  const exitCode = await spawn({
    command: 'npm',
    args: ['list', '--depth', '0', '--global', CLI_PACKAGE],
    stdout: () => {} // Silent output
  });
  return exitCode === 0;
}
