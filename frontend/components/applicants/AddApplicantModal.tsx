'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApplicant } from '@/lib/api';
import { ApplicantStatus } from '@/lib/types';
import { useApplicantsStore } from '@/store/applicants-store';

export function AddApplicantModal() {
  const queryClient = useQueryClient();
  const { isAddModalOpen, setAddModalOpen } = useApplicantsStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState<ApplicantStatus>('applied');
  const [formError, setFormError] = useState('');

  const createMutation = useMutation({
    mutationFn: createApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicants'] });
      setName('');
      setEmail('');
      setJobTitle('');
      setStatus('applied');
      setFormError('');
      setAddModalOpen(false);
    },
    onError: () => {
      setFormError('Please check the form details and try again.');
    },
  });

  if (!isAddModalOpen) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !jobTitle.trim()) {
      setFormError('Name, email, and job title are required.');
      return;
    }

    createMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      jobTitle: jobTitle.trim(),
      status,
    });
  }

  function handleClose() {
    if (createMutation.isPending) {
      return;
    }

    setFormError('');
    setAddModalOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Applicant
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Add a new applicant to the board.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
              placeholder="Rahul Sharma"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
              placeholder="rahul@example.com"
              type="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
              placeholder="Frontend Developer"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ApplicantStatus)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
            >
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {formError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createMutation.isPending ? 'Adding...' : 'Add Applicant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
