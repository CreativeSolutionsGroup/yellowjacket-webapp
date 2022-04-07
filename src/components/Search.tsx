import { useState } from "react"

export const Search = () => {
  const [searchValue, setSearchValue] = useState();

  return (
    <input type="text" value={searchValue} />
  )
}