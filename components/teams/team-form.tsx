'use client';

import { MutateTeamDTO } from '@/models/teams';
import { Button } from '@nextui-org/button';
import { Form } from '@nextui-org/form';
import { Input } from '@nextui-org/input';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

type TeamFormProps = {
  form: UseFormReturn<MutateTeamDTO>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  onClose?: () => void;
  submitButtonText?: string;
};

export function TeamForm({
  form,
  handleSubmit,
  onClose,
  submitButtonText = 'Create Team',
}: TeamFormProps) {
  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Team Name"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />

      <div className="space-y-2 w-full">
        <Button type="submit" color="primary" className="w-full">
          {submitButtonText}
        </Button>

        {onClose && (
          <Button
            type="button"
            variant="light"
            color="danger"
            className="w-full"
            onPress={onClose}
            isLoading={form.formState.isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
}
