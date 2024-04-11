import {nonNullish} from '@junobuild/utils';
import ora from 'ora';
import type {PopulateInput} from '../types/generator';
import {spawn} from '../utils/cmd.utils';
import {whichPMRuns} from '../utils/pm.utils';
import {confirm} from '../utils/prompts.utils';

export const dependencies = async ({where}: PopulateInput) => {
  const install = await confirm('Install dependencies?');

  if (!install) {
    return;
  }

  const spinner = ora(`Installing dependencies...`).start();

  try {
    const pm = whichPMRuns();

    const args = [
      'install',
      ...(nonNullish(where) && where !== '' ? ['--prefix', where ?? ''] : [])
    ];

    await spawn({
      command: pm,
      args,
      silentOut: true
    });
  } finally {
    spinner.stop();
  }
};
