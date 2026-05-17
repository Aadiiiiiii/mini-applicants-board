'use client';

import { AddApplicantModal } from '@/components/applicants/AddApplicantModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteApplicant, getApplicants, updateApplicantStatus } from '@/lib/api';
import { useApplicantsStore } from '@/store/applicants-store';
import { ApplicantStatus } from '@/lib/types';

export default function ApplicantsPage() {
  const { status, page, limit, setStatus, setPage, setAddModalOpen } = useApplicantsStore();
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
  mutationFn: deleteApplicant,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['applicants'] });
  },
});

const updateStatusMutation = useMutation({
  mutationFn: ({
    id,
    status,
  }: {
    id: string;
    status: ApplicantStatus;
  }) => updateApplicantStatus(id, { status }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['applicants'] });
  },
});

  const { data, isLoading, isError } = useQuery({
    queryKey: ['applicants', status, page, limit],
    queryFn: () => getApplicants({ status, page, limit }),
  });
  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;
const canGoPrevious = page > 1;
const canGoNext = data ? page < totalPages : false;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Mini Applicants Board
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              View, filter, update, and manage applicants.
            </p>
          </div>

          <button
          onClick={() => setAddModalOpen(true)}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
            Add Applicant
          </button>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Filter by status
            </label>
            <select
              value={status}
              onChange={(event) =>
    setStatus(event.target.value as '' | 'applied' | 'shortlisted' | 'rejected')
  }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:w-56"
            >
              <option value="">All</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {isLoading && (
            <p className="py-8 text-center text-sm text-gray-600">
              Loading applicants...
            </p>
          )}

          {isError && (
            <p className="py-8 text-center text-sm text-red-600">
              Something went wrong while loading applicants.
            </p>
          )}

          {!isLoading && !isError && data?.data.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-600">
              No applicants found.
            </p>
          )}

          {!isLoading && !isError && data && data.data.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-700">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Job Title</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((applicant) => (
                    <tr key={applicant.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {applicant.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {applicant.email}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {applicant.jobTitle}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
  <select
    value={applicant.status}
    onChange={(event) =>
      updateStatusMutation.mutate({
        id: applicant.id,
        status: event.target.value as ApplicantStatus,
      })
    }
    disabled={updateStatusMutation.isPending}
    className="rounded-lg border border-gray-300 px-2 py-1 text-sm outline-none focus:border-gray-900"
  >
    <option value="applied">Applied</option>
    <option value="shortlisted">Shortlisted</option>
    <option value="rejected">Rejected</option>
  </select>
</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(applicant.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
  onClick={() => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${applicant.name}?`,
    );

    if (confirmed) {
      deleteMutation.mutate(applicant.id);
    }
  }}
  disabled={deleteMutation.isPending}
  className="text-sm font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  Delete
</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!isLoading && !isError && data && data.total > 0 && (
            <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                Showing page {data.page} of {totalPages} — Total applicants: {data.total}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!canGoPrevious}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!canGoNext}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}


        </div>
      </div>
      <AddApplicantModal />
    </main>
  );
}
