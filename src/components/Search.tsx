import { useEffect, useState } from "react"

export const Search = ({ unfiltered, filterKey, setFiltered }: { unfiltered: Array<any>, filterKey: string, setFiltered: Function }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setFiltered(searchValue ? unfiltered.filter(u => u[filterKey].toUpperCase().includes(searchValue.toUpperCase())) : unfiltered)
  }, [searchValue])

  return (
    <input type="text" className="border-2 border-slate px-3 py-1.5 h-16 md:w-10/12 rounded" onInput={val => {
      return setSearchValue((val.target as HTMLInputElement).value);
    }} />
  )
}