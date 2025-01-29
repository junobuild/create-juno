import {nonNullish} from '@dfinity/utils';
import {spawn} from '@junobuild/cli-tools';
import ora from 'ora';
import type {PopulateInput} from '../types/generator';
import {whichPMRuns} from '../utils/pm.utils';
import {confirm} from '../utils/prompts.utils';

export const dependencies = async ({where, verbose}: PopulateInput) => {
  const install = await confirm("Install your project's dependencies now?");

  if (!install) {
    return;
  }

  const spinner = ora(`Installing dependencies (this may take a minute or so 🤖)...`).start();

  try {
    const pm = whichPMRuns();

    await spawn({
      command: pm,
      args: ['--silent', 'install'],
      silentOut: verbose !== true,
      ...(nonNullish(where) && where !== '' && {cwd: where})
    });
  } finally {
    spinner.stop();
  }
};
