'use server';

import { createTeam, findTeamsByMemberId } from '@/db/repo/teams';
import { authedClient } from '@/lib/server/clients';
import { mutateTeamSchema } from '@/models/teams';

export const actionGetUserTeams = authedClient.action(async ({ ctx }) => {
  return await findTeamsByMemberId(ctx.user.id);
});

export const actionCreateTeam = authedClient
  .schema(mutateTeamSchema)
  .action(async ({ ctx, parsedInput: data }) => {
    return await createTeam({
      name: data.name,
      ownedBy: ctx.user.id,
    });
  });
