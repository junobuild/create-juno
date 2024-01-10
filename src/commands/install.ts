import {cyan} from 'kleur';
import ora from 'ora';
import {spawn} from '../utils/cmd.utils';

export const installCli = async () => {
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
