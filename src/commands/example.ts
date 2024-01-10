import {mkdirSync} from 'fs';
import {red} from 'kleur';
import {existsSync} from 'node:fs';
import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import ora from 'ora';
import prompts from 'prompts';
import {GitHubTreeEntry} from '../types/github';
import {assertAnswerCtrlC} from '../utils/prompts.utils';

interface Framework {
  key: string;
  title: string;
  path: string;
}

const FRAMEWORKS: Framework[] = [
  {title: `Next.js`, key: `next`, path: 'next/diary/'},
  {title: `React`, key: `react`, path: 'react/diary/'},
  {title: `SvelteKit`, key: `vue`, path: 'svelte/form/'},
  {title: `Vue`, key: `vue`, path: 'vue/diary/'},
  {title: `Angular`, key: `angular`, path: 'angular/diary/'},
  {title: `Astro`, key: `astro`, path: 'astro/'}
];

export const exploreExample = async () => {
  const where = await promptWhere();

  const framework = await promptFramework();

  const {path} = framework;
  const files = await getFiles({path});

  if (files.length === 0) {
    console.log(`${red("No files to download. That's unexpected.")}`);
    process.exit(1);
  }

  await populate({where, framework, files});

  console.log(`\n✅ Example ready. Continue as following:`);

  if (where !== null) {
    console.log(`\n❯ cd ${where}`);
  }
  console.log(`❯ npm ci`);
  console.log(`❯ npm run dev`);
};

const promptWhere = async (): Promise<string | null> => {
  const SAME_DIRECTORY = '(hit Enter to use current directory)';

  const {where}: {where: string} = await prompts([
    {
      type: 'text',
      name: 'where',
      message: `Where should we create your project?`,
      initial: SAME_DIRECTORY
    }
  ]);

  assertAnswerCtrlC(where);

  return where === SAME_DIRECTORY ? null : where;
};

const promptFramework = async (): Promise<Framework> => {
  const {framework}: {framework: string} = await prompts({
    type: 'select',
    name: 'framework',
    message: 'What framework would you like to explore?',
    choices: FRAMEWORKS.map(({title, key}) => ({title, value: key}))
  });

  assertAnswerCtrlC(framework);

  const result = FRAMEWORKS.find(({key}) => key === framework);

  if (result === undefined) {
    console.log(`${red("Unknown framework selected. That's unexpected.")}`);
    process.exit(1);
  }

  return result;
};

const getFiles = async ({path}: {path: string}): Promise<GitHubTreeEntry[]> => {
  const res = await fetch(
    `https://api.github.com/repos/junobuild/examples/git/trees/main?recursive=1`
  );
  const {tree, message}: {tree: GitHubTreeEntry[]; message?: string} = await res.json();

  if (tree === undefined) {
    console.log(
      `${red(`No files can be found on GitHub.${message !== undefined ? ` ${message}` : ''}`)}`
    );
    process.exit(1);
  }

  return tree.filter(({type, path: p}) => type === 'blob' && p.startsWith(path));
};

const createDirectory = async (where: string | null) => {
  if (where === null) {
    return;
  }

  await mkdir(where);
};

const populate = async ({
  where,
  framework: {path},
  files
}: {
  where: string | null;
  framework: Framework;
  files: GitHubTreeEntry[];
}) => {
  const spinner = ora(`Creating example...`).start();

  try {
    await createDirectory(where);

    const downloadFile = async (path: string): Promise<ArrayBuffer> => {
      const res = await fetch(`https://raw.githubusercontent.com/junobuild/examples/main/${path}`);

      if (!res.ok) {
        throw new Error(`Something went wrong: ${res.statusText} | ${path}`);
      }

      return res.arrayBuffer();
    };

    const createFile = async ({path: p}: GitHubTreeEntry) => {
      const file = await downloadFile(p);

      const target = join(where ?? '', p.replace(path, ''));

      const folder = dirname(target);
      if (!existsSync(folder)) {
        mkdirSync(folder, {recursive: true});
      }

      await writeFile(target, Buffer.from(file));
    };

    await Promise.all(files.map(createFile));
  } finally {
    spinner.stop();
  }
};
