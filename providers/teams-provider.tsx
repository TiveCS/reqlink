'use client';

import { actionGetUserTeams } from '@/actions/teams';
import { Team } from '@/db/schema';
import { AsyncListData, useAsyncList } from '@react-stately/data';
import { useAction } from 'next-safe-action/hooks';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from 'react';

type TeamsContextProps = {
  getTeams: AsyncListData<Team & { projectCount: number }>;
  selectedTeamId: string | null;
  setSelectedTeamId: Dispatch<SetStateAction<string | null>>;
  previousSelectedTeamId: string | null;
};

export const TeamsContext = createContext<TeamsContextProps | undefined>(
  undefined
);

type TeamsProviderProps = React.PropsWithChildren & {
  isSelectFirstTeam?: boolean;
};

export function TeamsProvider({
  children,
  isSelectFirstTeam,
}: TeamsProviderProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const previousSelectedTeamId = useRef<string | null>(null);

  const { executeAsync: fetchTeams } = useAction(actionGetUserTeams);

  const getTeams = useAsyncList({
    load: async () => {
      const result = await fetchTeams();

      const firstTeamId = result?.data?.[0]?.id;

      if (isSelectFirstTeam && firstTeamId) {
        setSelectedTeamId(firstTeamId);
      }

      return {
        items: result?.data ?? [],
      };
    },
    getKey: (team) => team.id,
  });

  return (
    <TeamsContext.Provider
      value={{
        getTeams,
        selectedTeamId,
        setSelectedTeamId,
        previousSelectedTeamId: previousSelectedTeamId.current,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
