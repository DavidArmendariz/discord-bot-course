import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export interface SlashCommand {
  command: SlashCommandBuilder;
  run: (interaction: CommandInteraction) => Promise<void>;
  help?: string;
}

export type HelpArray = Array<{
  subcommandName: string;
  subcommandDescription: string;
  subcommandHelp: string;
}>;
