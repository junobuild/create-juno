import {nonNullish} from '@junobuild/utils';
import {lstatSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'url';
import type {GeneratorInput} from '../types/generator';
import type {Template, TemplateStarter} from '../types/template';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATE_PATH = 'templates';

export const getTemplateName = ({
  template: {key},
  starter
}: {
  template: Template;
  starter: TemplateStarter | null;
}): string => `${key}${nonNullish(starter) ? `-${starter}` : ''}`;

export const getRelativeTemplatePath = (params: {
  template: Template;
  starter: TemplateStarter | null;
}) => join(TEMPLATE_PATH, getTemplateName(params));

export const getLocalTemplatePath = ({
  action,
  ...rest
}: {
  template: Template;
  starter: TemplateStarter | null;
} & Pick<GeneratorInput, 'action'>) =>
  join(__dirname, '..', TEMPLATE_PATH, action, getTemplateName(rest));

// TODO: cli-tools
export const files = (source: string): string[] =>
  readdirSync(source).flatMap((file) => {
    const path = join(source, file);
    return lstatSync(path).isDirectory() ? files(path) : join(path);
  });
