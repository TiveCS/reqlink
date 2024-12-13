import { CreateProjectModal } from '@/components/projects/create-project-modal';
import { TeamsProvider } from '@/providers/teams-provider';
import { ProjectList } from './_components/project-list';
import { TeamNavs } from './_components/team-navs';

export default async function ProjectsPage() {
  return (
    <section id="projects-page" className="my-8 flex-1 flex-col flex">
      <TeamsProvider isSelectFirstTeam>
        <>
          <div className="flex flex-row items-center justify-between px-32">
            <TeamNavs />

            <CreateProjectModal />
          </div>

          <ProjectList />
        </>
      </TeamsProvider>
    </section>
  );
}
