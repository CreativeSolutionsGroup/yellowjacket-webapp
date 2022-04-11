import { StudentModel } from "../models/students";

export const Student = ({ student }: {student: StudentModel}) => {
  return (
    <h1 className="font-bold text-3xl sm:text-5xl py-10">{student.last_name}, {student.first_name}</h1>
  )
}