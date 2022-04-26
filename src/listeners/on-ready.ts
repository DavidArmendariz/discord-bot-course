import { Client } from 'discord.js';
import { PERMISSIONS } from '../permissions';
import { SlashCommands } from '../slash-commands';

export const onReady = (client: Client) => {
  client.on('ready', async () => {
    const setPermissions = async () => {
      for (const permission of PERMISSIONS) {
        const { guildId, permissions } = permission;
        const globalCommand = applicationCommands?.find(
          (command) => command.name === permission.commandName
        );
        await globalCommand?.permissions.set({
          guild: guildId,
          permissions,
        });

        const guild =
          client.guilds.cache.get(guildId) ||
          (await client.guilds.fetch(guildId));
        const guildCommands = await guild.commands.fetch();
        const guildCommand = guildCommands.find(
          (command) => command.name === permission.commandName
        );
        guildCommand?.permissions.set({ permissions });
      }
    };

    console.log(`${client.user?.username} is online`);

    const commands = SlashCommands.map(({ command }) => command.toJSON());
    const applicationCommands = await client.application?.commands.set(
      commands
    );

    await setPermissions();
  });
};
