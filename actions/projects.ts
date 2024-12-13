'use server';

import { createProject, findProjectsByTeamId } from '@/db/repo/projects';
import { findTeamByIdAndMemberId } from '@/db/repo/teams';
import { TeamError } from '@/errors/teams';
import { authedClient } from '@/lib/server/clients';
import { createProjectSchema } from '@/models/projects';
import { teamIdSchema } from '@/models/teams';

export const actionGetTeamProjects = authedClient
  .schema(teamIdSchema)
  .action(async ({ ctx, parsedInput: teamId }) => {
    const { user } = ctx;

    const team = await findTeamByIdAndMemberId(teamId, user.id);

    if (team.length === 0) throw new Error(TeamError.NotFound);

    const projects = await findProjectsByTeamId(teamId);

    return projects;
  });

export const actionCreateProject = authedClient
  .bindArgsSchemas([teamIdSchema.nullable()])
  .schema(createProjectSchema)
  .action(
    async ({
      ctx: { user },
      parsedInput: dto,
      bindArgsParsedInputs: [teamId],
    }) => {
      if (!teamId) throw new Error(TeamError.BadRequestTeamIdNotProvided);

      const team = await findTeamByIdAndMemberId(teamId, user.id);

      if (team.length === 0) throw new Error(TeamError.NotFound);

      const project = await createProject({
        teamId,
        name: dto.name,
        description: dto.description,
      });

      return project;
    }
  );
