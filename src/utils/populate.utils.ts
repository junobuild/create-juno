import {mkdirSync} from 'fs';
import {readFile} from 'fs/promises';
import {red} from 'kleur';
import {existsSync} from 'node:fs';
import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, join, relative} from 'node:path';
import ora from 'ora';
import type {GeneratorInput} from '../types/generator';
import type {GitHubTreeEntry} from '../types/github';
import {files, getLocalTemplatePath, getRelativeTemplatePath} from './fs.utils';

interface FileDescriptor {
  path: string;
  url: string;
}

const REPOSITORY = 'junobuild/create-juno';

const getLocalFiles = async (templatePath: string): Promise<FileDescriptor[]> =>
  files(templatePath)
    .flat()
    .map((p) => ({path: relative(templatePath, p), url: `file://${p}`}));

const getGitHubFiles = async (templatePath: string): Promise<FileDescriptor[]> => {
  const res = await fetch(`https://api.github.com/repos/${REPOSITORY}/git/trees/main?recursive=1`);
  const {tree, message}: {tree: GitHubTreeEntry[]; message?: string} = await res.json();

  if (tree === undefined) {
    console.log(
      `${red(`No files can be found on GitHub.${message !== undefined ? ` ${message}` : ''}`)}`
    );
    process.exit(1);
  }

  return tree
    .filter(({type, path: p}) => type === 'blob' && p.startsWith(templatePath))
    .map(({path}) => ({
      path,
      url: `https://raw.githubusercontent.com/${REPOSITORY}/main/${path}`
    }));
};

const createDirectory = async (where: string | null) => {
  // Where equals null means "create in current directory"
  if (where === null) {
    return;
  }

  try {
    await mkdir(where);
  } catch (err) {
    // @ts-expect-error
    if (err.code === 'EEXIST') {
      return;
    }
    throw err;
  }
};

type PopulateInput = {
  where: string | null;
} & Omit<GeneratorInput, 'name'>;

export const populate = async ({where, ...rest}: PopulateInput) => {
  const spinner = ora(`Creating example...`).start();

  const useLocalFiles = process.env.USE_LOCAL_TEMPLATES === 'true';
  const templatePath = useLocalFiles ? getLocalTemplatePath(rest) : getRelativeTemplatePath(rest);

  try {
    const files = await (useLocalFiles
      ? getLocalFiles(templatePath)
      : getGitHubFiles(templatePath));

    if (files.length === 0) {
      console.log(`${red("No files to download. That's unexpected.")}`);
      process.exit(1);
    }
    await createDirectory(where);

    const downloadFile = async (url: string): Promise<ArrayBuffer> => {
      if (url.startsWith('file://')) {
        return await readFile(url.replace('file://', ''));
      }
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Something went wrong: ${res.statusText} | ${url}`);
      }

      return await res.arrayBuffer();
    };

    const createFile = async ({path: p, url}: FileDescriptor) => {
      const file = await downloadFile(url);
      const target = join(where ?? '', p.replace(templatePath, ''));
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
