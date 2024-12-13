'use client';

import { CreateTeamModal } from '@/components/teams/create-team-modal';
import { TeamSelector } from '@/components/teams/team-selector';
import { useSafeContext } from '@/lib/utils';
import { TeamsContext } from '@/providers/teams-provider';

export function TeamNavs() {
  const { getTeams, selectedTeamId, setSelectedTeamId } =
    useSafeContext(TeamsContext);

  return (
    <div className="grid grid-flow-col items-center gap-x-6">
      <TeamSelector
        isLoading={getTeams.isLoading}
        teams={getTeams.items}
        selectedTeamId={selectedTeamId}
        onSelectionChange={setSelectedTeamId}
      />

      <CreateTeamModal reloadTeams={getTeams.reload} />
    </div>
  );
}
