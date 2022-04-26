import { ApplicationCommandPermissionData } from 'discord.js';
import { GUILD_ID } from './config';

export const PERMISSIONS: Array<{
  commandName: string;
  guildId: string;
  permissions: ApplicationCommandPermissionData[];
}> = [
  {
    commandName: 'add_roles',
    guildId: GUILD_ID,
    permissions: [
      {
        id: '650131527300284416',
        type: 'USER',
        permission: true,
      },
    ],
  },
];
