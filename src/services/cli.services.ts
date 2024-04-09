import ora from 'ora';
import {CLI_PACKAGE} from '../constants/constants';
import {spawn} from '../utils/cmd.utils';
import {whichPMRuns} from '../utils/pm.utils';
import {confirm, NEW_CMD_LINE} from '../utils/prompts.utils';

const detectCliAlreadyInstalled = async (): Promise<boolean> => {
  const pm = whichPMRuns();

  // Bun does not support list. For simplicity reason, we return false given that next question is "just" asking if developer want to install the cli.
  if (!['npm', 'pnpm', 'yarn'].includes(pm)) {
    return false;
  }

  const args =
    pm === 'yarn' ? ['global', 'list', '--depth=0'] : ['list', '--depth', '0', '--global'];

  let stdout = '';

  await spawn({
    command: pm,
    args,
    stdout: (output: string) => (stdout += output),
    silentOut: true
  });

  return stdout.includes(CLI_PACKAGE);
};

const install = async () => {
  const spinner = ora('Installing CLI (this may take a minute or so, hold tight 🤙)...').start();

  try {
    const pm = whichPMRuns();

    switch (pm) {
      case 'yarn': {
        await spawn({
          command: pm,
          args: ['global', 'add', CLI_PACKAGE],
          silentOut: true
        });
        break;
      }
      default: {
        await spawn({
          command: pm,
          args: ['install', '--global', CLI_PACKAGE],
          silentOut: true
        });
      }
    }
  } finally {
    spinner.stop();
  }
};

export const installCli = async (): Promise<{installed: boolean}> => {
  const spinner = ora('Scanning for CLI...').start();

  try {
    const cliInstalled = await detectCliAlreadyInstalled();

    if (cliInstalled) {
      return {installed: false};
    }
  } finally {
    spinner.stop();
  }

  const performInstall = await confirm(
    `Do you want to install the Juno CLI now?${NEW_CMD_LINE}It's handy for tasks like deploying or starting your development environment.`
  );

  if (!performInstall) {
    return {installed: false};
  }

  await install();

  return {installed: true};
};
