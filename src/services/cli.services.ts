import ora from 'ora';
import {CLI_PACKAGE} from '../constants/constants';
import {hasArgs} from '../utils/args.utils';
import {spawn} from '../utils/cmd.utils';
import {whichPMRuns} from '../utils/pm.utils';
import {confirm, NEW_CMD_LINE} from '../utils/prompts.utils';

const detectCliAlreadyInstalled = async (verbose: boolean): Promise<boolean> => {
  const pm = whichPMRuns();

  // Bun does not support list. For simplicity reason, we return false given that next question is "just" asking if developer want to install the cli.
  if (!['npm', 'pnpm', 'yarn'].includes(pm)) {
    return false;
  }

  try {
    const args =
      pm === 'yarn' ? ['global', 'list', '--depth=0'] : ['list', '--depth', '0', '--global'];

    let stdout = '';

    await spawn({
      command: pm,
      args,
      stdout: (output: string) => (stdout += output),
      silentOut: !verbose
    });

    return stdout.includes(CLI_PACKAGE);
  } catch (_err: unknown) {
    // According to our tests, on Windows, npm might just throw an error if there are no global lib installed yet. Therefore, we consider here an error as the CLI not being installed yet.
    return false;
  }
};

const install = async (verbose: boolean) => {
  const spinner = ora('Installing CLI (this may take a minute or so, hold tight 🤙)...').start();

  try {
    const pm = whichPMRuns();

    switch (pm) {
      case 'yarn': {
        await spawn({
          command: pm,
          args: ['global', 'add', CLI_PACKAGE],
          silentOut: !verbose
        });
        break;
      }
      default: {
        await spawn({
          command: pm,
          args: ['install', '--global', CLI_PACKAGE],
          silentOut: !verbose
        });
      }
    }
  } finally {
    spinner.stop();
  }
};

export const installCli = async (args: string[]): Promise<{installed: boolean}> => {
  const spinner = ora('Scanning for CLI...').start();

  const verbose = hasArgs({args, options: ['-v', '--verbose']});

  try {
    const cliInstalled = await detectCliAlreadyInstalled(verbose);

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

  await install(verbose);

  return {installed: true};
};
