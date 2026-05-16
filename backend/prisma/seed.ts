import { PrismaClient, ApplicantStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.applicant.createMany({
    data: [
      {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        jobTitle: 'Frontend Developer',
        status: ApplicantStatus.applied,
      },
      {
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        jobTitle: 'Backend Developer',
        status: ApplicantStatus.shortlisted,
      },
      {
        name: 'Aman Verma',
        email: 'aman.verma@example.com',
        jobTitle: 'Full Stack Developer',
        status: ApplicantStatus.applied,
      },
      {
        name: 'Neha Gupta',
        email: 'neha.gupta@example.com',
        jobTitle: 'UI Developer',
        status: ApplicantStatus.rejected,
      },
      {
        name: 'Karan Mehta',
        email: 'karan.mehta@example.com',
        jobTitle: 'DevOps Engineer',
        status: ApplicantStatus.shortlisted,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  