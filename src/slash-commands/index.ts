import { SlashCommand } from '../types';
import { AddCommand } from './add';
import { HelloCommand } from './hello';

export const SlashCommands: SlashCommand[] = [HelloCommand, AddCommand];
