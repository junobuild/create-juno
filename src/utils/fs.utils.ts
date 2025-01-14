import {existsSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TemplateKey} from '../types/template';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATE_PATH = 'templates';

export const getRelativeTemplatePath = ({key}: {key: TemplateKey}) => join(TEMPLATE_PATH, key);

export const getLocalTemplatePath = ({key}: {key: TemplateKey}) =>
  join(__dirname, '..', TEMPLATE_PATH, key);

export const createParentFolders = (target: string) => {
  const folder = dirname(target);

  if (!existsSync(folder)) {
    mkdirSync(folder, {recursive: true});
  }
};
