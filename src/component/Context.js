import { createContext, useState } from 'react'
export const context = createContext()
export const Context = ({children}) => {
    const [name, setName] = useState('mahdikhashey246')
  return (
    <context.Provider value={{name, setName}}>
        {children}
    </context.Provider> 
  )
}
