import { SlashCommand } from '../types';
import { AddCommand } from './add';
import { GoogleCommand } from './google';
import { HelloCommand } from './hello';
import { PollCommand } from './poll';
import { UserInfoCommand } from './user-info';

export const SlashCommands: SlashCommand[] = [
  HelloCommand,
  AddCommand,
  GoogleCommand,
  UserInfoCommand,
  PollCommand,
];
