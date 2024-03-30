import {readFile} from 'fs/promises';
import {red} from 'kleur';
import {mkdir, writeFile} from 'node:fs/promises';
import {join, relative} from 'node:path';
import ora from 'ora';
import {JUNO_CDN_URL} from '../constants/constants';
import type {GeneratorInput} from '../types/generator';
import {gunzipFile, untarFile, type UntarOutputFile} from './compress.utils';
import {downloadFromURL} from './download.utils';
import {
  createParentFolders,
  files,
  getLocalTemplatePath,
  getRelativeTemplatePath,
  getTemplateName
} from './fs.utils';

interface LocalFileDescriptor {
  relativePath: string;
  path: string;
}

const getLocalFiles = async (templatePath: string): Promise<LocalFileDescriptor[]> =>
  files(templatePath)
    .flat()
    .map((p) => ({relativePath: relative(templatePath, p), path: p}));

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

export const populate = async (input: PopulateInput) => {
  const spinner = ora(`Creating example...`).start();

  try {
    const useLocalFiles = process.env.USE_LOCAL_TEMPLATES === 'true';

    if (!useLocalFiles) {
      await populateFromCDN(input);
      return;
    }

    await populateFromLocal(input);
  } finally {
    spinner.stop();
  }
};

const populateFromCDN = async ({where, ...rest}: PopulateInput) => {
  const templatePath = getRelativeTemplatePath(rest);

  const {hostname} = new URL(JUNO_CDN_URL);

  const buffer = await downloadFromURL({
    hostname,
    path: `/${templatePath}.tar.gz`,
    headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    }
  });

  const uncompressedBuffer = await gunzipFile({source: buffer});

  const files = await untarFile({source: uncompressedBuffer});

  await createDirectory(where);

  const templateName = getTemplateName(rest);

  const createFile = async ({name, content}: UntarOutputFile) => {
    const target = join(process.cwd(), where ?? '', name.replace(templateName, ''));

    createParentFolders(target);

    await writeFile(target, Buffer.concat(content));
  };

  await Promise.all(files.filter(({content}) => content.length !== 0).map(createFile));
};

const populateFromLocal = async ({where, ...rest}: PopulateInput) => {
  const templatePath = getLocalTemplatePath(rest);

  const files = await getLocalFiles(templatePath);

  if (files.length === 0) {
    console.log(`${red("No files to download. That's unexpected.")}`);
    process.exit(1);
  }

  await createDirectory(where);

  const createFile = async ({relativePath: p, path}: LocalFileDescriptor) => {
    const file = await readFile(path);
    const target = join(where ?? '', p.replace(templatePath, ''));

    createParentFolders(target);

    await writeFile(target, Buffer.from(file));
  };

  await Promise.all(files.map(createFile));
};
