import {readFile} from 'fs/promises';
import {red} from 'kleur';
import {writeFile} from 'node:fs/promises';
import {basename, join} from 'node:path';
import ora from 'ora';
import {JUNO_CDN_URL} from '../constants/constants';
import {GITHUB_ACTION_DEPLOY} from '../templates/github-actions';
import type {GeneratorInput} from '../types/generator';
import {gunzipFile, untarFile, type UntarOutputFile} from '../utils/compress.utils';
import {downloadFromURL} from '../utils/download.utils';
import {
  createParentFolders,
  getLocalTemplatePath,
  getRelativeTemplatePath
} from '../utils/fs.utils';
import {createDirectory, getLocalFiles, type LocalFileDescriptor} from '../utils/populate.utils';

type PopulateInput = {
  where: string | null;
} & Omit<GeneratorInput, 'destination'>;

export const generate = async ({destination, ...rest}: GeneratorInput) => {
  await populate({
    where: ['.', ''].includes(destination) ? null : destination,
    ...rest
  });
};

const populate = async ({gitHubAction, ...rest}: PopulateInput) => {
  const spinner = ora(`Creating project...`).start();

  try {
    const useLocalFiles = process.env.USE_LOCAL_TEMPLATES === 'true';

    const populateFn = useLocalFiles ? populateFromLocal : populateFromCDN;

    await populateFn(rest);

    if (gitHubAction) {
      await populateGitHubAction(rest);
    }

    await updatePackageJson(rest);
  } finally {
    spinner.stop();
  }
};

const populateFromCDN = async ({where, template}: Omit<PopulateInput, 'gitHubAction'>) => {
  const templatePath = getRelativeTemplatePath(template);

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

    createParentFolders(target);

    await writeFile(target, Buffer.concat(content));
  };

  await Promise.all(files.filter(({content}) => content.length !== 0).map(createFile));
};

const populateFromLocal = async ({where, template}: Omit<PopulateInput, 'gitHubAction'>) => {
  const templatePath = getLocalTemplatePath(template);

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

const populateGitHubAction = async ({where}: Omit<PopulateInput, 'gitHubAction'>) => {
  const target = join(where ?? '', '.github', 'workflows', 'deploy.yaml');

  createParentFolders(target);

  await writeFile(target, GITHUB_ACTION_DEPLOY);
};

const updatePackageJson = async ({where, template}: Omit<PopulateInput, 'gitHubAction'>) => {
  const pkgJson = join(process.cwd(), where ?? '', 'package.json');

  const data = await readFile(pkgJson, 'utf8');

  const regex = new RegExp(`"${template.key}"`, 'gi');

  const directory = where ?? basename(process.cwd());

  const result = data.replace(regex, `"${directory}"`);

  await writeFile(pkgJson, result, 'utf8');
};
