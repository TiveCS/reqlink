import { CreateProjectModal } from '@/components/projects/create-project-modal';

export function ProjectEmpty() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full h-full flex-1">
      <div className="text-center">
        <h6 className="text-xl font-medium">There are no project here</h6>
        <p className="text-default-500">
          Getting started by create new project
        </p>
      </div>

      <div>
        <CreateProjectModal buttonClassName="block" />
      </div>
    </div>
  );
}
