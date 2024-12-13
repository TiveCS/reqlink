import { and, count, eq, InferInsertModel } from 'drizzle-orm';
import { db } from '..';
import { projectTable, teamMemberTable, teamTable } from '../schema';

export async function findTeamsByMemberId(memberId: string) {
  return db
    .select({
      id: teamTable.id,
      name: teamTable.name,
      ownedBy: teamTable.ownedBy,
      projectCount: count(projectTable.id),
    })
    .from(teamTable)
    .leftJoin(teamMemberTable, eq(teamTable.id, teamMemberTable.teamId))
    .leftJoin(projectTable, eq(teamTable.id, projectTable.teamId))
    .where(eq(teamMemberTable.memberId, memberId))
    .groupBy(teamTable.id);
}

export async function findTeamByIdAndMemberId(
  teamId: string,
  memberId: string
) {
  return db
    .select({ id: teamTable.id, name: teamTable.name })
    .from(teamTable)
    .innerJoin(teamMemberTable, eq(teamTable.id, teamMemberTable.teamId))
    .where(
      and(eq(teamTable.id, teamId), eq(teamMemberTable.memberId, memberId))
    );
}

export async function createTeam(data: InferInsertModel<typeof teamTable>) {
  return db.transaction(async (tx) => {
    const team = await tx
      .insert(teamTable)
      .values(data)
      .returning({ id: teamTable.id });
    const teamMember = await tx
      .insert(teamMemberTable)
      .values({ teamId: team[0].id, memberId: data.ownedBy })
      .returning({ memberId: teamMemberTable.memberId });

    return { teamId: team[0].id, memberId: teamMember[0].memberId };
  });
}

export async function deleteTeam(teamId: string) {
  return db.transaction(async (tx) => {
    await tx.delete(teamTable).where(eq(teamTable.id, teamId));
    await tx.delete(teamMemberTable).where(eq(teamMemberTable.teamId, teamId));
  });
}
