'use client';

import { actionCreateTeam } from '@/actions/teams';
import { toast } from 'sonner';
import { mutateTeamSchema } from '@/models/teams';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import { useState } from 'react';
import { TeamForm } from './team-form';
import { Button } from '@nextui-org/button';

type CreateTeamModalProps = {
  reloadTeams: () => void;
};

export function CreateTeamModal({ reloadTeams }: CreateTeamModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { form, handleSubmitWithAction } = useHookFormAction(
    actionCreateTeam,
    zodResolver(mutateTeamSchema),
    {
      formProps: {
        defaultValues: { name: '' },
      },
      actionProps: {
        onExecute: () => {
          toast.loading('Creating team...', { id: 'create-team' });
        },
        onError: ({ error }) => {
          if (error.validationErrors) {
            const { _errors } = error.validationErrors;
            toast.error('Please fill correct fields', {
              id: 'create-team',
              description: _errors ? _errors[0] : 'Something went wrong',
            });
          }
        },
        onSuccess: () => {
          toast.success('Team created!', { id: 'create-team' });
          reloadTeams();
          form.reset();
          setIsOpen(false);
        },
      },
    }
  );

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        variant="bordered"
        color="primary"
      >
        Create New Team
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isDismissable={!form.formState.isLoading}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create New Team</ModalHeader>

              <ModalBody>
                <TeamForm
                  form={form}
                  handleSubmit={handleSubmitWithAction}
                  onClose={onClose}
                  submitButtonText="Create Team"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
