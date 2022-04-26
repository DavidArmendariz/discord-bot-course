import { ColorResolvable } from 'discord.js';

export const SELF_ROLES: Array<{
  emoji: { name: string; id: string };
  name: string;
  color: ColorResolvable;
}> = [
  {
    emoji: {
      name: 'javascript',
      id: '968595028622585887',
    },
    name: 'Javascript lover',
    color: 'YELLOW',
  },
  {
    emoji: {
      name: 'typescript',
      id: '968595043222974524',
    },
    name: 'Typescript lover',
    color: 'BLUE',
  },
];
