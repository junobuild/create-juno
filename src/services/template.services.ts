import {isNullish, nonNullish} from '@junobuild/utils';
import {APP_TEMPLATES, WEBSITE_TEMPLATES} from '../constants/templates';
import {Template} from '../types/template';
import {nextArg} from '../utils/args.utils';
import {promptProjectKind, promptTemplate} from './prompt.services';

const argsTemplate = (args?: string[]): Template | undefined => {
  const template = nextArg({args, option: '--template'});

  if (isNullish(template)) {
    return undefined;
  }

  return [...WEBSITE_TEMPLATES, ...APP_TEMPLATES].find(({key}) => key === template);
};

export const initTemplate = async (args?: string[]): Promise<Template> => {
  const userTemplate = argsTemplate(args);

  if (nonNullish(userTemplate)) {
    return userTemplate;
  }

  const projectKind = await promptProjectKind();

  return await promptTemplate(projectKind);
};
