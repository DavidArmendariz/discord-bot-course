import { HelpArray, SlashCommand } from '../types';
import { AddCommand } from './add';
import { GetRandomAnimeCommand } from './get-random-anime';
import { GoogleCommand } from './google';
import { HelloCommand } from './hello';
import { HelpCommand } from './help';
import { PollCommand } from './poll';
import { UserInfoCommand } from './user-info';

const SlashCommands: SlashCommand[] = [
  HelloCommand,
  AddCommand,
  GoogleCommand,
  UserInfoCommand,
  PollCommand,
  GetRandomAnimeCommand,
];

const helpArray: HelpArray = SlashCommands.filter(
  (command): command is Required<SlashCommand> => !!command.help
).map(({ command, help }) => ({
  subcommandName: command.name,
  subcommandDescription: command.description,
  subcommandHelp: help,
}));

const helpCommand = HelpCommand(helpArray);

SlashCommands.push(helpCommand);

export { SlashCommands };
