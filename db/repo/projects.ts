import { ProjectOverview } from '@/models/projects';
import { and, count, eq, InferInsertModel, isNull, not } from 'drizzle-orm';
import { db } from '..';
import {
  backlogTable,
  documentSpecItemTable,
  documentSpecTable,
  ItemStatus,
  projectTable,
} from '../schema';

export async function findProjectsByTeamId(
  teamId: string
): Promise<ProjectOverview[]> {
  const projectsQuery = db
    .select({
      id: projectTable.id,
      name: projectTable.name,
      updatedAt: projectTable.updatedAt,
      backlogLeft: count(backlogTable.id).as('backlogLeft'),
      requirementSpecLeft: count(documentSpecItemTable.id).as(
        'requirementSpecLeft'
      ),
    })
    .from(projectTable)
    .leftJoin(
      backlogTable,
      and(
        eq(backlogTable.projectId, projectTable.id),
        not(eq(backlogTable.status, ItemStatus.DONE))
      )
    )
    .leftJoin(
      documentSpecTable,
      eq(documentSpecTable.projectId, projectTable.id)
    )
    .leftJoin(
      documentSpecItemTable,
      and(
        eq(documentSpecItemTable.documentSpecId, documentSpecTable.id),
        not(eq(documentSpecItemTable.status, ItemStatus.DONE))
      )
    )
    .where(eq(projectTable.teamId, teamId))
    .groupBy(projectTable.id);

  return await projectsQuery.execute();
}

export async function createProject(
  data: InferInsertModel<typeof projectTable>
) {
  return db.transaction(async (tx) => {
    const project = await tx
      .insert(projectTable)
      .values(data)
      .returning({ id: projectTable.id, createdAt: projectTable.createdAt });

    return project[0];
  });
}

export async function softDeleteProjectById(projectId: string) {
  return db
    .update(projectTable)
    .set({ deletedAt: new Date() })
    .where(and(eq(projectTable.id, projectId), isNull(projectTable.deletedAt)));
}
