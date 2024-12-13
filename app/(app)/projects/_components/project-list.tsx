'use client';

import { useQueryGetTeamProjects } from '@/hooks/queries/use-get-team-projects';
import { useSafeContext } from '@/lib/utils';
import { TeamsContext } from '@/providers/teams-provider';
import { ProjectCard } from './project-card';
import { ProjectCardSkeleton } from './project-card-skeleton';
import { ProjectEmpty } from './project-empty';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

export function ProjectList() {
  const { selectedTeamId } = useSafeContext(TeamsContext);

  const { data, isPending } = useQueryGetTeamProjects({
    teamId: selectedTeamId,
  });
  const projects = data ?? [];

  const isEmpty = projects.length === 0;

  if (!isPending && isEmpty) return <ProjectEmpty />;

  return (
    <ScrollShadow className="px-32 py-12 max-h-[70svh]">
      <div className="w-full grid grid-cols-3 gap-6">
        {!isPending &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              name={project.name}
              lastUpdated={project.updatedAt}
              backlogLeft={project.backlogLeft}
              requirementSpecLeft={project.requirementSpecLeft}
            />
          ))}

        {isPending &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
      </div>
    </ScrollShadow>
  );
}
