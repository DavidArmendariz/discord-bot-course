import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { SELF_ROLES } from '../self-roles';
import { SlashCommand } from '../types';

export const AddRolesCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('add_roles')
    .setDescription('Creates a message so that people can get their own roles.')
    .setDefaultPermission(false),
  async run(interaction) {
    if (!interaction.inCachedGuild()) {
      await interaction.reply({
        content: 'You cannot use this command outside a cached guild',
      });
      return;
    }

    const buildEmbed = () => {
      let description = 'Give yourself a role!\n\n';

      for (const role of SELF_ROLES) {
        description += `<:${role.emoji.name}:${role.emoji.id}> - ${role.name}\n\n`;
      }

      return new MessageEmbed()
        .setTitle('Roles')
        .setDescription(description)
        .setColor('DARK_BLUE');
    };

    const reactToEmbed = async () => {
      for (const role of SELF_ROLES) {
        await message.react(`<:${role.emoji.name}:${role.emoji.id}>`);
      }
    };

    const createRolesIfExist = async () => {
      const existingRoles = await interaction.guild.roles.fetch();
      const existingRolesMap = existingRoles.reduce<Record<string, boolean>>(
        (result, { name }) => {
          result[name] = true;
          return result;
        },
        {}
      );
      for (const role of SELF_ROLES) {
        if (existingRolesMap[role.name]) {
          continue;
        }
        await interaction.guild.roles.create({
          name: role.name,
          color: role.color,
          mentionable: false,
        });
      }
    };

    const embed = buildEmbed();

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    await reactToEmbed();
    await createRolesIfExist();
  },
};
