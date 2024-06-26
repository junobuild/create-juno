import {existsSync, mkdirSync} from 'node:fs';
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
