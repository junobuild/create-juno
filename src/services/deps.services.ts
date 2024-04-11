import {nonNullish} from '@junobuild/utils';
import ora from 'ora';
import type {PopulateInput} from '../types/generator';
import {spawn} from '../utils/cmd.utils';
import {whichPMRuns} from '../utils/pm.utils';
import {confirm} from '../utils/prompts.utils';

export const dependencies = async ({where, verbose}: PopulateInput) => {
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
      silentOut: verbose !== true,
      ...(nonNullish(where) && where !== '' && {cwd: where})
    });
  } finally {
    spinner.stop();
  }
};
