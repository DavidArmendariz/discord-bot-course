import { Client } from 'discord.js';
import { SELF_ROLES } from '../self-roles';

export const onMessageReactionRemove = (client: Client): void => {
  client.on('messageReactionRemove', async (reaction, user) => {
    const reactionRole = SELF_ROLES.find(
      (role) => role.emoji.id === reaction.emoji.id
    );
    if (
      reaction.message.interaction?.commandName === 'add_roles' &&
      reactionRole &&
      reaction.message.inGuild() &&
      !user.bot
    ) {
      const guildId = reaction.message.guildId;
      const guild =
        client.guilds.cache.get(guildId) ||
        (await client.guilds.fetch(guildId));
      const existingRoles = guild.roles.cache;
      const roleToRemove = existingRoles.find(
        (existingRole) => existingRole.name === reactionRole.name
      );

      if (!roleToRemove) {
        return;
      }

      const userId = user.id;
      const member =
        guild.members.cache.get(userId) || (await guild.members.fetch(userId));

      await member.roles.remove(roleToRemove.id);
    }
  });
};
