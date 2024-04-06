import ora from 'ora';
import {spawn} from '../utils/cmd.utils';
import {whichPMRuns} from '../utils/pm.utils';
import {confirm} from '../utils/prompts.utils';

export const dependencies = async () => {
  const install = await confirm('Install dependencies?');

  if (!install) {
    return;
  }

  const spinner = ora(`Installing dependencies...`).start();

  try {
    const pm = whichPMRuns();

    await spawn({
      command: pm,
      args: ['install'],
      silentOut: true
    });
  } finally {
    spinner.stop();
  }
};
