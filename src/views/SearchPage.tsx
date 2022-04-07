import { useEffect, useState } from "react"
import { Search } from "../components/Search"
import { Student } from "../components/Student";
import { StudentModel } from "../models/students";
import { checkInStudent, getAllSortedStudents } from "../services/students"

export const SearchPage = () => {
  const [students, setStudents] = useState<Array<StudentModel>>([]);
  const [filteredStudents, setFilteredStudents] = useState<Array<StudentModel>>([]);

  const getStudents = async () => {
    let stu = await getAllSortedStudents();

    stu = stu.filter(s => !!s.last_name);
    setStudents(stu);
  }

  const checkIn = async (stu: StudentModel) => {
    await checkInStudent(stu);
  }

  useEffect(() => {
    getStudents()
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {students.length > 0 ? <Search unfiltered={students!} filterKey="last_name" filtered={(ret: Array<StudentModel>) => setFilteredStudents(ret)} /> : <></>}

      <div className="flex-col flex items-center">

      {filteredStudents.map(s => {
        return (
          <button type="button" onClick={() => checkIn(s)}>
            <Student student={s} />
          </button>
        )
      })}
      </div>

    </div>
  )
}