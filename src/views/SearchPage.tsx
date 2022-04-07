import { useEffect } from "react"
import { Search } from "../components/Search"
import { getAllSortedStudents } from "../services/students"

export const SearchPage = () => {

  useEffect(() => {
    getAllSortedStudents();
  })

  return (
    <div>
      <Search />
    </div>
  )
}