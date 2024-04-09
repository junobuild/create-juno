import {isNullish} from '@junobuild/utils';
import {TEMPLATES} from '../constants/templates';
import type {Template} from '../types/template';
import {nextArg} from '../utils/args.utils';
import {promptProjectKind, promptTemplate} from './prompt.services';

export const argsTemplate = (args: string[]): Template | undefined => {
  const template = nextArg({args, option: '--template'});

  if (isNullish(template)) {
    return undefined;
  }

  return TEMPLATES.find(({key}) => key === template);
};

export const initTemplate = async (): Promise<Template> => {
  const projectKind = await promptProjectKind();

  return await promptTemplate(projectKind);
};
