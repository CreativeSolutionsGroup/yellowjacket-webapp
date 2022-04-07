import { useEffect, useState } from "react"

export const Search = ({ unfiltered, filterKey, filtered }: { unfiltered: Array<any>, filterKey: string, filtered: Function }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    filtered(searchValue ? unfiltered.filter(u => u[filterKey].toUpperCase().includes(searchValue.toUpperCase())) : unfiltered)
  }, [searchValue])

  return (
    <input type="text" className="border-2 border-slate px-3 py-1.5 h-16 md:w-10/12 rounded" onInput={val => {
      return setSearchValue(val.target.value);
    }} />
  )
}