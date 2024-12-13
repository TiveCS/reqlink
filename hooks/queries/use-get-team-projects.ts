'use client';

import { actionGetTeamProjects } from '@/actions/projects';
import { useQuery } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';

type GetTeamProjectsArgs = {
  teamId: string | null;
};

export function useQueryGetTeamProjects({ teamId }: GetTeamProjectsArgs) {
  const { executeAsync: fetchProjects } = useAction(actionGetTeamProjects);

  return useQuery({
    queryKey: ['projects', teamId],
    queryFn: async () => {
      if (!teamId) return [];

      const result = await fetchProjects(teamId);

      return result?.data ?? [];
    },
  });
}
