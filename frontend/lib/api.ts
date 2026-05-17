import axios from 'axios';
import {
  Applicant,
  ApplicantStatus,
  ApplicantsResponse,
  CreateApplicantInput,
  UpdateApplicantStatusInput,
} from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getApplicants(params: {
  status?: ApplicantStatus | '';
  page: number;
  limit: number;
}) {
  const response = await api.get<ApplicantsResponse>('/applicants', {
    params: {
      status: params.status || undefined,
      page: params.page,
      limit: params.limit,
    },
  });

  return response.data;
}

export async function createApplicant(data: CreateApplicantInput) {
  const response = await api.post<Applicant>('/applicants', data);
  return response.data;
}

export async function updateApplicantStatus(
  id: string,
  data: UpdateApplicantStatusInput,
) {
  const response = await api.patch<Applicant>(`/applicants/${id}`, data);
  return response.data;
}

export async function deleteApplicant(id: string) {
  const response = await api.delete<Applicant>(`/applicants/${id}`);
  return response.data;
}

