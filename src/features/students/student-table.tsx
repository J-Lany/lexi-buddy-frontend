import { StudentRow } from '@/features/students/student-row';

const mock = [
  {
    id: 'dsneddj',
    name: 'Alex',
    telegram: 'alexsash',
    group: 'Birds',
    level: 'A2',
  },
  {
    id: 'ewrqwe1',
    name: 'Maria',
    telegram: 'mariadb',
    group: 'Cats',
    level: 'B1',
  },
  {
    id: 'fghjkl2',
    name: 'Ivan',
    telegram: 'ivan_t',
    group: 'Dogs',
    level: 'B2',
  },
  {
    id: 'uiopasd3',
    name: 'Anna',
    telegram: 'anna_banana',
    group: 'Birds',
    level: 'A1',
  },
  {
    id: 'qazwsx4',
    name: 'Sergey',
    telegram: 'serg_dev',
    group: 'Cats',
    level: 'C1',
  },
  {
    id: 'lmokn5',
    name: 'Elena',
    telegram: 'elenap',
    group: 'Dogs',
    level: 'A2',
  },
  {
    id: 'plmokn5',
    name: 'Elena',
    telegram: 'elenap',
    group: 'Dogs',
    level: 'A2',
  },
  {
    id: 'plmokn',
    name: 'Elena',
    telegram: 'elenap',
    group: 'Dogs',
    level: 'A2',
  },
  {
    id: 'plmkn5',
    name: 'Elena',
    telegram: 'elenap',
    group: 'Dogs',
    level: 'A2',
  },
];

export function StudentTable() {
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden sm:grid grid-cols-4 py-3 px-6 font-semibold rounded-full">
        <span>Name</span>
        <span>Telegram</span>
        <span>Group</span>
        <span>Level</span>
      </div>
      <div className="flex flex-col gap-4">
        {mock.map((student) => (
          <StudentRow key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}
