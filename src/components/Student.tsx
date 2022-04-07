import { StudentModel } from "../models/students";

export const Student = ({ student }: {student: StudentModel}) => {
  return (
    <h1 className="font-bold text-5xl my-5">{student.last_name}, {student.first_name}</h1>
  )
}