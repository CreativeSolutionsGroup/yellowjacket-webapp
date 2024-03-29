import { Suspense, useEffect, useState } from "react"
import { Loading } from "../components/Loading";
import { Search } from "../components/Search"
import { Student } from "../components/Student";
import { StudentModel } from "../models/Students";
import { checkInStudent, getAllCheckedIn, getAllSortedStudents } from "../services/students"

import Modal from "react-modal";

export const SearchPage = () => {
  const [students, setStudents] = useState<Array<StudentModel>>([]);
  const [filteredStudents, setFilteredStudents] = useState<Array<StudentModel>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedStudent, setSelectedStudent] = useState<StudentModel | null>(null);

  const [checkInModalOpen, setCheckInModalOpen] = useState<boolean>(false);

  const getStudents = async () => {
    let stu = getAllSortedStudents();
    let checkedIn = getAllCheckedIn();

    const val = await Promise.all([stu, checkedIn]);
    const isProd = import.meta.env.MODE === "production";
    let parsedStudents = val[0].filter(s =>
      (!!s.last_name) &&
      (val[1].findIndex(c => c.student_id === s.student_id) < 0) &&
      (isProd ? s.sting_group_id !== "STING_GROUP_TEST" : s.sting_group_id === "STING_GROUP_TEST")
    );
    setStudents(parsedStudents);
    setFilteredStudents(parsedStudents);
    setLoading(false);
  }

  const toggleOpenCheckIn = (stu: StudentModel | null) => {
    setCheckInModalOpen(!checkInModalOpen);

    setSelectedStudent(stu);
  }

  const checkIn = async (stu: StudentModel) => {
    setCheckInModalOpen(false);

    try {
      setLoading(true);
      // console.log(stu)
      await checkInStudent(stu);
    } catch (e: any) {
      alert(e.message)
    }

    await getStudents();
    setLoading(false);
  }

  useEffect(() => {
    getStudents()
  }, []);


  return (
    <div className="flex flex-col justify-center items-center">
      {loading ? <Loading />
        :
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-3xl">Search for New Student:</h2> <small className="mb-5">By last name</small>
          {students.length > 0 ? <Search unfiltered={students!} filterKey="last_name" setFiltered={(ret: Array<StudentModel>) => setFilteredStudents(ret)} /> : <></>}

          <div className="flex-col flex items-center w-full mt-5">

            {filteredStudents.map((s, i) => {
              return (
                <button key={i} className="w-9/12 my-5 rounded-xl hover:text-white hover:bg-black cursor-pointer border border-black" type="button" onClick={() => toggleOpenCheckIn(s)}>
                  <Student student={s} />
                </button>
              )
            })}
          </div>
        </div>
      }

      <Modal isOpen={checkInModalOpen}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-3xl">Are you sure?</h2>

            <Student student={selectedStudent} />
          </div>

          <div className="flex items-end flex-col w-full">
            <button className="w-full h-24 my-5 rounded-xl bg-green-300 cursor-pointer border border-black" type="button" onClick={() => checkIn(selectedStudent!)}>Yes</button>
            <button className="w-full h-24 my-5 rounded-xl bg-red-300 cursor-pointer border border-black" type="button" onClick={() => toggleOpenCheckIn(null)}>No</button>
          </div>
        </div>
      </Modal>

    </div>
  )
}