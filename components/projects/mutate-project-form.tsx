'use client';

import { CreateProjectDTO } from '@/models/projects';
import { Button } from '@nextui-org/button';
import { Form } from '@nextui-org/form';
import { Input } from '@nextui-org/input';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

type MutateProjectFormProps = {
  form: UseFormReturn<CreateProjectDTO>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  isLoading: boolean;
  onClose?: () => void;
  submitButtonText?: string;
};

export function MutateProjectForm({
  form,
  handleSubmit,
  isLoading,
  onClose,
  submitButtonText = 'Create Project',
}: MutateProjectFormProps) {
  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Project Name"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            placeholder="e.g. E-commerce App, Task Manager"
          />
        )}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Description"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            placeholder="e.g. App for selling furnitures online"
          />
        )}
      />

      <div className="space-y-2 w-full">
        <Button
          type="submit"
          className="w-full"
          color="primary"
          isLoading={isLoading}
        >
          {submitButtonText}
        </Button>

        {onClose && (
          <Button
            variant="light"
            color="danger"
            type="button"
            className="w-full"
            onPress={onClose}
          >
            Close
          </Button>
        )}
      </div>
    </Form>
  );
}
