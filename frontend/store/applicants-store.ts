import { create } from 'zustand';
import { ApplicantStatus } from '@/lib/types';

type ApplicantsStore = {
  status: ApplicantStatus | '';
  page: number;
  limit: number;
  isAddModalOpen: boolean;
  setStatus: (status: ApplicantStatus | '') => void;
  setPage: (page: number) => void;
  setAddModalOpen: (isOpen: boolean) => void;
};

export const useApplicantsStore = create<ApplicantsStore>((set) => ({
  status: '',
  page: 1,
  limit: 10,
  isAddModalOpen: false,

  setStatus: (status) =>
    set({
      status,
      page: 1,
    }),

  setPage: (page) => set({ page }),

  setAddModalOpen: (isAddModalOpen) => set({ isAddModalOpen }),
}));

