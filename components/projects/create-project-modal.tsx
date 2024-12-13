'use client';

import { actionCreateProject } from '@/actions/projects';
import { createProjectSchema } from '@/models/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import { useState } from 'react';
import { toast } from 'sonner';
import { MutateProjectForm } from './mutate-project-form';
import { useSafeContext } from '@/lib/utils';
import { TeamsContext } from '@/providers/teams-provider';
import { cn } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';

type CreateProjectModal = {
  buttonClassName?: string;
};

export function CreateProjectModal({ buttonClassName }: CreateProjectModal) {
  const { selectedTeamId, getTeams } = useSafeContext(TeamsContext);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const selectedTeam = getTeams.items.find(
    (team) => team.id === selectedTeamId
  );
  const isTeamProjectsEmpty = selectedTeam?.projectCount === 0;

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    actionCreateProject.bind(null, selectedTeamId),
    zodResolver(createProjectSchema),
    {
      formProps: {
        defaultValues: {
          name: '',
          description: '',
        },
      },
      actionProps: {
        onExecute: () => {
          toast.loading('Creating project...', { id: 'create-project' });
        },
        onSuccess: async () => {
          toast.success('Project created!', { id: 'create-project' });
          setIsOpen(false);
          await queryClient.invalidateQueries({
            queryKey: ['projects', selectedTeamId],
          });
        },
        onError: () => {
          toast.error('Failed to create project', { id: 'create-project' });
        },
      },
    }
  );

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        color="primary"
        className={cn(
          isTeamProjectsEmpty ? 'hidden' : 'block',
          buttonClassName
        )}
      >
        Create Project
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create New Project</ModalHeader>

              <ModalBody>
                <MutateProjectForm
                  form={form}
                  handleSubmit={handleSubmitWithAction}
                  isLoading={action.isExecuting}
                  submitButtonText="Create Project"
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
