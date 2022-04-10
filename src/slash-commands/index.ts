import { SlashCommand } from '../types';
import { AddCommand } from './add';
import { GoogleCommand } from './google';
import { HelloCommand } from './hello';

export const SlashCommands: SlashCommand[] = [
  HelloCommand,
  AddCommand,
  GoogleCommand,
];
