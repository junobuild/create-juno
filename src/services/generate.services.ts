import {nonNullish} from '@dfinity/utils';
import {downloadFromURL, gunzipFile} from '@junobuild/cli-tools';
import {readFile} from 'fs/promises';
import {red} from 'kleur';
import {cp, writeFile} from 'node:fs/promises';
import {basename, join, parse} from 'node:path';
import ora from 'ora';
import {BOILERPLATE_PATH, JUNO_CDN_URL} from '../constants/constants';
import {GITHUB_ACTION_DEPLOY} from '../templates/github-actions';
import type {PopulateInput, ServerlessFunctions} from '../types/generator';
import {untarFile, type UntarOutputFile} from '../utils/compress.utils';
import {
  createParentFolders,
  getLocalTemplatePath,
  getRelativeTemplatePath
} from '../utils/fs.utils';
import {createDirectory, getLocalFiles, type LocalFileDescriptor} from '../utils/populate.utils';

export const generate = async ({gitHubAction, serverlessFunctions, ...rest}: PopulateInput) => {
  const spinner = ora(`Creating project...`).start();

  try {
    const useLocalFiles = process.env.USE_LOCAL_TEMPLATES === 'true';

    const populateFn = useLocalFiles ? populateFromLocal : populateFromCDN;

    await populateFn(rest);

    if (nonNullish(serverlessFunctions)) {
      await populateServerlessFunctions({serverlessFunctions, ...rest});
    }

    if (gitHubAction) {
      await populateGitHubAction(rest);
    }

    await updatePackageJson(rest);
  } finally {
    spinner.stop();
  }
};

type PopulateInputFn = Omit<PopulateInput, 'gitHubAction' | 'serverlessFunctions'>;

const populateFromCDN = async ({where, template, localDevelopment}: PopulateInputFn) => {
  // Windows uses backslash, we cannot build the URL path without replacing those with slash.
  const templatePath = getRelativeTemplatePath(template).replace(/\\/g, '/');

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

  const {key: templateName} = template;

  const createFile = async ({name, content}: UntarOutputFile) => {
    const target = join(process.cwd(), where ?? '', name.replace(templateName, ''));

    if (!shouldCopyFile({target, localDevelopment})) {
      return;
    }

    createParentFolders(target);

    await writeFile(target, Buffer.concat(content));
  };

  await Promise.all(files.filter(({content}) => content.length !== 0).map(createFile));
};

const shouldCopyFile = ({
  localDevelopment,
  target
}: Pick<PopulateInputFn, 'localDevelopment'> & {target: string}): boolean => {
  const filenameWithExtension = basename(target);
  const {name: filenameWithoutExtension} = parse(target);

  if (['.ds_store', 'thumbs.db'].includes(filenameWithExtension)) {
    return false;
  }

  return (
    localDevelopment || !['docker-compose', 'juno.dev.config'].includes(filenameWithoutExtension)
  );
};

const populateFromLocal = async ({where, template, localDevelopment}: PopulateInputFn) => {
  const templatePath = getLocalTemplatePath(template);

  const files = getLocalFiles(templatePath);

  if (files.length === 0) {
    console.log(red("No files to download. That's unexpected."));
    process.exit(1);
  }

  await createDirectory(where);

  const createFile = async ({relativePath: p, path}: LocalFileDescriptor) => {
    const file = await readFile(path);
    const target = join(where ?? '', p.replace(templatePath, ''));

    if (!shouldCopyFile({target, localDevelopment})) {
      return;
    }

    createParentFolders(target);

    await writeFile(target, Buffer.from(file));
  };

  await Promise.all(files.map(createFile));
};

const populateGitHubAction = async ({where}: PopulateInputFn) => {
  const target = join(where ?? '', '.github', 'workflows', 'deploy.yaml');

  createParentFolders(target);

  await writeFile(target, GITHUB_ACTION_DEPLOY);
};

const updatePackageJson = async ({where, template}: PopulateInputFn) => {
  const pkgJson = join(process.cwd(), where ?? '', 'package.json');

  const data = await readFile(pkgJson, 'utf8');

  const regex = new RegExp(`"${template.key}"`, 'gi');

  const directory = where ?? basename(process.cwd());

  const result = data.replace(regex, `"${directory}"`);

  await writeFile(pkgJson, result, 'utf8');
};

const populateServerlessFunctions = async ({
  where,
  serverlessFunctions
}: PopulateInputFn & {serverlessFunctions: ServerlessFunctions}) => {
  const target = join(where ?? '', 'src', 'satellite');

  createParentFolders(target);

  const serverlessFunctionsSrc =
    serverlessFunctions === 'ts'
      ? 'typescript'
      : serverlessFunctions === 'js'
        ? 'javascript'
        : serverlessFunctions;

  const source = join(BOILERPLATE_PATH, 'functions', serverlessFunctionsSrc);

  await cp(source, target, {recursive: true});
};
