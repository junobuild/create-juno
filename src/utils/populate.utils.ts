import {mkdir} from 'node:fs/promises';
import {relative} from 'node:path';
import {files} from './fs.utils';

export interface LocalFileDescriptor {
  relativePath: string;
  path: string;
}

export const getLocalFiles = async (templatePath: string): Promise<LocalFileDescriptor[]> =>
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
