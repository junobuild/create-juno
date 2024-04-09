import {existsSync, lstatSync, mkdirSync, readdirSync} from 'node:fs';
import {access} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {Template} from '../types/template';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATE_PATH = 'templates';

export const getRelativeTemplatePath = ({key}: Pick<Template, 'key'>) => join(TEMPLATE_PATH, key);

export const getLocalTemplatePath = ({key}: Pick<Template, 'key'>) =>
  join(__dirname, '..', TEMPLATE_PATH, key);

export const createParentFolders = (target: string) => {
  const folder = dirname(target);

  if (!existsSync(folder)) {
    mkdirSync(folder, {recursive: true});
  }
};

// TODO: cli-tools
export const files = (source: string): string[] =>
  readdirSync(source).flatMap((file) => {
    const path = join(source, file);
    return lstatSync(path).isDirectory() ? files(path) : join(path);
  });

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
};
