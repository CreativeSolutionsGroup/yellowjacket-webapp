import { useEffect, useState } from "react"
import { Search } from "../components/Search"
import { Student } from "../components/Student";
import { StudentModel } from "../models/students";
import { checkInStudent, getAllSortedStudents } from "../services/students"

export const SearchPage = () => {
  const [students, setStudents] = useState<Array<StudentModel>>([]);
  const [filteredStudents, setFilteredStudents] = useState<Array<StudentModel>>([]);
  const [sending, setSending] = useState<boolean>(false);

  const getStudents = async () => {
    let stu = await getAllSortedStudents();

    stu = stu.filter(s => !!s.last_name && s.is_checked_in === "FALSE");
    setStudents(stu);
  }

  const checkIn = async (stu: StudentModel) => {
    try {
      setSending(true);
      await checkInStudent(stu);
    } catch (e) {

    }

    setSending(false);
  }

  useEffect(() => {
    getStudents()
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {sending ? <h2 className="text-3xl font-bold">Sending...</h2>
        :
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="mb-5 text-3xl">Search for New Student:</h2>
          {students.length > 0 ? <Search unfiltered={students!} filterKey="last_name" filtered={(ret: Array<StudentModel>) => setFilteredStudents(ret)} /> : <></>}

          <div className="flex-col flex items-center w-full mt-5">

            {filteredStudents.map(s => {
              return (
                <button className="w-9/12 my-5 rounded-xl hover:text-white hover:bg-black cursor-pointer border border-black" type="button" onClick={() => checkIn(s)}>
                  <Student student={s} />
                </button>
              )
            })}
          </div>
        </div>
      }

    </div>
  )
}