import {nextArg} from '@junobuild/cli-tools';
import {isNullish} from '@junobuild/utils';
import {TEMPLATES} from '../constants/templates';
import type {PopulateTemplate} from '../types/generator';
import {promptProjectKind, promptTemplate} from './prompt.services';

export const argsTemplate = (args: string[]): PopulateTemplate | undefined => {
  const template = nextArg({args, option: '--template'});

  if (isNullish(template)) {
    return undefined;
  }

  const matchingTemplate = TEMPLATES.find(
    ({keys}) => keys.find(({key}) => key === template) !== undefined
  );

  if (isNullish(matchingTemplate)) {
    return undefined;
  }

  const {keys, ...restTemplate} = matchingTemplate;
  const matchingKey = keys.find(({key}) => key === template);

  if (isNullish(matchingKey)) {
    return undefined;
  }

  return {
    ...restTemplate,
    ...matchingKey
  };
};

export const initTemplate = async (): Promise<PopulateTemplate> => {
  const projectKind = await promptProjectKind();

  return await promptTemplate(projectKind);
};
