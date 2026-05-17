export type ApplicantStatus = 'applied' | 'shortlisted' | 'rejected';

export type Applicant = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  status: ApplicantStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApplicantsResponse = {
  data: Applicant[];
  page: number;
  limit: number;
  total: number;
};

export type CreateApplicantInput = {
  name: string;
  email: string;
  jobTitle: string;
  status?: ApplicantStatus;
};

export type UpdateApplicantStatusInput = {
  status: ApplicantStatus;
};

