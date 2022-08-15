import { StudentModel } from "../models/Students";

export const Student = ({ student }: { student: StudentModel | null }) => {
  return (
    <div className="flex flex-col py-10">
      <h1 className="font-bold text-3xl sm:text-5xl mb-3">{student?.last_name ?? ""}, {student?.first_name ?? ""}</h1>
      <p className="text-xl">{student?.student_id}</p>
    </div>
  )
}