import {files} from '@junobuild/cli-tools';
import {mkdir} from 'node:fs/promises';
import {relative} from 'node:path';

export interface LocalFileDescriptor {
  relativePath: string;
  path: string;
}

export const getLocalFiles = (templatePath: string): LocalFileDescriptor[] =>
  files(templatePath)
    .flat()
    .map((p) => ({relativePath: relative(templatePath, p), path: p}))
    .filter(({path}) => !path.includes('node_modules') && !path.includes('dist'));

export const createDirectory = async (where: string | null) => {
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
