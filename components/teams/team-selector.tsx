'use client';

import { Team } from '@/db/schema';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { cn } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';

type TeamSelectorProps = {
  isLoading: boolean;
  selectedTeamId: string | null;
  onSelectionChange: Dispatch<SetStateAction<string | null>>;
  teams: Team[];
  className?: string;
};

export function TeamSelector({
  isLoading,
  teams,
  onSelectionChange,
  selectedTeamId,
  className,
}: TeamSelectorProps) {
  return (
    <Autocomplete
      items={teams}
      placeholder="Select Team"
      label="Team"
      className={cn('max-w-sm w-full', className)}
      isLoading={isLoading}
      selectedKey={selectedTeamId}
      onSelectionChange={(key) =>
        onSelectionChange(() => key?.toString() ?? null)
      }
    >
      {(team) => <AutocompleteItem key={team.id}>{team.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
