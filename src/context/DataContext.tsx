import React, { createContext, useState } from 'react'

import useDebounce from '../hooks/useDebounce';

type DataContextProviderProps = {
    children: React.ReactNode
}

type DataContextType = {
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    debouncedQuery: string
}




const DataContext = createContext({} as DataContextType);

export const DataContextProvider = (props: DataContextProviderProps) => {

    const [search, setSearch] = useState<string>("")

    let debouncedQuery = useDebounce(search, 500)
  
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
      if(!e.target.value) return
  
      setSearch(e.target.value); 
  
    }
  
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
  


return (
    <DataContext.Provider value= {{ handleSubmit, handleSearchChange, search, setSearch, debouncedQuery}}>
      { props.children }
    </DataContext.Provider>
    )
}

export default DataContext