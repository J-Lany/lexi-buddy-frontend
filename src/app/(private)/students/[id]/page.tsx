import StudentDetailsPage from '@/features/students/student-details/student-details-page';

export default function StudentPage({ params }: { params: { id: string } }) {
  return <StudentDetailsPage studentId={params.id} />;
}
