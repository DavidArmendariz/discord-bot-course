import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from '../types';

export const AddCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .addNumberOption((option) =>
      option.setName('number1').setDescription('Number 1').setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName('number2').setDescription('Number 2').setRequired(true)
    )
    .setName('add')
    .setDescription('Returns the sum of two numbers'),
  async run(interaction) {
    const { options } = interaction;
    const number1 = options.getNumber('number1', true);
    const number2 = options.getNumber('number2', true);
    const sum = number1 + number2;
    await interaction.reply({
      content: `${number1} + ${number2} = ${sum}`,
    });
  },
};
