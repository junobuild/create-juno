import {nonNullish} from '@dfinity/utils';
import {cyan, grey} from 'kleur';
import type {GeneratorInput} from '../types/generator';
import {NEW_CMD_LINE} from '../utils/prompts.utils';
import {argsTemplate} from './template.services';

const argsDestination = (args: string[]): Pick<GeneratorInput, 'destination'> | undefined => {
  if (nonNullish(args) && args.length > 0 && args[0] !== '--' && !args[0]?.startsWith('--')) {
    const [destination, _] = args;
    return {destination};
  }

  return undefined;
};

export const initArgs = (args: string[]): Partial<GeneratorInput> => {
  const userDestination = argsDestination(args);
  const userTemplate = argsTemplate(args);

  if (nonNullish(userDestination) || nonNullish(userTemplate)) {
    if (nonNullish(userDestination)) {
      console.log(grey(`• Using ${cyan(userDestination.destination)} as project directory`));
    }

    if (nonNullish(userTemplate)) {
      console.log(grey(`• Using ${cyan(userTemplate.key)} as project template`));
    }

    console.log(NEW_CMD_LINE);
  }

  return {
    ...(userDestination ?? {}),
    ...(nonNullish(userTemplate) && {template: userTemplate})
  };
};
